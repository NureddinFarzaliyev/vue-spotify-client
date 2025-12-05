<script setup lang="ts">
import { displayArtists } from '@/shared/utils/displayArtists'
import { msToTime } from '@/shared/utils/msToTime'
import { Disc } from 'lucide-vue-next'

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
  <div
    class="bg-black/50 hover:bg-black transition-colors rounded-md p-2 flex items-center justify-between gap-4 cursor-pointer"
  >
    <div class="flex items-center gap-4">
      <img
        v-if="track.album?.images[2]?.url"
        :src="track.album.images[2].url"
        class="h-12 w-12 rounded"
      />
      <div v-else class="opacity-70 pl-2"><Disc :size="36" /></div>
      <div>
        <b>{{ track.name }}</b>
        <p class="text-xs opacity-80 mt-1">{{ displayArtists(track.artists) }}</p>
      </div>
    </div>
    <p class="text-sm opacity-50">{{ msToTime(track.duration_ms) }}</p>
  </div>
</template>
