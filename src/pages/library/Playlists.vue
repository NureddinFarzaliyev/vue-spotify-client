<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const PAGE_LIMIT = 30

const { data, initialLoading, pageLoading, total, fetchNextPage, nextExists } = useInfiniteScroll(
  `/me/playlists?offset=0&limit=${PAGE_LIMIT}`,
)
</script>

<template>
  <div>
    lib playlists ({{ total }})

    <div style="display: flex; flex-wrap: wrap">
      <div v-if="initialLoading">Loading...</div>
      <div
        v-for="(pl, key) in data"
        v-else
        style="border: solid 2px #000000aa; padding: 10px; margin: 10px; width: fit-content"
        :key
      >
        <p>
          <b>{{ pl.name }}</b>
        </p>

        <img :src="pl.images[1] ? pl.images[1].url : pl.images[0].url" />
      </div>
    </div>

    <div v-if="pageLoading">Loading more...</div>
    <button @click="fetchNextPage()" :disabled="pageLoading || !nextExists">Load more</button>
  </div>
</template>
