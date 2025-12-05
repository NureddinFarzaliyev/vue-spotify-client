<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
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
  <FullPageLoading v-if="loading" />
  <div v-else class="flex items-center flex-col gap-5 py-10 max-w-3xl mx-auto px-4">
    <img :src="album?.images[0]?.url" class="rounded-xl shadow-xl shadow-black/30" />
    <h1 class="text-4xl mt-5 font-bold text-center">{{ album?.name }}</h1>
    <p class="text-xl mb-5 opacity-80 text-center">{{ displayArtists(album?.artists) }}</p>
    <div class="flex flex-col w-full gap-3">
      <TrackCard v-for="(track, key) in album?.tracks?.items" :key :track class="w-full" />
    </div>
  </div>
</template>
