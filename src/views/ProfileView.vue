<script setup>
import { computed } from 'vue'
import { useRouter } from 'vue-router'
import EmptyState from '../components/EmptyState.vue'
import ProductCard from '../components/ProductCard.vue'
import { useProductStore } from '../stores/productStore'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const productStore = useProductStore()
const userStore = useUserStore()

const favoriteProducts = computed(() =>
  productStore.products.filter((product) => userStore.favoriteIds.includes(product.id)),
)
const ownedProducts = computed(() => productStore.getProductsByOwner(userStore.currentUser?.id))

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <section class="page-section">
    <p class="eyebrow">个人空间</p>
    <h1>个人中心</h1>
    <div class="profile-panel">
      <div>
        <strong>{{ userStore.currentUser?.username }}</strong>
        <p class="muted-text">这里展示当前账号的收藏和发布记录。</p>
      </div>
      <button class="secondary-button" type="button" @click="logout">退出登录</button>
    </div>

    <section class="content-section">
      <div class="section-heading">
        <p class="eyebrow">收藏商品</p>
        <h2>我感兴趣的闲置</h2>
      </div>
      <div v-if="favoriteProducts.length" class="product-grid">
        <ProductCard v-for="product in favoriteProducts" :key="product.id" :product="product" />
      </div>
      <EmptyState
        v-else
        title="还没有收藏商品"
        description="可以在商品详情页点击收藏。"
      />
    </section>

    <section class="content-section">
      <div class="section-heading">
        <p class="eyebrow">我的发布</p>
        <h2>我发布的商品</h2>
      </div>
      <div v-if="ownedProducts.length" class="product-grid">
        <ProductCard v-for="product in ownedProducts" :key="product.id" :product="product" />
      </div>
      <EmptyState v-else title="还没有发布商品" description="发布闲置后会显示在这里。" />
    </section>
  </section>
</template>
