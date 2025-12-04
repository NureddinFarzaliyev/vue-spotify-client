<script setup lang="ts">
import Tabs from 'primevue/tabs'
import TabList from 'primevue/tablist'
import Tab from 'primevue/tab'
import TabPanels from 'primevue/tabpanels'
import TabPanel from 'primevue/tabpanel'
import { Disc, PlayCircle, User } from 'lucide-vue-next'
import Albums from '@/pages/library/Albums.vue'
import Playlists from '@/pages/library/Playlists.vue'
import Artists from '@/pages/library/Artists.vue'
</script>

<template>
  <Tabs value="0">
    <TabList class="w-full sticky top-0 z-99">
      <Tab value="0" class="flex items-center gap-1.5"> <Disc :size="20" /> Albums</Tab>
      <Tab value="1" class="flex items-center gap-1.5"> <PlayCircle :size="20" /> Playlists</Tab>
      <Tab value="2" class="flex items-center gap-1.5"> <User :size="20" /> Artists</Tab>
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
    </TabPanels>
  </Tabs>
</template>
