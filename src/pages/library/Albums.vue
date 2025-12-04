<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import AlbumCard from '@/shared/ui/AlbumCard.vue'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import LoadMoreButton from '@/shared/ui/LoadMoreButton.vue'

const PAGE_LIMIT = 30

const { data, initialLoading, pageLoading, fetchNextPage, nextExists } = useInfiniteScroll(
  `/me/albums?offset=0&limit=${PAGE_LIMIT}`,
)
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-4 justify-center">
      <FullPageLoading v-if="initialLoading" />
      <AlbumCard v-else v-for="({ album }, key) in data" :key :album />
    </div>
    <LoadMoreButton :initialLoading :pageLoading :nextExists :fetchNextPage />
  </div>
</template>
