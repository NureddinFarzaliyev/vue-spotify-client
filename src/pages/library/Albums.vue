<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import { displayArtists } from '@/shared/utils/displayArtists'
import { RouterLink } from 'vue-router'

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
      <RouterLink v-else v-for="({ album }, key) in data" :key :to="`/album/${album.id}`">
        <div style="border: solid 2px #000000aa; padding: 10px; margin: 10px; width: fit-content">
          <img :src="album.images[1]?.url" />
          <p>
            <b>{{ album.name }}</b>
          </p>
          <div>
            {{ displayArtists(album.artists) }}
          </div>
        </div>
      </RouterLink>
    </div>

    <div v-if="pageLoading">Loading more...</div>
    <button @click="fetchNextPage()" :disabled="pageLoading || !nextExists">Load more</button>
  </div>
</template>
