<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { Disc, PlayCircle, SearchIcon, ShuffleIcon, User } from 'lucide-vue-next'
import Albums from '@/pages/library/Albums.vue'
import Playlists from '@/pages/library/Playlists.vue'
import Artists from '@/pages/library/Artists.vue'
import Search from '@/pages/search/Search.vue'
import Shuffle from '@/pages/shuffle/Shuffle.vue'
import { ref, watch } from 'vue'
import { useRoute, useRouter } from 'vue-router'

const route = useRoute()
const router = useRouter()

const tab = ref<string>((route.query.tab as string) ?? '0')

watch(
  tab,
  (newTab) => {
    router.replace({ query: { ...route.query, tab: newTab } })
  },
  { immediate: true },
)
</script>

<template>
  <Tabs v-model:value="tab">
    <TabList class="w-full sticky top-0 z-99">
      <Tab value="0" class="flex items-center gap-1.5"> <Disc :size="20" /> Albums</Tab>
      <Tab value="1" class="flex items-center gap-1.5"> <PlayCircle :size="20" /> Playlists</Tab>
      <Tab value="2" class="flex items-center gap-1.5"> <User :size="20" /> Artists</Tab>
      <Tab value="3" class="flex items-center gap-1.5"> <SearchIcon :size="20" /> Search</Tab>
      <Tab value="4" class="flex items-center gap-1.5"> <ShuffleIcon :size="20" /> Shuffle</Tab>
    </TabList>
    <TabPanels>
      <TabPanel value="0">
        <Albums />
      </TabPanel>
      <TabPanel value="1">
        <Playlists />
      </TabPanel>
      <TabPanel value="2">
        <Artists />
      </TabPanel>
      <TabPanel value="3">
        <Search />
      </TabPanel>
      <TabPanel value="4">
        <Shuffle />
      </TabPanel>
    </TabPanels>
  </Tabs>
</template>
