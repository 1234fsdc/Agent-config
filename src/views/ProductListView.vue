<script setup>
import { computed, ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import EmptyState from '../components/EmptyState.vue'
import ProductCard from '../components/ProductCard.vue'
import ProductFilter from '../components/ProductFilter.vue'
import { useProductStore } from '../stores/productStore'

const route = useRoute()
const productStore = useProductStore()
const keyword = ref('')
const category = ref(route.query.category || '全部')

watch(
  () => route.query.category,
  (value) => {
    category.value = value || '全部'
  },
)

const filteredProducts = computed(() =>
  productStore.searchProducts({
    keyword: keyword.value,
    category: category.value,
  }),
)
</script>

<template>
  <section class="page-section product-page">
    <div class="market-toolbar">
      <div>
        <p class="eyebrow">商品中心</p>
        <h1>发现校内好物</h1>
        <p class="muted-text">浏览校园闲置物品，可按关键词和分类筛选。</p>
      </div>
      <div class="market-stat">
        <strong>{{ filteredProducts.length }}</strong>
        <span>当前结果</span>
      </div>
    </div>

    <ProductFilter v-model:keyword="keyword" v-model:category="category" />

    <div v-if="filteredProducts.length" class="product-grid">
      <ProductCard v-for="product in filteredProducts" :key="product.id" :product="product" />
    </div>
    <EmptyState
      v-else
      title="没有找到匹配商品"
      description="可以换一个关键词，或切换到全部分类。"
    />
  </section>
</template>
