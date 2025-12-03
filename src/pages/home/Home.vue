<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import Login from '@/widgets/Login/Login.vue'
import MyProfile from '@/widgets/MyProfile/MyProfile.vue'
import Player from '@/widgets/Player/Player.vue'

const auth = useAuthStore()
</script>

<template>
  <div>
    <h3>Home</h3>
    <Login />
    <div v-if="auth.isLoggedIn">
      <MyProfile />
      <Player />
    </div>
  </div>
</template>
