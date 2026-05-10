import { createRouter, createWebHashHistory } from 'vue-router'
import TocPage from '@/views/TocPage.vue'
import PdfViewerPage from '@/views/PdfViewerPage.vue'

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
      component: PdfViewerPage,
    },
  ],
})

export default router
