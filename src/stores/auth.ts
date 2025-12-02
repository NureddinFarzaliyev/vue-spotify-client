import { defineStore } from 'pinia'
import { ref } from 'vue'

export const useAuthStore = defineStore('auth', () => {
  const token = localStorage.getItem('access_token')

  const isLoggedIn = ref(token ? true : false)

  const setIsLoggedIn = (val: boolean) => {
    isLoggedIn.value = val
  }

  return { isLoggedIn, setIsLoggedIn }
})
