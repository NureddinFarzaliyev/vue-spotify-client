<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import TrackCard from '@/shared/ui/TrackCard.vue'
import { displayArtists } from '@/shared/utils/displayArtists'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()

const id = route.params.id

const album = ref()
const loading = ref(true)

onMounted(async () => {
  const res = await spotifyApi.get(`/albums/${id}`)
  loading.value = false
  album.value = res.data
})
</script>

<template>
  <div v-if="loading">loading</div>
  <div v-else>
    <img :src="album?.images[0]?.url" />
    <h1>{{ album?.name }}</h1>
    <p>{{ displayArtists(album?.artists) }}</p>
    <TrackCard v-for="(track, key) in album?.tracks?.items" :key :track />
  </div>
</template>
