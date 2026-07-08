import { defineStore } from 'pinia'
import { initialProducts } from '../data/products'

const PRODUCTS_KEY = 'campus_market_products'

function normalizeProducts(products) {
  return products.filter((product) => product.id !== 'p-1003')
}

function readProducts() {
  try {
    const value = localStorage.getItem(PRODUCTS_KEY)
    if (!value) return initialProducts

    const products = JSON.parse(value)
    const normalizedProducts = normalizeProducts(products)

    if (JSON.stringify(products) !== JSON.stringify(normalizedProducts)) {
      writeProducts(normalizedProducts)
    }

    return normalizedProducts
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
        image: product.image || '',
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
    updateProduct(productId, values) {
      this.products = this.products.map((product) =>
        product.id === productId ? { ...product, ...values } : product,
      )
      this.persistProducts()
    },
    deleteProduct(productId) {
      this.products = this.products.filter((product) => product.id !== productId)
      this.persistProducts()
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
