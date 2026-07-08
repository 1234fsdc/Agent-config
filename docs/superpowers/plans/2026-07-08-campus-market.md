# Campus Market Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a simple but complete Vue3 campus second-hand trading platform for the course assignment.

**Architecture:** The app is a Vue3 single-page application. Vue Router handles seven pages, Pinia manages user and product state, and localStorage persists users, login state, favorites, and products.

**Tech Stack:** Vue3, Vite, Vue Router, Pinia, JavaScript, CSS3, localStorage.

## Global Constraints

- Student identity: `202339070157 沈凡栋`.
- Project theme: campus second-hand trading platform.
- Scope: frontend only; no backend, database, payment, chat, real upload, admin panel, or review workflow.
- Required pages: `/`, `/login`, `/register`, `/products`, `/products/:id`, `/publish`, `/profile`.
- Required state modules: `userStore` and `productStore`.
- Required persistence: localStorage.
- Required UI structure: public header, public footer, and main content area.

---

### Task 1: Scaffold Vue App

**Files:**
- Create: `package.json`
- Create: `index.html`
- Create: `vite.config.js`
- Create: `src/main.js`
- Create: `src/App.vue`
- Create: `src/styles/base.css`

**Interfaces:**
- Produces: a Vite app that mounts `#app`, registers Pinia and Vue Router, and renders `App.vue`.

- [ ] **Step 1: Create project files**

Create a minimal Vite Vue project with dependencies `@vitejs/plugin-vue`, `vite`, `vue`, `vue-router`, and `pinia`.

- [ ] **Step 2: Create base app shell**

`App.vue` must render `AppHeader`, `<router-view />`, and `AppFooter`.

- [ ] **Step 3: Verify install and startup**

Run: `npm install`

Expected: dependencies install successfully.

Run: `npm run build`

Expected: build finishes without errors.

- [ ] **Step 4: Commit**

Run:

```bash
git add package.json package-lock.json index.html vite.config.js src
git commit -m "chore: scaffold vue app"
```

### Task 2: Add Routes and Layout Components

**Files:**
- Create: `src/router/index.js`
- Create: `src/components/AppHeader.vue`
- Create: `src/components/AppFooter.vue`
- Create: `src/views/HomeView.vue`
- Create: `src/views/LoginView.vue`
- Create: `src/views/RegisterView.vue`
- Create: `src/views/ProductListView.vue`
- Create: `src/views/ProductDetailView.vue`
- Create: `src/views/PublishView.vue`
- Create: `src/views/ProfileView.vue`
- Modify: `src/main.js`
- Modify: `src/App.vue`

**Interfaces:**
- Produces: `router` default export from `src/router/index.js`.
- Produces: seven route components matching the required paths.

- [ ] **Step 1: Configure routes**

Create routes for `/`, `/login`, `/register`, `/products`, `/products/:id`, `/publish`, and `/profile`.

- [ ] **Step 2: Add simple page placeholders**

Each view must render a clear Chinese page title and enough visible content to confirm routing.

- [ ] **Step 3: Add public layout**

`AppHeader` must include navigation links. `AppFooter` must include course project wording.

- [ ] **Step 4: Verify routing build**

Run: `npm run build`

Expected: build finishes without errors.

- [ ] **Step 5: Commit**

Run:

```bash
git add src
git commit -m "feat: add app routing and layout"
```

### Task 3: Add Product Data and Stores

**Files:**
- Create: `src/data/products.js`
- Create: `src/stores/userStore.js`
- Create: `src/stores/productStore.js`

**Interfaces:**
- Produces: `useUserStore` with `register`, `login`, `logout`, `toggleFavorite`, and `isFavorite`.
- Produces: `useProductStore` with `addProduct`, `getProductById`, `getProductsByOwner`, and `searchProducts`.
- Produces: localStorage keys `campus_market_users`, `campus_market_current_user`, and `campus_market_products`.

- [ ] **Step 1: Add initial product data**

Create at least six products across categories such as books, electronics, daily goods, and sports.

- [ ] **Step 2: Implement userStore**

Store users, current user, and favorite ids. Persist changes to localStorage after register, login, logout, and favorite changes.

- [ ] **Step 3: Implement productStore**

Load products from localStorage first. If no saved data exists, use `src/data/products.js`. Persist products after publishing.

- [ ] **Step 4: Verify store build**

Run: `npm run build`

Expected: build finishes without errors.

- [ ] **Step 5: Commit**

Run:

```bash
git add src/data src/stores
git commit -m "feat: add local stores and product data"
```

### Task 4: Implement Product Browsing

**Files:**
- Create: `src/components/ProductCard.vue`
- Create: `src/components/ProductFilter.vue`
- Create: `src/components/EmptyState.vue`
- Modify: `src/views/HomeView.vue`
- Modify: `src/views/ProductListView.vue`
- Modify: `src/views/ProductDetailView.vue`

**Interfaces:**
- Consumes: `useProductStore`.
- Consumes: `useUserStore` for favorite state in product detail.
- Produces: searchable product list, product cards, and product detail display.

- [ ] **Step 1: Implement ProductCard**

Render title, category, condition, price, location, and short description. Link to `/products/:id`.

- [ ] **Step 2: Implement ProductFilter**

Emit `update:keyword` and `update:category` from keyword input and category select.

- [ ] **Step 3: Implement HomeView**

Show platform intro, category entry buttons, and recommended products.

- [ ] **Step 4: Implement ProductListView**

Show ProductFilter, filtered ProductCard list, and EmptyState when no products match.

- [ ] **Step 5: Implement ProductDetailView**

Show full product details. Favorite button toggles only when logged in; otherwise shows login prompt.

- [ ] **Step 6: Verify product flow**

Run: `npm run build`

Expected: build finishes without errors.

- [ ] **Step 7: Commit**

Run:

```bash
git add src/components src/views
git commit -m "feat: implement product browsing"
```

### Task 5: Implement Auth, Publishing, and Profile

**Files:**
- Modify: `src/router/index.js`
- Modify: `src/components/AppHeader.vue`
- Modify: `src/views/LoginView.vue`
- Modify: `src/views/RegisterView.vue`
- Modify: `src/views/PublishView.vue`
- Modify: `src/views/ProfileView.vue`

**Interfaces:**
- Consumes: `useUserStore`.
- Consumes: `useProductStore`.
- Produces: working auth forms, route guard, publish form, and profile page.

- [ ] **Step 1: Implement route guard**

Guard `/publish` and `/profile`. If not logged in, redirect to `/login`.

- [ ] **Step 2: Implement registration**

Validate username, password, and confirmation. Save new user and redirect to login page.

- [ ] **Step 3: Implement login**

Validate username and password. On success, set current user and redirect to home page.

- [ ] **Step 4: Implement publish form**

Validate title, price, category, condition, and description. Add product with current user as owner.

- [ ] **Step 5: Implement profile**

Show current username, favorite products, owned products, and logout button.

- [ ] **Step 6: Verify user flow**

Run: `npm run build`

Expected: build finishes without errors.

- [ ] **Step 7: Commit**

Run:

```bash
git add src
git commit -m "feat: implement auth publishing and profile"
```

### Task 6: Polish Styles and Final Verification

**Files:**
- Modify: `src/styles/base.css`
- Modify: component and view styles as needed.

**Interfaces:**
- Produces: responsive, readable UI suitable for assignment demo.

- [ ] **Step 1: Polish layout**

Ensure header, footer, cards, forms, and page sections are readable on desktop and narrow screens.

- [ ] **Step 2: Run production build**

Run: `npm run build`

Expected: build finishes without errors.

- [ ] **Step 3: Start local server**

Run: `npm run dev -- --host 127.0.0.1`

Expected: Vite prints a local URL.

- [ ] **Step 4: Browser smoke test**

Open the local URL and verify registration, login, product list, product detail, favorite, publish, profile, and logout.

- [ ] **Step 5: Commit**

Run:

```bash
git add src
git commit -m "style: polish campus market interface"
```

## Self-Review

Spec coverage:

1. Required seven pages are covered by Task 2 and Task 5.
2. Vue Router is covered by Task 2 and route guard in Task 5.
3. Pinia stores are covered by Task 3.
4. localStorage persistence is covered by Task 3.
5. Product browse, search, detail, favorite, publish, and profile are covered by Tasks 4 and 5.
6. Header, footer, and body content are covered by Task 2.
7. Final build and browser verification are covered by Task 6.

Placeholder scan: no placeholder work remains in this plan.

Type consistency:

1. Store names are `useUserStore` and `useProductStore`.
2. Product lookup method is `getProductById`.
3. Owner lookup method is `getProductsByOwner`.
4. Favorite methods are `toggleFavorite` and `isFavorite`.

