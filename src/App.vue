<script setup lang="ts">
import RightPanel from '@/widgets/RightPanel/RightPanel.vue'
import { Splitter, SplitterPanel } from 'primevue'
import { RouterView } from 'vue-router'
</script>

<template>
  <Splitter class="h-dvh overflow-hidden">
    <SplitterPanel :minSize="50" class="h-dvh overflow-scroll">
      <RouterView />
    </SplitterPanel>
    <SplitterPanel :size="5" :minSize="20" class="h-dvh overflow-scroll">
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
