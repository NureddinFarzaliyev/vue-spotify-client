<script setup lang="ts">
import { login } from '@/shared/utils/auth/login'
import { useAuthStore } from '@/stores/auth'
import { ref } from 'vue'

const loading = ref(false)
const auth = useAuthStore()

const handleLogin = async () => {
  loading.value = true
  await login()
  loading.value = false
}

const handleLogout = () => {
  localStorage.removeItem('access_token')
  localStorage.removeItem('refresh_token')
  localStorage.removeItem('code_verifier')
  auth.setIsLoggedIn(false)
}
</script>

<template>
  <button v-if="!auth.isLoggedIn" :disabled="loading" @click="handleLogin">
    {{ loading ? 'Loading...' : 'Login' }}
  </button>
  <button v-else @click="handleLogout">Log out</button>
</template>
