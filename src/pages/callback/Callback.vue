<script setup lang="ts">
import { getToken } from '@/shared/utils/auth/getToken'
import { useAuthStore } from '@/stores/auth'
import { onMounted, ref } from 'vue'
import { useRouter } from 'vue-router'

const loading = ref(true)
const error = ref('')

const urlParams = new URLSearchParams(window.location.search)
let code = urlParams.get('code')
const router = useRouter()
const auth = useAuthStore()

onMounted(async () => {
  const response = await getToken(code)
  loading.value = false
  if (response) {
    auth.setIsLoggedIn(true)
    router.push('/')
  } else {
    error.value = 'Unexpected error happened. Please try again.'
  }
})
</script>

<template>
  <div>
    <p class="text-center text-lg mt-20">
      {{ loading ? 'Loading...' : '' }}
      {{ error ? error : '' }}
    </p>
  </div>
</template>
