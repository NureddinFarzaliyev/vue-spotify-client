<script setup lang="ts">
import { useAuthStore } from '@/stores/auth'
import RightPanel from '@/widgets/RightPanel/RightPanel.vue'
import { Splitter, SplitterPanel } from 'primevue'
import { RouterView } from 'vue-router'

const auth = useAuthStore()
</script>

<template>
  <Splitter class="h-dvh overflow-hidden">
    <SplitterPanel :minSize="50" class="h-dvh overflow-scroll">
      <RouterView />
    </SplitterPanel>
    <SplitterPanel v-if="auth.isLoggedIn" :size="5" :minSize="20" class="h-dvh overflow-scroll">
      <RightPanel />
    </SplitterPanel>
  </Splitter>
</template>

<style>
@import 'tailwindcss';
@import 'tailwindcss-primeui';

@theme {
  --color-spotify: #1dd05d;
}
</style>
