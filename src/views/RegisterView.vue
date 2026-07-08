<script setup>
import { reactive, ref } from 'vue'
import { useRouter } from 'vue-router'
import { useUserStore } from '../stores/userStore'

const router = useRouter()
const userStore = useUserStore()
const message = ref('')
const form = reactive({
  username: '',
  password: '',
  confirmPassword: '',
})

function submitRegister() {
  if (!form.username.trim()) {
    message.value = '请输入用户名'
    return
  }

  if (!form.password) {
    message.value = '请输入密码'
    return
  }

  if (form.password !== form.confirmPassword) {
    message.value = '两次输入的密码不一致'
    return
  }

  const result = userStore.register({
    username: form.username,
    password: form.password,
  })

  message.value = result.message

  if (result.ok) {
    router.push('/login')
  }
}
</script>

<template>
  <section class="page-section narrow-page">
    <p class="eyebrow">新用户</p>
    <h1>注册</h1>
    <form class="form-card" @submit.prevent="submitRegister">
      <label class="form-control">
        <span>用户名</span>
        <input v-model="form.username" type="text" placeholder="请输入用户名" />
      </label>
      <label class="form-control">
        <span>密码</span>
        <input v-model="form.password" type="password" placeholder="请输入密码" />
      </label>
      <label class="form-control">
        <span>确认密码</span>
        <input v-model="form.confirmPassword" type="password" placeholder="请再次输入密码" />
      </label>
      <button class="primary-button full-button" type="submit">注册</button>
      <p v-if="message" class="form-message">{{ message }}</p>
      <p class="muted-text">
        已有账号？
        <router-link class="inline-link" to="/login">去登录</router-link>
      </p>
    </form>
  </section>
</template>
