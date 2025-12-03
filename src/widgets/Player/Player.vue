<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import { onMounted, ref } from 'vue'

const loading = ref(true)
const player = ref()

onMounted(async () => {
  const response = await spotifyApi.get('/me/player')
  loading.value = false
  console.log(response.data)
  player.value = response.data
})
</script>

<template>
  <div style="border: 5px black solid; padding: 10px">
    <h3>Player</h3>
    <p>
      <b>Device: </b>
      {{ player?.device?.is_active }}
      {{ player?.device.name }}
      {{ player?.device?.volume_percent }}
    </p>
    <p>Shuffle: {{ player?.shuffle_state }}</p>
    <p>Smart Shuffle: {{ player?.smart_shuffle }}</p>
    <p>Repeat State: {{ player?.repeat_state }}</p>
    <p>Playing: {{ player?.is_playing }}</p>
    <p>Progress: {{ player?.progress_ms }} / {{ player?.item?.duration_ms }}</p>
    <p>{{ player?.item?.name }}</p>
    <p>
      <span v-for="(artist, key) in player?.item?.artists" :key>{{ artist?.name }}</span>
    </p>
    <img :src="player?.item?.album?.images[0]?.url" :alt="player?.item?.album?.name" />
  </div>
</template>
