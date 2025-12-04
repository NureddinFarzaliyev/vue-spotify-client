<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Login from '@/widgets/Login/Login.vue'

const auth = useAuthStore()
</script>

<template>
  <div>
    <Login />
    <div v-if="auth.isLoggedIn">menu</div>
  </div>
</template>
