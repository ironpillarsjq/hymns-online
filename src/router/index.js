import { createRouter, createWebHashHistory } from 'vue-router'
import TocPage from '@/views/TocPage.vue'
import ViewerPage from '@/views/ViewerPage.vue'

const router = createRouter({
  history: createWebHashHistory(),
  routes: [
    {
      path: '/',
      name: 'toc',
      component: TocPage,
    },
    {
      path: '/viewer',
      name: 'viewer',
      component: ViewerPage,
    },
  ],
})

export default router
