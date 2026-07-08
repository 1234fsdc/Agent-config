<script setup>
import ProductCard from '../components/ProductCard.vue'
import { productCategories } from '../data/products'
import { useProductStore } from '../stores/productStore'

const productStore = useProductStore()
const categories = productCategories.filter((item) => item !== '全部')
</script>

<template>
  <section class="page-section hero-section">
    <div>
      <p class="eyebrow">校园闲置物品流转</p>
      <h1>让闲置物品在校园里高效流转</h1>
      <p class="hero-copy">
        面向学生的轻量交易平台，覆盖浏览、筛选、收藏、发布和个人中心完整流程。
      </p>
      <div class="hero-actions">
        <router-link class="primary-link" to="/products">浏览商品</router-link>
        <router-link class="secondary-link" to="/publish">发布闲置</router-link>
      </div>
    </div>
    <div class="hero-panel">
      <span>今日推荐</span>
      <strong>{{ productStore.recommendedProducts[0]?.title }}</strong>
      <p>￥{{ productStore.recommendedProducts[0]?.price }} · 校内面交 · 快速联系</p>
    </div>
  </section>

  <section class="content-section">
    <div class="section-heading">
      <p class="eyebrow">分类入口</p>
      <h2>按需求快速浏览</h2>
    </div>
    <div class="category-grid">
      <router-link
        v-for="category in categories"
        :key="category"
        class="category-tile"
        :to="{ path: '/products', query: { category } }"
      >
        {{ category }}
      </router-link>
    </div>
  </section>

  <section class="content-section">
    <div class="section-heading">
      <p class="eyebrow">推荐商品</p>
      <h2>近期可交易闲置</h2>
    </div>
    <div class="product-grid">
      <ProductCard
        v-for="product in productStore.recommendedProducts"
        :key="product.id"
        :product="product"
      />
    </div>
  </section>
</template>
