<script setup lang="ts">
import Library from '@/pages/library/Library.vue'
import { useAuthStore } from '@/stores/auth'
import Login from '@/widgets/Login/Login.vue'

const auth = useAuthStore()
</script>

<template>
  <div>
    <Login />
    <div v-if="auth.isLoggedIn">
      <Library />
    </div>
  </div>
</template>
