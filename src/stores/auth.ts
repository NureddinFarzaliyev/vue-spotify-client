import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = localStorage.getItem('access_token')

  const isToken = token && token !== 'undefined'
  const isLoggedIn = ref(isToken ? true : false)

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
