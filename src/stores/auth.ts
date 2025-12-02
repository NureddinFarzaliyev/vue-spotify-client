import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = localStorage.getItem('access_token')

  const isLoggedIn = ref(token ? true : false)

  const setIsLoggedIn = (val: boolean) => {
    isLoggedIn.value = val
  }

  const logout = () => {
    localStorage.removeItem('access_token')
    localStorage.removeItem('refresh_token')
    localStorage.removeItem('code_verifier')
    isLoggedIn.value = false
  }

  return { isLoggedIn, setIsLoggedIn, logout }
})
