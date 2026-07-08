<script setup>
import { reactive, ref } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const route = useRoute()
const router = useRouter()
const userStore = useUserStore()
const message = ref('')
const form = reactive({
  username: '',
  password: '',
})

function submitLogin() {
  if (!form.username.trim()) {
    message.value = '请输入用户名'
    return
  }

  if (!form.password) {
    message.value = '请输入密码'
    return
  }

  const result = userStore.login({
    username: form.username,
    password: form.password,
  })

  message.value = result.message

  if (result.ok) {
    router.push(route.query.redirect || '/')
  }
}
</script>

<template>
  <section class="page-section narrow-page">
    <p class="eyebrow">用户入口</p>
    <h1>登录</h1>
    <form class="form-card" @submit.prevent="submitLogin">
      <label class="form-control">
        <span>用户名</span>
        <input v-model="form.username" type="text" placeholder="请输入用户名" />
      </label>
      <label class="form-control">
        <span>密码</span>
        <input v-model="form.password" type="password" placeholder="请输入密码" />
      </label>
      <button class="primary-button full-button" type="submit">登录</button>
      <p v-if="message" class="form-message">{{ message }}</p>
      <p class="muted-text">
        没有账号？
        <router-link class="inline-link" to="/register">去注册</router-link>
      </p>
    </form>
  </section>
</template>
