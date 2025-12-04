<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import { displayArtists } from '@/shared/utils/displayArtists'
import { msToTime } from '@/shared/utils/msToTime'
import { computed } from '@vue/reactivity'
import { Play, Repeat, Shuffle, Smartphone } from 'lucide-vue-next'
import { onMounted, onUnmounted, ref } from 'vue'

const initialLoading = ref(true)
const loading = ref(false)
const player = ref()

const progress = ref(0)
const duration = ref(1)
const playing = ref(true)

const fetchPlayerState = async () => {
  if (loading.value) return

  loading.value = true
  const response = await spotifyApi.get('/me/player')
  initialLoading.value = false
  loading.value = false
  player.value = response.data

  progress.value = response.data?.progress_ms
  duration.value = response.data?.item?.duration_ms
  playing.value = response.data?.is_playing
}

const handleVisibility = async () => {
  if (document.visibilityState === 'visible') {
    await fetchPlayerState()
  }
}

let intervalId: ReturnType<typeof setInterval>
let frameId: ReturnType<typeof requestAnimationFrame>
let lastTime: number = 0

const tick = (now: number) => {
  if (!lastTime) {
    lastTime = now
  }

  const delta = now - lastTime
  lastTime = now

  if (progress.value < duration.value) {
    if (playing.value) {
      progress.value += delta
    }
  } else {
    fetchPlayerState()
  }

  frameId = requestAnimationFrame(tick)
}

onMounted(async () => {
  await fetchPlayerState()
  document.addEventListener('visibilitychange', handleVisibility)
  intervalId = setInterval(fetchPlayerState, 5000)
  tick(0)
})

onUnmounted(() => {
  document.removeEventListener('visibilitychange', handleVisibility)
  cancelAnimationFrame(frameId)
  clearInterval(intervalId)
})

const progressPercentage = computed(() => (progress.value / duration.value) * 100)
</script>

<template>
  <div v-if="!initialLoading" class="pointer-events-none user-select-none">
    <div class="relative rounded-xl overflow-hidden">
      <img
        class="shadow-black/50 shadow-xl w-full"
        :src="player?.item?.album?.images[0]?.url"
        :alt="player?.item?.album?.name"
      />
      <div
        v-if="!player?.is_playing"
        class="bg-black/80 absolute h-full w-full top-0 left-0 flex items-center justify-center transition-all"
      >
        <Play :size="64" />
      </div>
    </div>
    <p class="mt-5 text-2xl font-bold">{{ player?.item?.name }}</p>
    <p class="font-semibold opacity-60">
      {{ displayArtists(player?.item?.artists || []) }}
    </p>

    <div class="mt-5">
      <div class="flex items-center justify-between text-sm opacity-80">
        <span>{{ msToTime(progress) }}</span>
        <span>{{ msToTime(duration) }}</span>
      </div>
      <div class="h-1 w-full rounded-full overflow-hidden mt-1 bg-spotify/10">
        <div class="h-1 bg-spotify rounded-full" :style="`width: ${progressPercentage}%`" />
      </div>
    </div>
    <div class="flex justify-between gap-2 mt-3">
      <p :class="player?.shuffle_state ? 'text-spotify' : ''">
        <Shuffle :size="20" />
      </p>
      <p :class="player?.repeat_state ? 'text-spotify' : ''">
        <Repeat :size="20" />
      </p>
    </div>

    <p
      class="rounded-md p-2 border border-white flex items-center gap-3 mt-5 pointer-events-none opacity-80"
    >
      <Smartphone />
      {{ player?.device.name }}
      {{ player?.device?.volume_percent }}
    </p>
  </div>
</template>
