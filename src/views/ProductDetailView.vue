<script setup>
import { computed, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useProductStore } from '../stores/productStore'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const router = useRouter()
const productStore = useProductStore()
const userStore = useUserStore()
const message = ref('')

const product = computed(() => productStore.getProductById(route.params.id))
const favoriteText = computed(() =>
  product.value && userStore.isFavorite(product.value.id) ? '取消收藏' : '收藏商品',
)

function handleFavorite() {
  if (!product.value) return

  if (!userStore.isLoggedIn) {
    message.value = '请先登录后再收藏商品'
    return
  }

  const result = userStore.toggleFavorite(product.value.id)
  message.value = result.message
}
</script>

<template>
  <section v-if="product" class="page-section detail-layout">
    <div class="detail-image">{{ product.category.slice(0, 2) }}</div>
    <div class="detail-content">
      <p class="eyebrow">商品信息</p>
      <h1>{{ product.title }}</h1>
      <p class="detail-price">￥{{ product.price }}</p>
      <div class="detail-tags">
        <span>{{ product.category }}</span>
        <span>{{ product.condition }}</span>
        <span>{{ product.location }}</span>
      </div>
      <p class="detail-description">{{ product.description }}</p>
      <div class="seller-box">
        <strong>卖家：{{ product.sellerName }}</strong>
        <span>联系方式：{{ product.contact }}</span>
      </div>
      <button class="primary-button" type="button" @click="handleFavorite">
        {{ favoriteText }}
      </button>
      <p v-if="message" class="form-message">{{ message }}</p>
    </div>
  </section>

  <section v-else class="page-section">
    <p class="eyebrow">商品信息</p>
    <h1>商品不存在</h1>
    <p class="muted-text">该商品可能已被删除，请返回商品列表重新选择。</p>
    <button class="secondary-button" type="button" @click="router.push('/products')">
      返回商品列表
    </button>
  </section>
</template>
