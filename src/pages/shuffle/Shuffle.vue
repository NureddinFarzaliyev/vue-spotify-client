<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import { fetchNextRecursively } from '@/shared/utils/fetchNextRecursively'
import { shuffleHundred } from '@/shared/utils/shuffle'
import { useAuthStore } from '@/stores/auth'
import classNames from 'classnames'
import { ShuffleIcon } from 'lucide-vue-next'
import { Button, Select } from 'primevue'
import { onMounted, ref } from 'vue'

enum StatusTypes {
  INFO = 'info',
  ERR = 'error',
  SUC = 'success',
}

type TempPlaylist = { name: string; id: string }
type TempTrack = { track: { uri: string } }

const PLAYLIST_NAME = 'Vue True Shuffle Playlist'

const allPlaylists = ref<TempPlaylist[]>([])
const initialLoading = ref(true)

const chosenPlaylist = ref()
const isShuffling = ref(false)

const playlistId = ref<string | null>(null)

const status = ref<{ text: string; type: StatusTypes } | null>()

const {} = useAuthStore()

const updateStatus = (text: string, type: StatusTypes = StatusTypes.INFO) => {
  status.value = { text, type }
}

onMounted(async () => {
  const allPlst = await fetchNextRecursively<TempPlaylist>(`/me/playlists?offset=0&limit=50`)
  initialLoading.value = false
  if (!allPlst || !allPlst.length) {
    return
  }
  allPlaylists.value = allPlst
})

const onShuffle = async () => {
  try {
    if (!chosenPlaylist.value) return
    isShuffling.value = true

    updateStatus('Fetching playlist tracks...')
    const tracks = await fetchNextRecursively<TempTrack>(
      `/playlists/${chosenPlaylist.value.id}/tracks`,
    )

    if (tracks?.length === 0) {
      throw new Error('There are no tracks in this playlist.')
    }
    if (!tracks || tracks === undefined) {
      throw new Error('Error while fetching tracks.')
    }

    updateStatus('Shuffling tracks...')
    const shuffledTracks = shuffleHundred(tracks)

    updateStatus('Getting user info...')
    const resMe = await spotifyApi.get('/me')
    if (!resMe.data) {
      throw new Error('Error while fetching user data')
    }
    const userId = resMe.data.id

    if (!allPlaylists) {
      throw new Error('Playlists are missing')
    }

    updateStatus('Preparing the playlist...')
    const existingPlaylist = allPlaylists.value.find((pl) => pl.name === PLAYLIST_NAME)

    if (existingPlaylist) {
      playlistId.value = existingPlaylist.id
    } else if (playlistId.value) {
      // Playlist is just created
    } else {
      const newPlaylist = await spotifyApi.post(`/users/${userId}/playlists`, {
        name: PLAYLIST_NAME,
        public: false,
        description: 'True Shuffle playlist created by the Vue Spotify Client.',
      })
      playlistId.value = newPlaylist.data.id
    }

    updateStatus('Adding shuffled tracks to playlist...')
    const uris = shuffledTracks.map((tr) => tr.track.uri)

    const result = await spotifyApi.put(`/playlists/${playlistId.value}/tracks`, {
      uris,
      position: 0,
    })

    if (result.status === 200) {
      updateStatus(
        `Success!\nYou can find shuffled tracks on a playlist called "${PLAYLIST_NAME}" on your library.`,
        StatusTypes.SUC,
      )
    }
  } catch (error) {
    if (error instanceof Error) {
      updateStatus(error.message, StatusTypes.ERR)
    } else {
      updateStatus('Unexpected error.', StatusTypes.ERR)
    }
    console.error(error)
  } finally {
    isShuffling.value = false
  }
}
</script>

<template>
  <FullPageLoading v-if="initialLoading" />
  <div v-else>
    <div class="mb-5">
      <h1 class="font-semibold text-xl flex items-center gap-2 mb-1">
        <ShuffleIcon :size="24" /> Shuffle
      </h1>
      <p class="opacity-70 mt-2">
        Shuffle function create a temporary playlist named <b>"{{ PLAYLIST_NAME }}"</b> that consist
        of truly shuffled songs from any playlist you choose.
      </p>
    </div>
    <div class="flex gap-3">
      <Select
        size="medium"
        v-model="chosenPlaylist"
        :options="allPlaylists"
        optionLabel="name"
        placeholder="Select a Playlist"
        class="w-full h-fit"
        :disabled="isShuffling"
      />
    </div>
    <Button
      class="flex items-center gap-2 font-semibold w-full mt-5"
      @click="onShuffle"
      :disabled="!chosenPlaylist || isShuffling"
    >
      <ShuffleIcon :size="20" :strokeWidth="3" />
      {{ isShuffling ? 'Shuffling...' : 'Start Shuffling' }}
    </Button>
    <p
      :class="
        classNames(
          'mt-4 text-center',
          status?.type === StatusTypes.INFO && 'opacity-70',
          status?.type === StatusTypes.ERR && 'text-red-500',
          status?.type === StatusTypes.SUC && 'text-green-300',
        )
      "
      v-if="status !== null"
    >
      {{ status?.text }}
    </p>
  </div>
</template>
