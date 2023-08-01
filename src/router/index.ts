import storage from '@/utils/storage/instance';
import NProgress from 'nprogress';
import 'nprogress/nprogress.css';
import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';
import { routes } from './routes';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes
});
router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: any) => {
  const userInfo = storage.get('userInfo');
  NProgress.start();
  if (to.path === '/login') {
    // 如果目标路由是登录页，无需验证token，直接通过
    next();
  } else if (userInfo) {
    // 如果有token，允许通过
    next();
  } else {
    // 没有token时，重定向到登录页
    next('/login');
  }
});

router.afterEach(_to => {
  NProgress.done();
});
export default router;
