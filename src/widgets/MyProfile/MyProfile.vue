<script setup lang="ts">
import { spotifyApi } from '@/api/spotify'
import { useAuthStore } from '@/stores/auth'
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
  <div>
    <h3>My Profile</h3>
    <div v-if="loading">Loading...</div>
    <div v-else>
      <img :src="me.images[0].url" :alt="`${me.display_name}'s profile picture`" />
      <p>{{ me.display_name }}</p>
      <p>{{ me.followers.total }} Followers</p>
      <a :href="me.external_urls.spotify" target="_blank">spotify</a>
      <button @click="auth.logout()">Log out</button>
    </div>
  </div>
</template>
