<script setup lang="ts">
import { useInfiniteScroll } from '@/composables/useInfiniteScroll'
import BasicLinkCard from '@/shared/ui/BasicLinkCard.vue'
import FullPageLoading from '@/shared/ui/FullPageLoading.vue'
import LoadMoreButton from '@/shared/ui/LoadMoreButton.vue'

const PAGE_LIMIT = 30

const { data, initialLoading, pageLoading, fetchNextPage, nextExists } = useInfiniteScroll(
  `/me/following?type=artist&offset=0&limit=${PAGE_LIMIT}`,
  true,
)
</script>

<template>
  <div>
    <div class="flex flex-wrap gap-4 justify-center">
      <FullPageLoading v-if="initialLoading" />
      <BasicLinkCard
        v-else
        v-for="(artist, key) in data"
        :key
        :to="`/artist/${artist.id}`"
        :src="artist.images[1]?.url"
        :primaryText="artist.name"
      />
    </div>
    <LoadMoreButton :initialLoading :pageLoading :nextExists :fetchNextPage />
  </div>
</template>
