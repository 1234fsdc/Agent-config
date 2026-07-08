<script setup>
import { computed, reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import EmptyState from '../components/EmptyState.vue'
import ProductCard from '../components/ProductCard.vue'
import { productCategories } from '../data/products'
import { useProductStore } from '../stores/productStore'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const productStore = useProductStore()
const userStore = useUserStore()
const editingProductId = ref('')
const editMessage = ref('')
const categories = productCategories.filter((item) => item !== '全部')
const editForm = reactive({
  title: '',
  price: '',
  category: '',
  condition: '',
  location: '',
  contact: '',
  description: '',
  image: '',
})

const favoriteProducts = computed(() =>
  productStore.products.filter((product) => userStore.favoriteIds.includes(product.id)),
)
const ownedProducts = computed(() => productStore.getProductsByOwner(userStore.currentUser?.id))
const editingProduct = computed(() =>
  productStore.products.find((product) => product.id === editingProductId.value),
)

function logout() {
  userStore.logout()
  router.push('/login')
}

function cancelFavorite(productId) {
  userStore.removeFavorite(productId)
}

function viewProduct(productId) {
  router.push(`/products/${productId}`)
}

function startEdit(product) {
  editingProductId.value = product.id
  editMessage.value = ''
  Object.assign(editForm, {
    title: product.title,
    price: String(product.price),
    category: product.category,
    condition: product.condition,
    location: product.location,
    contact: product.contact,
    description: product.description,
    image: product.image || '',
  })
}

function cancelEdit() {
  editingProductId.value = ''
  editMessage.value = ''
}

function handleEditImageChange(event) {
  const file = event.target.files?.[0]

  if (!file) return

  if (!file.type.startsWith('image/')) {
    editMessage.value = '\u8bf7\u9009\u62e9\u56fe\u7247\u6587\u4ef6'
    event.target.value = ''
    return
  }

  if (file.size > 2 * 1024 * 1024) {
    editMessage.value = '\u56fe\u7247\u5927\u5c0f\u4e0d\u80fd\u8d85\u8fc7 2MB'
    event.target.value = ''
    return
  }

  const reader = new FileReader()
  reader.onload = () => {
    editForm.image = String(reader.result || '')
    editMessage.value = ''
  }
  reader.readAsDataURL(file)
}

function saveEdit() {
  if (!editingProduct.value) return

  if (!editForm.title.trim()) {
    editMessage.value = '请输入商品名称'
    return
  }

  if (!editForm.price || Number.isNaN(Number(editForm.price))) {
    editMessage.value = '请输入有效价格'
    return
  }

  if (!editForm.category) {
    editMessage.value = '请选择商品分类'
    return
  }

  if (!editForm.condition.trim()) {
    editMessage.value = '请输入商品成色'
    return
  }

  if (!editForm.description.trim()) {
    editMessage.value = '请输入商品描述'
    return
  }

  productStore.updateProduct(editingProductId.value, {
    title: editForm.title.trim(),
    price: Number(editForm.price),
    category: editForm.category,
    condition: editForm.condition.trim(),
    location: editForm.location.trim() || '校内面交',
    contact: editForm.contact.trim() || '请私下联系',
    description: editForm.description.trim(),
    image: editForm.image,
  })

  editMessage.value = '修改成功'
  editingProductId.value = ''
}

function deleteProduct(product) {
  if (!window.confirm(`确定删除“${product.title}”吗？`)) return

  productStore.deleteProduct(product.id)
  userStore.removeFavorite(product.id)

  if (editingProductId.value === product.id) {
    cancelEdit()
  }
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
        <div v-for="product in favoriteProducts" :key="product.id" class="managed-product-card">
          <ProductCard :product="product" />
          <div class="product-actions">
            <button class="secondary-button" type="button" @click="viewProduct(product.id)">
              查看
            </button>
            <button class="danger-button" type="button" @click="cancelFavorite(product.id)">
              取消收藏
            </button>
          </div>
        </div>
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

      <form v-if="editingProduct" class="form-card edit-card" @submit.prevent="saveEdit">
        <div class="section-heading">
          <p class="eyebrow">编辑商品</p>
          <h2>{{ editingProduct.title }}</h2>
        </div>
        <label class="form-control">
          <span>商品名称</span>
          <input v-model="editForm.title" type="text" />
        </label>
        <label class="form-control">
          <span>价格</span>
          <input v-model="editForm.price" type="number" min="0" />
        </label>
        <label class="form-control">
          <span>分类</span>
          <select v-model="editForm.category">
            <option value="">请选择分类</option>
            <option v-for="category in categories" :key="category" :value="category">
              {{ category }}
            </option>
          </select>
        </label>
        <label class="form-control">
          <span>成色</span>
          <input v-model="editForm.condition" type="text" />
        </label>
        <label class="form-control">
          <span>交易地点</span>
          <input v-model="editForm.location" type="text" />
        </label>
        <label class="form-control">
          <span>联系方式</span>
          <input v-model="editForm.contact" type="text" />
        </label>
        <label class="form-control">
          <span>商品描述</span>
          <textarea v-model="editForm.description" rows="4"></textarea>
        </label>
        <label class="form-control">
          <span>商品图片</span>
          <div class="image-upload">
            <div class="image-preview">
              <img v-if="editForm.image" :src="editForm.image" alt="product image preview" />
              <span v-else>选择图片后显示预览</span>
            </div>
            <input type="file" accept="image/*" @change="handleEditImageChange" />
          </div>
        </label>
        <div class="product-actions">
          <button class="primary-button" type="submit">保存修改</button>
          <button class="secondary-button" type="button" @click="cancelEdit">取消</button>
        </div>
        <p v-if="editMessage" class="form-message">{{ editMessage }}</p>
      </form>

      <div v-if="ownedProducts.length" class="product-grid">
        <div v-for="product in ownedProducts" :key="product.id" class="managed-product-card">
          <ProductCard :product="product" />
          <div class="product-actions">
            <button class="secondary-button" type="button" @click="viewProduct(product.id)">
              查看
            </button>
            <button class="secondary-button" type="button" @click="startEdit(product)">
              编辑
            </button>
            <button class="danger-button" type="button" @click="deleteProduct(product)">
              删除
            </button>
          </div>
        </div>
      </div>
      <EmptyState v-else title="还没有发布商品" description="发布闲置后会显示在这里。" />
    </section>
  </section>
</template>
