<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import TrackCard from '@/shared/ui/TrackCard.vue'

const { id } = defineProps<{ id: string }>()

const { pageLoading, initialLoading, data, nextExists, fetchNextPage } = useInfiniteScroll(
  `/playlists/${id}/tracks`,
)
</script>

<template>
  <div v-if="initialLoading">loading...</div>
  <div v-else>
    <TrackCard v-for="({ track }, key) in data" :key :track />
    <button @click="fetchNextPage()" :disabled="pageLoading || !nextExists">Load more</button>
  </div>
</template>
