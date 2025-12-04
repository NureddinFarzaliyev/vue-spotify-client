<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import { useAuthStore } from '@/stores/auth'
import { Button } from 'primevue'
import { onMounted, ref } from 'vue'

const me = ref()
const loading = ref(true)
const auth = useAuthStore()

onMounted(async () => {
  const res = await spotifyApi.get('/me')
  me.value = res.data
  loading.value = false
})
</script>

<template>
  <div class="p-5 border rounded-md block overflow-hidden">
    <div v-if="loading" class="w-full">Loading...</div>
    <div v-else class="flex gap-4">
      <img
        class="h-20 w-20 rounded-full shadow-md shadow-black/40"
        :src="me.images[0].url"
        :alt="`${me.display_name}'s profile picture`"
      />
      <div>
        <a :href="me ? me.external_urls.spotify : '#'" target="_blank">
          <p class="font-semibold text-lg hover:underline hover:text-spotify">
            {{ me.display_name }}
          </p>
        </a>
        <p class="text-sm opacity-70">{{ me.followers.total }} Followers</p>

        <Button
          size="small"
          class="text-xs mt-2"
          variant="outlined"
          severity="danger"
          @click="auth.logout()"
          >Log out</Button
        >
      </div>
    </div>
  </div>
</template>
