<script setup lang="ts">
import BasicLinkCard from '@/shared/ui/BasicLinkCard.vue'
import { computed } from 'vue'

interface PlaylistCardProps {
  pl: {
    id: string
    name: string
    images: { url: string }[] | null
  }
}

const { pl } = defineProps<PlaylistCardProps>()

const src = computed(() => {
  if (!pl || !pl.images || pl.images.length === 0) {
    return ''
  }
  return pl?.images[1] ? pl?.images[1]?.url : pl?.images[0]?.url
})
</script>

<template>
  <BasicLinkCard :to="`/playlist/${pl?.id}`" :src :primaryText="pl?.name" />
</template>
