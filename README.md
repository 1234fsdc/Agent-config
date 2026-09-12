# Agent-config

ZCode 配置备份快照（2026-09-13，以本机当前配置为准，全量覆盖式同步）。所有密钥已替换为占位符。

## 内容清单

| 目录 | 来源 | 说明 |
|------|------|------|
| `skills/global/` | `~/.agents/skills/` | 8 个全局技能：agent-reach、browser-use、competitor-analysis、frontend-design、open-code-review-delegate、resume-review、review-plan、ui-ux-pro-max |
| `skills/mattpocock-skills/` | 插件缓存 v1.2.3 | 16 个技能（tdd/grilling/diagnosing-bugs 等） |
| `skills/ponytail/` | 插件缓存 v4.9.0 | 极简编码技能 + hooks |
| `skills/document-skills/` | 插件缓存 v0.1.4 | docx / pdf / pptx / xlsx |
| `skills/exa/` | 插件缓存 v3.4.0 | Exa 搜索 MCP 插件 |
| `skills/computer-use/` | 插件缓存 v0.5.14 | 桌面操控插件（node_modules/dist 已排除，恢复时 `npm install`） |
| `skills/page-testing/` | 本地 marketplace v1.0.0 | 前端项目逐页扫描审计 |
| `skills/auto-chinese-desc/` | 本地 marketplace v1.0.0 | SessionStart 自动生成中文描述 |
| `plugins/local/marketplace.json` | `~/.zcode/cli/plugins/marketplaces/local/` | 本地 marketplace 定义（恢复 page-testing / auto-chinese-desc 需要） |
| `agents/` | `~/.zcode/agents/` | 子代理：agent-browser、judge |
| `hooks/` | `~/.zcode/hooks/` | hooks.json + add-chinese-desc.py（cn-desc-cache.json 为运行时缓存，不备份） |
| `mcp/servers.json` | cli/config.json 脱敏版 | 4 个 MCP：filesystem、github、codegraph、exa |

本次相对上一版快照（2026-08-25）的变化：

- 删除：tavily（插件已禁用）、graphify、planning-with-files（全局技能已卸载）；MCP 中 git、tavily、graphify 已移除
- 新增：browser-use、resume-review（全局技能）、computer-use、page-testing 插件、codegraph MCP
- 更新：document-skills 0.1.1 → 0.1.4、exa → 3.4.0；open-code-review 改名为 open-code-review-delegate
- paper-pilot MCP 未包含（需 clone 仓库 + venv，本机已不再配置）

## 需要补的密钥

| 密钥 | 用在哪 | 去哪申请 |
|------|--------|---------|
| YOUR_GITHUB_PAT | mcp/servers.json → github | github.com/settings/tokens |
| YOUR_EXA_API_KEY | mcp/servers.json → exa | dashboard.exa.ai |
| YOUR_AGNES_API_KEY | hooks/add-chinese-desc.py、skills/auto-chinese-desc/hooks/add-chinese-desc.py | apihub.agnes-ai.cn |

## 恢复方法

1. 全局技能：把 `skills/global/*` 拷回 `~/.agents/skills/`
2. 插件：官方/社区插件直接在 ZCode 插件市场安装对应版本；page-testing、auto-chinese-desc 先把 `plugins/local/marketplace.json` 放回 `~/.zcode/cli/plugins/marketplaces/local/`，再从本地 marketplace 安装；computer-use 恢复后在插件目录 `npm install`
3. 子代理：`agents/*` 拷回 `~/.zcode/agents/`
4. Hook：`hooks/*` 拷回 `~/.zcode/hooks/`，填入 Agnes key
5. MCP：把 `mcp/servers.json` 的内容合并进 `~/.zcode/cli/config.json` 的 `mcp.servers` 段，填入各密钥，重启 ZCode 看 UI 绿点
