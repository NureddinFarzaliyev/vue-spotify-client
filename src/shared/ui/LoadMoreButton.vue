<script setup lang="ts">
import { Button } from 'primevue'

interface LoadMoreBtnProps {
  initialLoading: boolean
  pageLoading: boolean
  nextExists: boolean
  fetchNextPage: () => void
}
defineProps<LoadMoreBtnProps>()
</script>

<template>
  <div class="flex justify-center my-8">
    <Button
      v-if="!initialLoading"
      @click="fetchNextPage()"
      :disabled="pageLoading || !nextExists"
      :loading="pageLoading"
    >
      {{ pageLoading ? 'Loading...' : 'Load More' }}
    </Button>
  </div>
</template>
