# Agent-config

ZCode 配置备份快照（2026-08-25）。所有密钥已留空/替换为占位符。

## 内容清单

| 目录 | 来源 | 说明 |
|------|------|------|
| `skills/global/` | `~/.agents/skills/` | 8 个全局技能：agent-reach、competitor-analysis、frontend-design、graphify、open-code-review、planning-with-files、review-plan、ui-ux-pro-max |
| `skills/mattpocock-skills/` | 插件缓存 v1.2.3 | 16 个技能（code-review/tdd/grilling/diagnosing-bugs 等）+ plugin.json/hooks |
| `skills/ponytail/` | 插件缓存 v4.9.0 | 极简编码技能 + hooks |
| `skills/document-skills/` | 插件缓存 v0.1.1 | docx / pdf / pptx / xlsx |
| `agents/page-testing.md` | `~/.zcode/agents/` | 子代理：单页功能可用性验证（kilo step-3.7-flash:free） |
| `plugins/auto-chinese-desc/` | 插件缓存 v1.0.0 | SessionStart 自动生成中文描述 |
| `hooks/` | `~/.zcode/hooks/` | hooks.json + add-chinese-desc.py |
| `mcp/servers.json` | cli/config.json 脱敏版 | 6 个 MCP：filesystem、github、git、tavily、exa、graphify |

## 需要补的密钥

| 密钥 | 用在哪 | 去哪申请 |
|------|--------|---------|
| GitHub PAT | mcp/servers.json → github | github.com/settings/tokens |
| TAVILY_API_KEY | mcp/servers.json → tavily | tavily.com |
| EXA_API_KEY | mcp/servers.json → exa | dashboard.exa.ai |
| YOUR_AGNES_API_KEY | hooks/add-chinese-desc.py、plugins/auto-chinese-desc/hooks/add-chinese-desc.py | apihub.agnes-ai.cn |

## 恢复方法

1. 技能：把 `skills/global/*` 拷回 `~/.agents/skills/`
2. 子代理：`agents/page-testing.md` 拷回 `~/.zcode/agents/`
3. Hook：`hooks/*` 拷回 `~/.zcode/hooks/`，填入 Agnes key
4. MCP：把 `mcp/servers.json` 的内容合并进 `~/.zcode/cli/config.json` 的 `mcp.servers` 段，填入各密钥，重启 ZCode 看 UI 绿点
5. paper-pilot MCP 未包含在模板中（需 clone 仓库 + venv），见原配置
