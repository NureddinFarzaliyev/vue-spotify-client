<script setup lang="ts">
import { displayArtists } from '@/shared/utils/displayArtists'

interface TrackCardProps {
  track: {
    album: {
      images: {
        url: string
      }[]
    }
    name: string
    artists: { name: string }[]
    duration_ms: number
  }
}

const { track } = defineProps<TrackCardProps>()
</script>

<template>
  <div>
    <img v-if="track.album?.images[2]?.url" :src="track.album.images[2].url" />
    <b>{{ track.name }}</b>
    <p>{{ displayArtists(track.artists) }}</p>
    <i> {{ track.duration_ms }} </i>
  </div>
</template>
