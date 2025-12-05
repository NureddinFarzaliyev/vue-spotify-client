<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import AlbumCard from '@/shared/ui/AlbumCard.vue'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import LoadMoreButton from '@/shared/ui/LoadMoreButton.vue'
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
  <FullPageLoading v-if="loading" />
  <div v-else class="flex items-center flex-col gap-5 py-10 max-w-3xl mx-auto px-4">
    <img
      :src="artist?.images[0]?.url"
      :alt="artist?.name"
      class="rounded-xl shadow-xl shadow-black/30"
    />
    <h1 class="text-4xl mt-5 font-bold text-center">{{ artist.name }}</h1>
    <p class="mb-2 opacity-80 text-center">
      {{ artist?.genres?.join(', ') }}
    </p>
    <FullPageLoading v-if="topLoading" />
    <div v-else class="flex flex-col w-full gap-3">
      <TrackCard v-for="(track, key) in topTracks" :key :track />
    </div>
    <FullPageLoading v-if="albumsLoading" />
    <div v-else class="flex flex-wrap w-full gap-3 mt-10">
      <AlbumCard v-for="(album, key) in albums" :album :key />
    </div>
    <LoadMoreButton
      :fetchNextPage
      :nextExists
      :pageLoading="albumsPageLoading"
      :initialLoading="albumsLoading"
    />
  </div>
</template>
