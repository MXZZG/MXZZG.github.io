/**
 * Vue Router配置
 * 定义应用的路由规则
 */
import { createRouter, createWebHistory } from 'vue-router'

// 路由配置
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: () => import('../pages/Home.vue')
    }
  ],
  // 启用锚点滚动行为
  scrollBehavior(to) {
    if (to.hash) {
      return {
        el: to.hash,
        behavior: 'smooth'
      }
    }
    return { top: 0 }
  }
})

export default router