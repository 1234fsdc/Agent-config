<script setup>
import { MapPin } from 'lucide-vue-next'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const categoryImages = {
  书籍资料:
    'https://images.unsplash.com/photo-1519682337058-a94d519337bc?auto=format&fit=crop&w=900&q=80',
  电子数码:
    'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=900&q=80',
  生活用品:
    'https://images.unsplash.com/photo-1616627451515-cbc80e4ece35?auto=format&fit=crop&w=900&q=80',
  运动户外:
    'https://images.unsplash.com/photo-1519861531473-9200262188bf?auto=format&fit=crop&w=900&q=80',
}
</script>

<template>
  <router-link class="product-card" :to="`/products/${product.id}`">
    <div class="product-image">
      <img :src="product.image || categoryImages[product.category]" :alt="product.title" />
      <span class="product-badge">{{ product.condition }}</span>
    </div>
    <div class="product-body">
      <div class="product-meta">
        <span>{{ product.category }}</span>
      </div>
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <div class="product-bottom">
        <strong>￥{{ product.price }}</strong>
        <span>
          <MapPin :size="14" />
          {{ product.location }}
        </span>
      </div>
    </div>
  </router-link>
</template>
