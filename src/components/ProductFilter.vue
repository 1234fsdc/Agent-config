<script setup>
import { Search, SlidersHorizontal } from 'lucide-vue-next'
import { productCategories } from '../data/products'

defineProps({
  keyword: {
    type: String,
    default: '',
  },
  category: {
    type: String,
    default: '全部',
  },
})

const emit = defineEmits(['update:keyword', 'update:category'])
</script>

<template>
  <div class="filter-bar">
    <label class="filter-control search-control">
      <Search :size="18" />
      <input
        :value="keyword"
        type="search"
        placeholder="搜索商品名称或描述"
        @input="emit('update:keyword', $event.target.value)"
      />
    </label>
    <label class="filter-control select-control">
      <SlidersHorizontal :size="18" />
      <select :value="category" @change="emit('update:category', $event.target.value)">
        <option v-for="item in productCategories" :key="item" :value="item">
          {{ item }}
        </option>
      </select>
    </label>
  </div>
</template>
