<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import RightPanel from '@/widgets/RightPanel/RightPanel.vue'
import classNames from 'classnames'
import { RouterView } from 'vue-router'

const auth = useAuthStore()
</script>

<template>
  <div
    :class="
      classNames(
        'h-dvh overflow-hidden grid grid-cols-1 bg-[#18181B]',
        auth.isLoggedIn && 'lg:grid-cols-[2fr_1fr] xl:grid-cols-[3fr_1fr]',
      )
    "
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
