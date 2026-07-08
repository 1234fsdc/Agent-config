# 校园二手交易平台架构设计文档

## 1. 架构目标

本项目采用简单前端架构，目标是在较低复杂度下完整覆盖课程要求。

架构需要满足：

1. 支持 Vue3 页面开发。
2. 支持 Vue Router 页面跳转。
3. 支持 Pinia 状态管理。
4. 支持 localStorage 本地保存数据。
5. 支持组件化拆分，避免所有代码集中在单个页面。
6. 保持项目结构清晰，方便演示和答辩。

## 2. 设计原则

本项目遵循以下原则：

1. 简单优先：只实现作业要求需要的功能。
2. 前端闭环：不接真实后端，使用本地模拟数据完成完整演示。
3. 页面清晰：每个页面只负责自己的展示和交互。
4. 状态集中：用户、商品、收藏等共享数据放到 Pinia 中管理。
5. 组件复用：只抽取重复使用或职责明确的组件。

## 3. 技术架构

| 技术 | 作用 |
| --- | --- |
| Vue3 | 构建页面和组件 |
| Vite | 提供开发服务器和项目构建 |
| Vue Router | 管理页面路由 |
| Pinia | 管理全局状态 |
| localStorage | 保存用户、商品和收藏数据 |
| CSS3 | 页面布局和样式 |
| JavaScript | 实现业务逻辑 |

整体架构为单页应用架构。浏览器只加载一个 Vue 应用，页面切换由 Vue Router 完成，数据由 Pinia 管理并同步到 localStorage。

## 4. 项目目录结构

建议目录结构如下：

```text
src/
  main.js
  App.vue
  router/
    index.js
  stores/
    userStore.js
    productStore.js
  data/
    products.js
  components/
    AppHeader.vue
    AppFooter.vue
    ProductCard.vue
    ProductFilter.vue
    EmptyState.vue
  views/
    HomeView.vue
    LoginView.vue
    RegisterView.vue
    ProductListView.vue
    ProductDetailView.vue
    PublishView.vue
    ProfileView.vue
  styles/
    base.css
```

目录职责：

| 目录或文件 | 职责 |
| --- | --- |
| main.js | 创建 Vue 应用，挂载 router 和 Pinia |
| App.vue | 应用根组件，放置公共布局和路由出口 |
| router/index.js | 配置页面路由和登录校验 |
| stores | 存放 Pinia 状态模块 |
| data/products.js | 存放初始商品模拟数据 |
| components | 存放可复用组件 |
| views | 存放页面级组件 |
| styles/base.css | 存放全局样式 |

## 5. 页面和路由设计

| 页面 | 路由 | 是否需要登录 | 说明 |
| --- | --- | --- | --- |
| 首页 | / | 否 | 展示推荐商品、分类入口和导航 |
| 登录页 | /login | 否 | 用户登录 |
| 注册页 | /register | 否 | 用户注册 |
| 商品列表页 | /products | 否 | 浏览、搜索和筛选商品 |
| 商品详情页 | /products/:id | 否 | 查看商品详情，收藏操作需要登录 |
| 发布商品页 | /publish | 是 | 登录用户发布商品 |
| 个人中心页 | /profile | 是 | 查看用户信息、收藏商品和发布商品 |

路由守卫规则：

1. `/publish` 和 `/profile` 需要登录。
2. 未登录访问受限页面时跳转到 `/login`。
3. 商品详情页允许未登录查看，但点击收藏时提示先登录。

## 6. 页面结构设计

### 6.1 App.vue

App.vue 作为根组件，负责页面公共结构。

结构如下：

```text
AppHeader
RouterView
AppFooter
```

这样可以保证首页和功能页面都包含公共 header、footer 和主体内容，符合试卷要求。

### 6.2 首页

首页主要展示平台入口。

内容包括：

1. 平台标题和简单介绍。
2. 推荐商品。
3. 商品分类入口。
4. 进入商品列表和发布商品的按钮。

### 6.3 商品列表页

商品列表页负责展示商品集合。

页面组成：

1. ProductFilter：搜索和分类筛选。
2. ProductCard 列表：展示商品。
3. EmptyState：没有结果时显示。

### 6.4 商品详情页

商品详情页负责展示单个商品。

页面内容：

1. 商品图片或占位图。
2. 商品名称、价格、分类、成色、地点。
3. 商品描述。
4. 卖家和联系方式。
5. 收藏按钮。

### 6.5 发布商品页

发布商品页是一个表单页面。

表单字段：

1. 商品名称。
2. 价格。
3. 分类。
4. 成色。
5. 交易地点。
6. 联系方式。
7. 商品描述。

提交成功后调用 productStore 新增商品。

### 6.6 个人中心页

个人中心页展示登录用户相关数据。

内容包括：

1. 当前用户名。
2. 收藏商品列表。
3. 已发布商品列表。
4. 退出登录按钮。

## 7. 组件设计

| 组件 | 职责 | 使用位置 |
| --- | --- | --- |
| AppHeader | 展示站点名称、导航和登录状态 | App.vue |
| AppFooter | 展示课程项目说明和版权信息 | App.vue |
| ProductCard | 展示单个商品概要 | 首页、商品列表、个人中心 |
| ProductFilter | 搜索和分类筛选 | 商品列表 |
| EmptyState | 无数据时显示提示 | 商品列表、个人中心 |

组件拆分原则：

1. 重复使用的内容拆成组件。
2. 页面专属且逻辑简单的内容保留在页面内。
3. 不额外创建复杂工具层，避免项目过度设计。

## 8. 状态管理设计

本项目使用两个 Pinia store。

### 8.1 userStore

userStore 负责用户和登录状态。

状态字段：

| 字段 | 说明 |
| --- | --- |
| users | 已注册用户列表 |
| currentUser | 当前登录用户 |
| favoriteIds | 当前用户收藏的商品 id |

主要方法：

| 方法 | 说明 |
| --- | --- |
| register | 注册用户 |
| login | 登录用户 |
| logout | 退出登录 |
| toggleFavorite | 收藏或取消收藏商品 |
| isFavorite | 判断商品是否已收藏 |

### 8.2 productStore

productStore 负责商品数据。

状态字段：

| 字段 | 说明 |
| --- | --- |
| products | 商品列表 |

主要方法：

| 方法 | 说明 |
| --- | --- |
| addProduct | 发布新商品 |
| getProductById | 根据 id 获取商品 |
| getProductsByOwner | 获取某用户发布的商品 |
| searchProducts | 根据关键词和分类筛选商品 |

## 9. 数据流设计

核心数据流如下：

```text
页面操作
  -> 调用 Pinia store 方法
  -> 更新 store 状态
  -> 同步到 localStorage
  -> 页面根据状态自动更新
```

示例：

1. 用户点击收藏。
2. ProductDetailView 调用 userStore.toggleFavorite(productId)。
3. userStore 更新 favoriteIds。
4. favoriteIds 同步到 localStorage。
5. 收藏按钮文案和个人中心收藏列表自动更新。

## 10. 本地存储设计

localStorage 保存三类数据：

| key | 内容 |
| --- | --- |
| campus_market_users | 注册用户列表 |
| campus_market_current_user | 当前登录用户 |
| campus_market_products | 商品列表 |

说明：

1. 项目首次启动时，如果 localStorage 没有商品数据，则使用 data/products.js 中的初始商品。
2. 用户注册、登录、收藏、发布商品后，同步更新 localStorage。
3. 刷新页面后，从 localStorage 恢复数据。

## 11. 权限控制设计

权限控制保持简单。

规则：

1. 未登录可以访问首页、登录页、注册页、商品列表页、商品详情页。
2. 未登录不能访问发布商品页和个人中心页。
3. 未登录点击收藏时，显示提示并引导登录。
4. 登录后可以发布商品、收藏商品和查看个人中心。

## 12. 表单校验设计

表单校验在页面组件内完成，不单独抽象复杂校验库。

校验规则：

| 表单 | 校验内容 |
| --- | --- |
| 注册表单 | 用户名非空、密码非空、两次密码一致 |
| 登录表单 | 用户名非空、密码非空、账号密码匹配 |
| 发布表单 | 商品名称非空、价格为数字、分类非空、成色非空、描述非空 |

校验失败时在页面显示提示信息，校验成功后再调用 store 方法。

## 13. 样式设计

样式采用普通 CSS，保持实现简单。

样式结构：

1. base.css 存放全局基础样式。
2. 页面组件内部使用 scoped style 存放页面样式。
3. 公共组件内部维护自己的组件样式。

页面风格以清晰、整洁、适合课程演示为主。

## 14. 错误和空状态设计

需要处理以下情况：

1. 登录失败：提示账号或密码错误。
2. 注册失败：提示用户名已存在或输入不合法。
3. 搜索无结果：显示 EmptyState。
4. 商品不存在：提示商品不存在，并提供返回商品列表入口。
5. 未登录访问受限页面：跳转到登录页。
6. 未登录收藏商品：提示先登录。

## 15. 开发顺序建议

建议按以下顺序开发：

1. 创建 Vue3 + Vite 项目。
2. 安装并配置 Vue Router 和 Pinia。
3. 建立基础目录结构。
4. 实现 AppHeader、AppFooter 和基础布局。
5. 实现 productStore 和初始商品数据。
6. 实现首页、商品列表页和商品详情页。
7. 实现 userStore、注册页和登录页。
8. 实现收藏功能。
9. 实现发布商品页。
10. 实现个人中心页。
11. 验证完整演示流程。

## 16. 验收方式

架构对应的最终项目应通过以下检查：

1. 能正常启动开发服务器。
2. 7 个页面都能访问。
3. Vue Router 页面跳转正常。
4. Pinia 中能看到用户和商品状态变化。
5. localStorage 中能看到用户、商品和登录数据。
6. 注册、登录、搜索、筛选、详情、收藏、发布、个人中心流程可演示。
7. 页面包含公共 header、footer 和主体区域。
8. 浏览器控制台没有主要运行错误。

## 17. 答辩说明口径

答辩时可以这样说明架构：

本项目采用 Vue3 单页应用架构，通过 Vue Router 管理页面跳转，通过 Pinia 管理用户和商品状态，通过 localStorage 保存本地数据。项目没有接入真实后端，而是使用模拟数据完成完整前端流程。页面分为首页、商品列表、详情、发布、个人中心、登录和注册，公共头部、底部、商品卡片、筛选器等内容使用组件封装。这样的架构可以在保持简单的同时覆盖课程要求中的组件化、路由、状态管理和交互能力。

