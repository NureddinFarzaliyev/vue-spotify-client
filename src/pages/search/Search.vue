<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import SearchResultTag from '@/pages/search/SearchResultTag.vue'
import AlbumCard from '@/shared/ui/AlbumCard.vue'
import BasicLinkCard from '@/shared/ui/BasicLinkCard.vue'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import PlaylistCard from '@/shared/ui/PlaylistCard.vue'
import TrackCard from '@/shared/ui/TrackCard.vue'
import { InputText } from 'primevue'
import { ref } from 'vue'

const query = ref('')
const resultsLoading = ref(false)
const results = ref()
const chosenTag = ref('albums')

const onSubmit = async () => {
  resultsLoading.value = true
  const q = new URLSearchParams({ q: query.value }).toString()
  const res = await spotifyApi.get(`/search?${q}&type=album,track,playlist,artist`)
  results.value = res.data
  resultsLoading.value = false
}

const onTagClick = (value: string) => {
  chosenTag.value = value
}
</script>

<template>
  <div class="relative">
    <form @submit.prevent="onSubmit">
      <InputText type="text" v-model="query" placeholder="Search..." class="rounded-xl! w-full" />
    </form>
    <div v-if="!resultsLoading && results" class="my-4 flex gap-3">
      <SearchResultTag
        text="Albums"
        :isActive="chosenTag === 'albums'"
        :onClick="() => onTagClick('albums')"
      />
      <SearchResultTag
        text="Tracks"
        :isActive="chosenTag === 'tracks'"
        :onClick="() => onTagClick('tracks')"
      />
      <SearchResultTag
        text="Artists"
        :isActive="chosenTag === 'artists'"
        :onClick="() => onTagClick('artists')"
      />
      <SearchResultTag
        text="Playlists"
        :isActive="chosenTag === 'playlists'"
        :onClick="() => onTagClick('playlists')"
      />
    </div>
    <FullPageLoading v-if="resultsLoading" />
    <div v-else v-if="results">
      <div class="flex flex-wrap gap-4" v-if="results.albums && chosenTag === 'albums'">
        <AlbumCard v-for="(album, key) in results.albums.items" :key :album />
      </div>
      <div class="flex flex-col gap-1.5 w-full" v-if="results.tracks && chosenTag === 'tracks'">
        <TrackCard v-for="(track, key) in results.tracks.items" :key :track />
      </div>
      <div class="flex flex-wrap gap-1.5 w-full" v-if="results.artists && chosenTag === 'artists'">
        <BasicLinkCard
          v-for="(artist, key) in results.artists.items"
          :key
          :to="`/artist/${artist.id}`"
          :src="artist.images[1]?.url"
          :primaryText="artist.name"
        />
      </div>
      <div
        class="flex flex-wrap gap-1.5 w-full"
        v-if="results.playlists && chosenTag === 'playlists'"
      >
        <PlaylistCard v-for="(pl, key) in results.playlists.items" :pl :key />
      </div>
    </div>
  </div>
</template>
