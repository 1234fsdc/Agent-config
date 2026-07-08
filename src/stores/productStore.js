import { defineStore } from 'pinia'
import { initialProducts } from '../data/products'

const PRODUCTS_KEY = 'campus_market_products'

function readProducts() {
  try {
    const value = localStorage.getItem(PRODUCTS_KEY)
    return value ? JSON.parse(value) : initialProducts
  } catch {
    return initialProducts
  }
}

function writeProducts(products) {
  localStorage.setItem(PRODUCTS_KEY, JSON.stringify(products))
}

export const useProductStore = defineStore('product', {
  state: () => ({
    products: readProducts(),
  }),
  getters: {
    recommendedProducts: (state) => state.products.slice(0, 4),
  },
  actions: {
    persistProducts() {
      writeProducts(this.products)
    },
    addProduct(product) {
      const newProduct = {
        ...product,
        id: `p-${Date.now()}`,
        image: '',
      }

      this.products.unshift(newProduct)
      this.persistProducts()
      return newProduct
    },
    getProductById(id) {
      return this.products.find((product) => product.id === id)
    },
    getProductsByOwner(ownerId) {
      return this.products.filter((product) => product.ownerId === ownerId)
    },
    searchProducts({ keyword = '', category = '全部' }) {
      const normalizedKeyword = keyword.trim().toLowerCase()

      return this.products.filter((product) => {
        const matchesCategory = category === '全部' || product.category === category
        const matchesKeyword =
          !normalizedKeyword ||
          product.title.toLowerCase().includes(normalizedKeyword) ||
          product.description.toLowerCase().includes(normalizedKeyword)

        return matchesCategory && matchesKeyword
      })
    },
  },
})
