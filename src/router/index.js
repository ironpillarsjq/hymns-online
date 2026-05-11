import { createRouter, createWebHashHistory } from 'vue-router'
import HomePage from '@/views/HomePage.vue'
import TocPage from '@/views/TocPage.vue'
import ViewerPage from '@/views/ViewerPage.vue'
import HelpPage from '@/views/HelpPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomePage,
    },
    {
      path: '/site/:siteName',
      name: 'site',
      component: TocPage,
    },
    {
      path: '/help',
      name: 'help',
      component: HelpPage,
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: ViewerPage,
    },
  ],
})

export default router
