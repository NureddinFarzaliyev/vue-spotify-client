<script setup lang="ts">
import { login } from '@/shared/utils/auth/login'
import { useAuthStore } from '@/stores/auth'
import { Button } from 'primevue'
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
  <div
    class="flex items-center justify-center h-dvh w-dvw flex-col gap-4 px-4"
    v-if="!auth.isLoggedIn"
  >
    <h1 class="font-bold text-2xl text-center">Vue Spotify Client</h1>
    <p class="opacity-80 text-center">
      Connect your spotify account to start using Vue Spotify Client
    </p>
    <Button
      raised
      variant="outlined"
      class="mt-6 w-full md:w-xl h-14 text-lg"
      :disabled="loading"
      :loading
      @click="handleLogin"
    >
      Login
    </Button>
  </div>
</template>
