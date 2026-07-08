<script setup>
import { LogIn, LogOut, PlusCircle, ShoppingBag, UserRound } from 'lucide-vue-next'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()

function logout() {
  userStore.logout()
  router.push('/login')
}
</script>

<template>
  <header class="app-header">
    <router-link class="brand" to="/">
      <span class="brand-mark">CM</span>
      <span>
        <strong>Campus Market</strong>
        <small>校园二手交易平台</small>
      </span>
    </router-link>
    <nav class="nav-links" aria-label="主导航">
      <router-link to="/">首页</router-link>
      <router-link to="/products">
        <ShoppingBag :size="16" />
        商品
      </router-link>
      <router-link to="/publish">
        <PlusCircle :size="16" />
        发布
      </router-link>
      <router-link to="/profile">
        <UserRound :size="16" />
        个人中心
      </router-link>
      <template v-if="userStore.isLoggedIn">
        <span class="nav-user">{{ userStore.currentUser.username }}</span>
        <button class="text-button" type="button" @click="logout">
          <LogOut :size="16" />
          退出
        </button>
      </template>
      <router-link v-else class="nav-cta" to="/login">
        <LogIn :size="16" />
        登录
      </router-link>
    </nav>
  </header>
</template>
