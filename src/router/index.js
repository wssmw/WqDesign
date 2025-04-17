import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'Overview',
    component: () => import('../view/Overview.vue')
  },
  {
    path: '/components/button',
    name: 'Button',
    component: () => import('../view/components/Button.vue')
  },
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router 