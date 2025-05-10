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
    },
    {
      path: '/:pathMatch(.*)*',
      name: 'NotFound',
      component: () => import('../pages/NotFound.vue') // 导入404页面组件
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

/**
 * 全局前置守卫
 * 处理初始URL路径，确保在Hash模式下，当URL的hash前缀不是根路径时能正确显示404页面
 * @param {Object} to - 目标路由对象
 * @param {Object} from - 当前导航正要离开的路由对象
 * @param {Function} next - 一定要调用该方法来 resolve 这个钩子
 */
router.beforeEach((to, from, next) => {
  // 检查是否是初始加载（from.name 为 undefined 通常表示初始加载）
  // 并且当前URL的pathname不是BASE_URL，同时目标路径是根路径 (通常是首页)
  if (from.name === undefined && window.location.pathname !== import.meta.env.BASE_URL && to.path === '/') {
    // 将 window.location.pathname (hash之前的部分) 作为新的导航路径
    // 这允许 /:pathMatch(.*)* 规则捕获它并显示404页面
    const intendedPath = window.location.pathname.replace(import.meta.env.BASE_URL, '/');
    // 确保intendedPath不为空且不只是'/'，避免无限重定向或错误导航到首页
    if (intendedPath && intendedPath !== '/') {
      next(intendedPath);
    } else {
      next(); // 正常导航
    }
  } else {
    next(); // 正常导航
  }
});

export default router