"""
自动为 SKILL.md 添加中文概述。
扫描所有 skill 目录，用 Agnes LLM 批量生成中文描述，已标注中文的跳过。
"""
import os
import glob
import sys
import json
import re
import urllib.request
import urllib.error

BASE = os.path.expanduser("~")
SKILL_DIRS = [
    os.path.join(BASE, ".agents", "skills"),
    os.path.join(BASE, ".zcode", "cli", "plugins", "cache"),
]
CACHE_FILE = os.path.join(BASE, ".zcode", "cli", "hooks", "cn-desc-cache.json")

# 硬编码备用（LLM 调用失败时兜底）
KNOWN_CN = {
    "agent-reach": "智能体触达：自动化用户获取与消息投递策略",
    "docx": "Word文档处理：创建、读取、编辑、修订、评论、格式保留",
    "frontend-design": "前端界面设计：生产级React/Next.js/Vue组件与页面",
    "pdf": "PDF工具包：报告生成、海报设计、学术论文、提取合并拆分",
    "planning-with-files": "文件规划：Manus风格任务分解，跟踪task_plan.md等文件",
    "ui-ux-pro-max": "UI/UX设计智能：67种风格、96种调色板、57种字体配对",
    "xlsx": "Excel处理：读写.xlsx/.csv、公式、图表、格式化",
    "xuexi-learning": "个性化学习：基于Bloom 2Sigma的掌握学习法，生成学习路径",
    "ponytail": "极简编码：强制最简方案，YAGNI原则，减少54%代码量",
    "ponytail-audit": "全仓库审计：扫描整个代码库的过度工程，可删除项排名",
    "ponytail-debt": "技术债务：收集代码中ponytail标记的TODO到债务清单",
    "ponytail-gain": "效果展示：显示ponytail的优化效果（代码/成本/时间减少量）",
    "ponytail-help": "命令速查：ponytail所有模式、技能、命令的快速参考",
    "ponytail-review": "代码审查：审查当前变更的过度工程，找出可删除项",
    "deliver-launch-checklist": "发布前检查清单：跨部门上线前检查（工程、设计、市场、支持、法务、运营），确保无遗漏",
    "deliver-release-notes": "发布说明：生成面向用户的版本更新日志",
    "grill-me": "追问式访谈：帮你理清计划或设计，直到每个决策分支都考虑周全",
    "grill-with-docs": "深度需求访谈：同步建立领域文档、精炼术语",
    "grilling": "追问引擎：逐条追问直到需求无歧义",
    "implement": "按 spec 或 ticket 驱动实现：自动调用 TDD 和代码审查",
    "to-spec": "把当前对话合成规范文档并提交到 issue tracker",
    "to-tickets": "把计划或对话拆成可执行的 tracer-bullet ticket",
    "setup-matt-pocock-skills": "一次性初始化配置（issue tracker、标签、文档目录）",
    "tdd": "红-绿-重构 TDD 循环：测试先行开发",
    "code-review": "双轴代码审查：编码规范 + spec 符合度",
    "diagnosing-bugs": "Bug 诊断：复现→最小化→假设→定位→修复→回归测试",
    "domain-modeling": "领域建模：精炼术语、更新 CONTEXT.md 和 ADR",
    "codebase-design": "深度模块设计：小接口、大行为、可测试",
    "research": "外部调研：基于高可信源调查问题，产出 MD 文档",
    "prototype": "快速原型：建可丢弃的原型验证设计思路",
    "resolving-merge-conflicts": "合并冲突解决：逐块按意图解决冲突",
    "handoff": "交接文档：压缩当前会话供另一 agent 继续",
    "triage": "Issue 分类状态机处理",
    "wayfinder": "大项目路径规划：产出调研 ticket",
    "improve-codebase-architecture": "扫描代码库架构问题，生成报告并修复",
    "ask-matt": "路由导航：问该用哪个 skill",
    "ubiquitous-language": "建立和维护项目的统一语言",
    "to-questionnaire": "把文档/对话转成问卷",
    "writing-shape": "定文章结构大纲",
    "writing-beats": "把大纲拆成段落节奏",
    "writing-fragments": "写出段落草稿",
    "edit-article": "编辑改进已有文章",
    "wizard": "引导式任务执行",
    "setup-ts-deep-modules": "配置 TypeScript 深度模块化",
    "batch-grill-me": "批量版 /grill-me，一次访谈多个议题",
    "claude-handoff": "Claude Code 专属的会话交接",
    "loop-me": "循环执行某个流程",
    "design-an-interface": "设计接口规范",
    "qa": "自动化质量检查",
    "request-refactor-plan": "生成重构方案计划",
    "scaffold-exercises": "搭建练习/教学脚手架",
    "setup-pre-commit": "配置 pre-commit hooks",
    "git-guardrails-claude-code": "Git 操作安全防护规则",
    "obsidian-vault": "Obsidian 知识库管理",
    "migrate-to-shoehorn": "迁移代码到 Shoehorn 模式",
    "teach": "多 session 教学辅助",
    "writing-great-skills": "编写高质量 SKILL.md 的参考指南",
}

AGNES_API_KEY = "YOUR_AGNES_API_KEY"
AGNES_BASE_URL = "https://apihub.agnes-ai.cn/v1"


def is_chinese(text):
    if not text:
        return False
    t = text.strip()
    if not t:
        return False
    return '\u4e00' <= t[0] <= '\u9fff'


def load_cache():
    if os.path.exists(CACHE_FILE):
        try:
            with open(CACHE_FILE, encoding='utf-8') as f:
                return json.load(f)
        except Exception:
            pass
    return {}


def save_cache(cache):
    os.makedirs(os.path.dirname(CACHE_FILE), exist_ok=True)
    with open(CACHE_FILE, 'w', encoding='utf-8') as f:
        json.dump(cache, f, ensure_ascii=False, indent=2)


def extract_full_description(content):
    if '---' not in content:
        return None, None, None
    parts = content.split('---', 2)
    if len(parts) < 3:
        return None, None, None
    fm = parts[1]
    lines = fm.split('\n')
    for i, line in enumerate(lines):
        stripped = line.strip()
        if stripped.startswith('description:'):
            val = stripped.split('description:', 1)[1].strip()
            if val.startswith('>'):
                val = val[1:].strip()
            val = val.strip('"').strip("'")
            continuation = []
            for j in range(i + 1, len(lines)):
                next_line = lines[j]
                if next_line.startswith('  ') or next_line.startswith('\t'):
                    continuation.append(next_line.strip())
                else:
                    break
            if continuation:
                val = val + ' ' + ' '.join(continuation) if val else ' '.join(continuation)
            return val.strip(), i, lines
    return None, None, None


def apply_description(skill_md_path, cn_desc, existing_desc=None):
    with open(skill_md_path, 'r', encoding='utf-8') as f:
        content = f.read()
    parts = content.split('---', 2)
    if len(parts) < 3:
        return False
    fm = parts[1]
    lines = fm.split('\n')
    line_idx = None
    for i, line in enumerate(lines):
        if line.strip().startswith('description:'):
            line_idx = i
            break
    if line_idx is not None:
        old_block = [lines[line_idx]]
        for j in range(line_idx + 1, len(lines)):
            if lines[j].startswith('  ') or lines[j].startswith('\t'):
                old_block.append(lines[j])
            else:
                break
        old_text = '\n'.join(old_block)
        if existing_desc:
            # 去掉结尾标点，避免产生"。。"或"。 ."
            clean_existing = existing_desc.rstrip('。').rstrip('.')
            new_text = f'description: >\n  {cn_desc}。{clean_existing}'
        else:
            new_text = f'description: >\n  {cn_desc}'
        if old_text not in content:
            return False
        content = content.replace(old_text, new_text, 1)
    else:
        new_fm = fm.rstrip() + f'\ndescription: >\n  {cn_desc}\n'
        content = '---' + new_fm + '---' + parts[2]
    with open(skill_md_path, 'w', encoding='utf-8') as f:
        f.write(content)
    return True


def find_skill_files():
    files = []
    for d in SKILL_DIRS:
        if not os.path.exists(d):
            continue
        files.extend(glob.glob(os.path.join(d, "*", "SKILL.md")))
        for root, dirs, _ in os.walk(d):
            if "node_modules" in dirs:
                dirs.remove("node_modules")
            if os.path.basename(root) == "skills" and root != d:
                files.extend(glob.glob(os.path.join(root, "**", "SKILL.md"), recursive=True))
    return sorted(set(files))


def batch_generate_cn(skills):
    """批量调 Agnes 生成中文描述，返回 {name: cn_desc}"""
    if not skills:
        return {}
    items = "\n".join(f"{i+1}. {name}: {desc}" for i, (name, desc) in enumerate(skills))
    prompt = f"""请为以下每个skill生成一句中文描述（不超过30字）。只输出JSON数组，格式：[{{"name":"skill名","desc":"中文描述"}}]，不要输出其他内容。

{items}"""
    try:
        data = json.dumps({
            "model": "agnes-2.5-flash",
            "messages": [{"role": "user", "content": prompt}],
            "max_tokens": 1500,
            "temperature": 0.2,
        }).encode("utf-8")
        req = urllib.request.Request(
            f"{AGNES_BASE_URL}/chat/completions",
            data=data,
            headers={
                "Authorization": f"Bearer {AGNES_API_KEY}",
                "Content-Type": "application/json",
            },
        )
        with urllib.request.urlopen(req, timeout=60) as resp:
            result = json.loads(resp.read().decode("utf-8"))
        content = result.get("choices", [{}])[0].get("message", {}).get("content", "").strip()
        content = re.sub(r"^\s*```json\s*", "", content)
        content = re.sub(r"\s*```\s*$", "", content)
        content = content.strip()
        entries = json.loads(content)
        return {e["name"]: e["desc"] for e in entries if "name" in e and "desc" in e}
    except Exception as e:
        print(f"[auto-chinese-desc] LLM error: {e}", file=sys.stderr)
        return {}


def main():
    cache = load_cache()
    files = find_skill_files()
    to_update = []
    skipped = []

    for f in files:
        name = os.path.basename(os.path.dirname(f))
        with open(f, encoding='utf-8') as fh:
            content = fh.read()
        desc, line_idx, lines = extract_full_description(content)
        if not desc:
            skipped.append(name)
            continue
        if is_chinese(desc):
            skipped.append(name)
            continue
        cached = cache.get(name)
        if cached:
            # 已含该中文描述则跳过，防止每次 SessionStart 重复 prepend（2026-08-21 修复 163 次叠加事故）
            if cached in desc:
                skipped.append(name)
                continue
            print(f"  ~ {name} (cached)", file=sys.stderr)
            apply_description(f, cached, desc)
            continue
        to_update.append((name, desc, f))

    if to_update:
        print(f"[auto-chinese-desc] Generating {len(to_update)} descriptions...", file=sys.stderr)
        llm_results = batch_generate_cn([(name, desc) for name, desc, _ in to_update])
        for name, desc, f in to_update:
            cn_desc = llm_results.get(name) or KNOWN_CN.get(name)
            if cn_desc:
                cache[name] = cn_desc
                apply_description(f, cn_desc, desc)
                print(f"  + {name}: {cn_desc}", file=sys.stderr)
            else:
                print(f"  ! {name}: no description generated", file=sys.stderr)

    save_cache(cache)
    print(f"[auto-chinese-desc] Done: {len(skipped)} skipped, {len(to_update)} processed", file=sys.stderr)


if __name__ == "__main__":
    main()
