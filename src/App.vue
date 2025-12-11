<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import RightPanel from '@/widgets/RightPanel/RightPanel.vue'
import { RouterView } from 'vue-router'

const auth = useAuthStore()
</script>

<template>
  <div
    class="h-dvh overflow-hidden grid grid-cols-1 lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr] bg-[#18181B]"
  >
    <div class="h-dvh overflow-scroll">
      <RouterView />
    </div>
    <div v-if="auth.isLoggedIn" class="h-dvh overflow-scroll border-l border-white/10">
      <RightPanel />
    </div>
  </div>
</template>

<style>
@import 'tailwindcss';
@import 'tailwindcss-primeui';

@theme {
  --color-spotify: #1dd05d;
}
</style>
