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
  <FullPageLoading v-if="loading" />
  <div v-else class="flex items-center flex-col gap-5 py-10 max-w-3xl mx-auto px-4">
    <img :src="pl?.images[0]?.url" class="rounded-xl shadow-xl shadow-black/30" />
    <h1 class="text-4xl mt-5 font-bold text-center">{{ pl?.name }}</h1>
    <p v-if="pl?.description" class="text-xl mb-2 opacity-80 text-center">{{ pl?.description }}</p>
    <i class="text-xl mb-5 opacity-80 text-center">{{ pl?.owner.display_name }}</i>
    <PlaylistTracks :id />
  </div>
</template>
