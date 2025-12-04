<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import MyProfile from '@/widgets/MyProfile/MyProfile.vue'
import Player from '@/widgets/Player/Player.vue'

const auth = useAuthStore()
</script>

<template>
  <div v-if="auth.isLoggedIn" class="p-10 flex flex-col gap-10">
    <Player />
    <MyProfile />
  </div>
</template>
