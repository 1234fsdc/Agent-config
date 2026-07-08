<script setup>
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
    <router-link class="brand" to="/">校园二手交易平台</router-link>
    <nav class="nav-links" aria-label="主导航">
      <router-link to="/">首页</router-link>
      <router-link to="/products">商品</router-link>
      <router-link to="/publish">发布</router-link>
      <router-link to="/profile">个人中心</router-link>
      <template v-if="userStore.isLoggedIn">
        <span class="nav-user">{{ userStore.currentUser.username }}</span>
        <button class="text-button" type="button" @click="logout">退出</button>
      </template>
      <router-link v-else to="/login">登录</router-link>
    </nav>
  </header>
</template>
