<script setup lang="ts">
import BasicLinkCard from '@/shared/ui/BasicLinkCard.vue'
import { displayArtists } from '@/shared/utils/displayArtists'

interface AlbumCardProps {
  album: {
    id: string
    name: string
    artists: { name: string }[]
    images: { url: string }[]
  }
}

defineProps<AlbumCardProps>()
</script>

<template>
  <BasicLinkCard
    :to="`/album/${album.id}`"
    :src="album.images[1]?.url"
    :secondaryText="displayArtists(album.artists)"
    :primaryText="album.name"
  />
</template>
