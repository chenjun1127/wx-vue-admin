import { createRouter, createWebHistory } from 'vue-router';
import Index from '../views/index.vue';
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/login',
      name: 'login',
      component: () => import('../views/login.vue')
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

export default router;
