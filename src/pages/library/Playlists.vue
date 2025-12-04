<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import LoadMoreButton from '@/shared/ui/LoadMoreButton.vue'
import PlaylistCard from '@/shared/ui/PlaylistCard.vue'

const PAGE_LIMIT = 30

const { data, initialLoading, pageLoading, fetchNextPage, nextExists } = useInfiniteScroll(
  `/me/playlists?offset=0&limit=${PAGE_LIMIT}`,
)
</script>

<template>
  <div>
    <div class="flex flex-wrap justify-center gap-4">
      <FullPageLoading v-if="initialLoading" />
      <PlaylistCard v-for="(pl, key) in data" :pl :key />
    </div>
    <LoadMoreButton :initialLoading :pageLoading :nextExists :fetchNextPage />
  </div>
</template>
