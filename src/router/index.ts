import Callback from '@/pages/callback/Callback.vue'
import Home from '@/pages/home/Home.vue'
import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    { path: '/', component: Home },
    { path: '/callback', component: Callback },
  ],
})

export default router
