<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import LoadMoreButton from '@/shared/ui/LoadMoreButton.vue'
import TrackCard from '@/shared/ui/TrackCard.vue'

const { id } = defineProps<{ id: string }>()

const { pageLoading, initialLoading, data, nextExists, fetchNextPage } = useInfiniteScroll(
  `/playlists/${id}/tracks`,
)
</script>

<template>
  <FullPageLoading v-if="initialLoading" />
  <div v-else class="flex flex-col gap-3 w-full">
    <TrackCard v-for="({ track }, key) in data" :key :track />
    <LoadMoreButton :fetchNextPage :pageLoading :nextExists :initialLoading />
  </div>
</template>
