<script setup lang="ts">
import BasicLinkCard from '@/shared/ui/BasicLinkCard.vue'

interface PlaylistCardProps {
  pl: {
    id: string
    name: string
    images: { url: string }[]
  }
}

defineProps<PlaylistCardProps>()
</script>

<template>
  <BasicLinkCard
    :to="`/playlist/${pl.id}`"
    :src="pl.images[1] ? pl.images[1].url : pl.images[0]?.url"
    :primaryText="pl.name"
  />
</template>
