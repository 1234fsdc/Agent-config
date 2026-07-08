<script setup>
import { MapPin } from 'lucide-vue-next'
import { ref } from 'vue'

defineProps({
  product: {
    type: Object,
    required: true,
  },
})

const imageLoadFailed = ref(false)

function handleImageError() {
  imageLoadFailed.value = true
}
</script>

<template>
  <router-link class="product-card" :to="`/products/${product.id}`">
    <div class="product-image">
      <img
        v-if="product.image && !imageLoadFailed"
        :src="product.image"
        :alt="product.title"
        @error="handleImageError"
      />
      <div v-else class="product-image-empty">&#26242;&#26080;&#22270;&#29255;</div>
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
