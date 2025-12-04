<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import AlbumCard from '@/shared/ui/AlbumCard.vue'

const PAGE_LIMIT = 30

const { data, initialLoading, pageLoading, total, fetchNextPage, nextExists } = useInfiniteScroll(
  `/me/albums?offset=0&limit=${PAGE_LIMIT}`,
)
</script>

<template>
  <div>
    lib albums ({{ total }})

    <div style="display: flex; flex-wrap: wrap">
      <div v-if="initialLoading">Loading...</div>
      <AlbumCard v-else v-for="({ album }, key) in data" :key :album />
    </div>

    <div v-if="pageLoading">Loading more...</div>
    <button @click="fetchNextPage()" :disabled="pageLoading || !nextExists">Load more</button>
  </div>
</template>
