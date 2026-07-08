<script setup>
defineProps({
  product: {
    type: Object,
    required: true,
  },
})
</script>

<template>
  <router-link class="product-card" :to="`/products/${product.id}`">
    <div class="product-image">
      {{ product.category.slice(0, 2) }}
    </div>
    <div class="product-body">
      <div class="product-meta">
        <span>{{ product.category }}</span>
        <span>{{ product.condition }}</span>
      </div>
      <h2>{{ product.title }}</h2>
      <p>{{ product.description }}</p>
      <div class="product-bottom">
        <strong>￥{{ product.price }}</strong>
        <span>{{ product.location }}</span>
      </div>
    </div>
  </router-link>
</template>
