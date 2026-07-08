<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { productCategories } from '../data/products'
import { useProductStore } from '../stores/productStore'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const productStore = useProductStore()
const userStore = useUserStore()
const message = ref('')
const categories = productCategories.filter((item) => item !== '全部')
const form = reactive({
  title: '',
  price: '',
  category: '',
  condition: '',
  location: '',
  contact: '',
  description: '',
  image: '',
})

function handleImageChange(event) {
  const file = event.target.files?.[0]

  if (!file) {
    form.image = ''
    return
  }

  if (!file.type.startsWith('image/')) {
    message.value = '\u8bf7\u9009\u62e9\u56fe\u7247\u6587\u4ef6'
    event.target.value = ''
    form.image = ''
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    message.value = '\u56fe\u7247\u5927\u5c0f\u4e0d\u80fd\u8d85\u8fc7 2MB'
    event.target.value = ''
    form.image = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    form.image = String(reader.result || '')
    message.value = ''
  }
  reader.readAsDataURL(file)
}

function submitProduct() {
  if (!form.title.trim()) {
    message.value = '请输入商品名称'
    return
  }

  if (!form.price || Number.isNaN(Number(form.price))) {
    message.value = '请输入有效价格'
    return
  }

  if (!form.category) {
    message.value = '请选择商品分类'
    return
  }

  if (!form.condition.trim()) {
    message.value = '请输入商品成色'
    return
  }

  if (!form.description.trim()) {
    message.value = '请输入商品描述'
    return
  }

  const currentUser = userStore.currentUser

  const product = productStore.addProduct({
    title: form.title.trim(),
    price: Number(form.price),
    category: form.category,
    condition: form.condition.trim(),
    location: form.location.trim() || '校内面交',
    description: form.description.trim(),
    sellerName: currentUser.username,
    contact: form.contact.trim() || '请私下联系',
    ownerId: currentUser.id,
    image: form.image,
  })

  message.value = '发布成功'
  router.push(`/products/${product.id}`)
}
</script>

<template>
  <section class="page-section narrow-page">
    <p class="eyebrow">发布闲置</p>
    <h1>发布商品</h1>
    <form class="form-card" @submit.prevent="submitProduct">
      <label class="form-control">
        <span>商品名称</span>
        <input v-model="form.title" type="text" placeholder="例如：Vue3 教材" />
      </label>
      <label class="form-control">
        <span>价格</span>
        <input v-model="form.price" type="number" min="0" placeholder="请输入价格" />
      </label>
      <label class="form-control">
        <span>分类</span>
        <select v-model="form.category">
          <option value="">请选择分类</option>
          <option v-for="category in categories" :key="category" :value="category">
            {{ category }}
          </option>
        </select>
      </label>
      <label class="form-control">
        <span>成色</span>
        <input v-model="form.condition" type="text" placeholder="例如：九成新" />
      </label>
      <label class="form-control">
        <span>交易地点</span>
        <input v-model="form.location" type="text" placeholder="例如：图书馆门口" />
      </label>
      <label class="form-control">
        <span>联系方式</span>
        <input v-model="form.contact" type="text" placeholder="请输入联系方式" />
      </label>
      <label class="form-control">
        <span>商品描述</span>
        <textarea v-model="form.description" rows="4" placeholder="说明商品情况"></textarea>
      </label>
      <label class="form-control">
        <span>&#21830;&#21697;&#22270;&#29255;</span>
        <div class="image-upload">
          <div class="image-preview">
            <img v-if="form.image" :src="form.image" alt="product image preview" />
            <span v-else>&#36873;&#25321;&#22270;&#29255;&#21518;&#26174;&#31034;&#39044;&#35272;</span>
          </div>
          <input type="file" accept="image/*" @change="handleImageChange" />
        </div>
      </label>
      <button class="primary-button full-button" type="submit">发布商品</button>
      <p v-if="message" class="form-message">{{ message }}</p>
    </form>
  </section>
</template>
