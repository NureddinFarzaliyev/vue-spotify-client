<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import AlbumCard from '@/shared/ui/AlbumCard.vue'
import TrackCard from '@/shared/ui/TrackCard.vue'
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'

const route = useRoute()
const id = route.params.id

const loading = ref(true)
const artist = ref()

const topLoading = ref(true)
const topTracks = ref()

const fetchData = async () => {
  const res = await spotifyApi.get(`/artists/${id}`)
  loading.value = false
  artist.value = res.data
}

const fetchTopTracks = async () => {
  const resTop = await spotifyApi.get(`/artists/${id}/top-tracks`)
  topLoading.value = false
  topTracks.value = resTop.data.tracks
}

const {
  data: albums,
  initialLoading: albumsLoading,
  nextExists,
  pageLoading: albumsPageLoading,
  fetchNextPage,
} = useInfiniteScroll(`/artists/${id}/albums`)

onMounted(() => {
  fetchData()
  fetchTopTracks()
})
</script>

<template>
  <div v-if="loading">Loading...</div>
  <div v-else>
    <h1>{{ artist.name }}</h1>
    <img :src="artist?.images[0]?.url" :alt="artist?.name" />
    <p>Followers: {{ artist?.followers?.total }}</p>
    <p>
      {{ artist?.genres?.join(' ') }}
    </p>
    <div v-if="topLoading">Loading...</div>
    <div v-else>
      <TrackCard v-for="(track, key) in topTracks" :key :track />
    </div>
    <div v-if="albumsLoading">Loading...</div>
    <div v-else>
      <AlbumCard v-for="(album, key) in albums" :album :key />
      <button @click="fetchNextPage()" :disabled="albumsPageLoading || !nextExists">
        Load more
      </button>
    </div>
  </div>
</template>
