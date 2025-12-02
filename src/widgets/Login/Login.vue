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
</script>

<template>
  <button v-if="!auth.isLoggedIn" :disabled="loading" @click="handleLogin">
    {{ loading ? 'Loading...' : 'Login' }}
  </button>
</template>
