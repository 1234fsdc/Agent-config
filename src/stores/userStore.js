import { defineStore } from 'pinia'

const USERS_KEY = 'campus_market_users'
const CURRENT_USER_KEY = 'campus_market_current_user'

function readJson(key, fallback) {
  try {
    const value = localStorage.getItem(key)
    return value ? JSON.parse(value) : fallback
  } catch {
    return fallback
  }
}

function writeJson(key, value) {
  localStorage.setItem(key, JSON.stringify(value))
}

export const useUserStore = defineStore('user', {
  state: () => ({
    users: readJson(USERS_KEY, []),
    currentUser: readJson(CURRENT_USER_KEY, null),
  }),
  getters: {
    isLoggedIn: (state) => Boolean(state.currentUser),
    favoriteIds: (state) => state.currentUser?.favoriteIds ?? [],
  },
  actions: {
    persistUsers() {
      writeJson(USERS_KEY, this.users)
    },
    persistCurrentUser() {
      if (this.currentUser) {
        writeJson(CURRENT_USER_KEY, this.currentUser)
      } else {
        localStorage.removeItem(CURRENT_USER_KEY)
      }
    },
    register({ username, password }) {
      const trimmedName = username.trim()

      if (this.users.some((user) => user.username === trimmedName)) {
        return { ok: false, message: '用户名已存在' }
      }

      const user = {
        id: `u-${Date.now()}`,
        username: trimmedName,
        password,
        favoriteIds: [],
      }

      this.users.push(user)
      this.persistUsers()
      return { ok: true, message: '注册成功' }
    },
    login({ username, password }) {
      const user = this.users.find(
        (item) => item.username === username.trim() && item.password === password,
      )

      if (!user) {
        return { ok: false, message: '账号或密码错误' }
      }

      this.currentUser = { ...user }
      this.persistCurrentUser()
      return { ok: true, message: '登录成功' }
    },
    logout() {
      this.currentUser = null
      this.persistCurrentUser()
    },
    toggleFavorite(productId) {
      if (!this.currentUser) {
        return { ok: false, message: '请先登录后再收藏' }
      }

      const favoriteIds = this.currentUser.favoriteIds ?? []
      const exists = favoriteIds.includes(productId)
      const nextFavoriteIds = exists
        ? favoriteIds.filter((id) => id !== productId)
        : [...favoriteIds, productId]

      this.currentUser = {
        ...this.currentUser,
        favoriteIds: nextFavoriteIds,
      }

      this.users = this.users.map((user) =>
        user.id === this.currentUser.id ? { ...user, favoriteIds: nextFavoriteIds } : user,
      )

      this.persistCurrentUser()
      this.persistUsers()

      return {
        ok: true,
        message: exists ? '已取消收藏' : '收藏成功',
      }
    },
    removeFavorite(productId) {
      this.users = this.users.map((user) => ({
        ...user,
        favoriteIds: (user.favoriteIds ?? []).filter((id) => id !== productId),
      }))

      if (this.currentUser) {
        this.currentUser = {
          ...this.currentUser,
          favoriteIds: (this.currentUser.favoriteIds ?? []).filter((id) => id !== productId),
        }
        this.persistCurrentUser()
      }

      this.persistUsers()
    },
    isFavorite(productId) {
      return this.favoriteIds.includes(productId)
    },
  },
})
