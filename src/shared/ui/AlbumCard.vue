<script setup lang="ts">
import { displayArtists } from '@/shared/utils/displayArtists'
import { RouterLink } from 'vue-router'

interface AlbumCardProps {
  album: {
    id: string
    name: string
    artists: { name: string }[]
    images: { url: string }[]
  }
}

defineProps<AlbumCardProps>()
</script>

<template>
  <RouterLink :to="`/album/${album.id}`">
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
</template>
