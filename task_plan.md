# 校园二手交易平台课程任务计划

## 目标

完成《前端框架技术》期末课程任务：交付一个简单但完整的 Vue3 校园二手交易平台项目，并配套项目报告和最终压缩包。

## 当前状态

Status: in_progress

当前代码实现已基本完成，下一阶段重点是项目报告、最终检查和打包提交。

## 阶段计划

| 阶段 | 状态 | 说明 |
| --- | --- | --- |
| Phase 1: 读取试卷并梳理要求 | complete | 已读取 Word 试卷，确认课程要求 |
| Phase 2: 编写需求文档 | complete | 已完成 `docs/requirements.md` |
| Phase 3: 编写架构设计文档 | complete | 已完成 `docs/architecture.md` |
| Phase 4: 初始化 Git 和实施计划 | complete | 已初始化 Git，完成实施计划 |
| Phase 5: 实现 Vue3 前端项目 | complete | 已完成页面、路由、状态、核心交互 |
| Phase 6: 构建和浏览器验证 | complete | `npm run build` 通过，冒烟测试通过 |
| Phase 7: 编写项目报告 | pending | 需要根据当前项目生成课程报告 |
| Phase 8: 最终检查和打包 | pending | 需要检查构建、文件结构并生成 zip |

## 待完成任务

1. 编写项目报告。
2. 补充运行截图或截图说明。
3. 再次执行 `npm run build`。
4. 检查 Git 状态和项目文件。
5. 整理最终提交目录。
6. 生成 `202339070157沈凡栋前端框架技术期末项目.zip`。

## 验证命令

```powershell
npm install
npm run build
npm run dev -- --host 127.0.0.1 --port 5174
```

## 成功标准

1. 项目可启动。
2. 7 个页面可访问。
3. 注册、登录、商品搜索、详情收藏、发布商品、个人中心、退出登录可演示。
4. 项目报告完整。
5. 最终 zip 命名符合课程要求。

## 错误记录

| 时间 | 问题 | 处理 |
| --- | --- | --- |
| 2026-07-08 | Playwright 默认浏览器缓存缺失 | 改用系统 Edge 渠道完成冒烟测试 |
| 2026-07-08 | 浏览器默认请求 favicon 产生 404 | 新增 `public/favicon.svg` 并在 `index.html` 引用 |

