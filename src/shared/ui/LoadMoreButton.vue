<script setup lang="ts">
import classNames from 'classnames'
import { Button } from 'primevue'

interface LoadMoreBtnProps {
  initialLoading: boolean
  pageLoading: boolean
  nextExists: boolean
  fetchNextPage: () => void
  noMargin?: boolean
  variant?: string
}
defineProps<LoadMoreBtnProps>()
</script>

<template>
  <div :class="classNames('flex justify-center', !noMargin && 'my-8')">
    <Button
      v-if="!initialLoading"
      @click="fetchNextPage()"
      :disabled="pageLoading || !nextExists"
      :loading="pageLoading"
      :variant
    >
      {{ pageLoading ? 'Loading...' : 'Load More' }}
    </Button>
  </div>
</template>
