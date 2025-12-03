<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'

const PAGE_LIMIT = 30

const { data, initialLoading, pageLoading, total, fetchNextPage, nextExists } = useInfiniteScroll(
  `/me/following?type=artist&offset=0&limit=${PAGE_LIMIT}`,
  true,
)
</script>

<template>
  <div>
    lib artists ({{ total }})

    <div style="display: flex; flex-wrap: wrap">
      <div v-if="initialLoading">Loading...</div>
      <div
        v-for="(artist, key) in data"
        v-else
        style="border: solid 2px #000000aa; padding: 10px; margin: 10px; width: fit-content"
        :key
      >
        <img :src="artist.images[1]?.url" />
        <p>
          <b>
            {{ artist.name }}
          </b>
        </p>
      </div>
    </div>

    <div v-if="pageLoading">Loading more...</div>
    <button @click="fetchNextPage()" :disabled="pageLoading || !nextExists">Load more</button>
  </div>
</template>
