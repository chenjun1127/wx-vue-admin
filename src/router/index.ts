import storage from '@/utils/storage/instance';
import { RouteLocationNormalized, createRouter, createWebHistory } from 'vue-router';
import Index from '../views/Index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/Login.vue')
    },
    {
      path: '/',
      name: 'index',
      component: Index,
      redirect: '/home',
      children: [
        {
          path: '/home',
          name: 'home',
          component: () => import('../views/home/index.vue')
        },
        {
          path: '/manage',
          name: 'manage',
          component: () => import('../views/manage/index.vue')
        },
        {
          path: '/user-manage',
          name: 'userManage',
          component: () => import('../views/manage/user.vue')
        },
        {
          path: '/normal',
          name: 'normal',
          component: () => import('../views/normal/index.vue')
        },
        {
          path: '/order',
          name: 'order',
          component: () => import('../views/order/index.vue')
        },
        {
          path: '/check',
          name: 'check',
          component: () => import('../views/check/index.vue')
        },
        {
          path: '/recharge',
          name: 'recharge',
          component: () => import('../views/recharge/index.vue')
        },
        {
          path: '/change',
          name: 'change',
          component: () => import('../views/change/index.vue')
        }
      ]
    }
  ]
});
router.beforeEach(async (to: RouteLocationNormalized, _from: RouteLocationNormalized, next: any) => {
  const token: string = storage.get('token');
  console.log(token);

  if (to.path === '/login') {
    // 如果目标路由是登录页，无需验证token，直接通过
    next();
  } else if (token) {
    // 如果有token，允许通过
    next();
  } else {
    // 没有token时，重定向到登录页
    next('/login');
  }
});
export default router;
