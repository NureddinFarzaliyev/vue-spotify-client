import Album from '@/pages/album/Album.vue'
import Artist from '@/pages/artist/Artist.vue'
import Callback from '@/pages/callback/Callback.vue'
import Home from '@/pages/home/Home.vue'
import Playlist from '@/pages/playlist/Playlist.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/callback', component: Callback },
    { path: '/album/:id', component: Album },
    { path: '/playlist/:id', component: Playlist },
    { path: '/artist/:id', component: Artist },
  ],
})

export default router
