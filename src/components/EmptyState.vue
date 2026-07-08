<script setup>
defineProps({
  title: {
    type: String,
    default: '暂无数据',
  },
  description: {
    type: String,
    default: '请调整筛选条件后再试。',
  },
})
</script>

<template>
  <div class="empty-state">
    <strong>{{ title }}</strong>
    <p>{{ description }}</p>
  </div>
</template>
