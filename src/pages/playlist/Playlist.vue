<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import PlaylistTracks from '@/pages/playlist/PlaylistTracks.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = (route.params.id || '') as string

const loading = ref(true)
const pl = ref()

onMounted(async () => {
  const res = await spotifyApi.get(`/playlists/${id}`)
  loading.value = false
  pl.value = res.data
})
</script>

<template>
  <div v-if="loading">loading</div>
  <div>
    <img :src="pl?.images[0]?.url" />
    <h1>{{ pl?.name }}</h1>
    <p>{{ pl?.description }}</p>
    <i>{{ pl?.owner.display_name }}</i>
    <PlaylistTracks :id />
  </div>
</template>
