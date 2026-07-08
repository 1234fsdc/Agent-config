# 项目发现记录

## 课程要求

Word 试卷要求项目覆盖：

1. HTML5、CSS3、JavaScript、Vue3。
2. Vue3 基础指令语法。
3. Vue3 组件化开发。
4. Vue Router 页面切换。
5. 状态管理。
6. 用户登录注册页面。
7. 系统主界面，包含 header、footer、主体组件。
8. 功能界面，例如商品界面、搜索界面。
9. 页面交互，例如提示、录入输出、事件监听。
10. 项目实现和项目答辩。

## 项目决策

1. 项目主题采用“校园二手交易平台”。
2. 技术栈采用 Vue3 + Vite + Vue Router + Pinia。
3. 数据采用本地模拟数据和 localStorage。
4. 实现范围保持简单，不接后端和数据库。
5. 页面保留 7 个，覆盖完整演示流程。

## 当前实现要点

1. `src/router/index.js` 管理 7 个路由，并保护 `/publish` 和 `/profile`。
2. `src/stores/userStore.js` 管理注册用户、当前用户和收藏商品 id。
3. `src/stores/productStore.js` 管理商品列表和发布商品。
4. `src/data/products.js` 提供初始商品数据。
5. `src/components/ProductCard.vue` 复用商品卡片展示。
6. `src/components/ProductFilter.vue` 负责关键词搜索和分类筛选。
7. `src/components/EmptyState.vue` 负责空状态提示。

## 验证发现

1. `npm run build` 可作为当前项目的主要自动验证命令。
2. 项目没有单独测试脚本，因此浏览器冒烟测试用于验证核心流程。
3. Playwright 默认 Chromium 缓存不可用，但系统 Edge 渠道可用。
4. favicon 缺失会导致浏览器控制台 404，已通过 `public/favicon.svg` 解决。

