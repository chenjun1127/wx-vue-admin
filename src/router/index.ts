import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';
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
      name: 'home',
      component: Home,
      redirect: '/index',
      children: [
        {
          path: '/index',
          name: 'index',
          component: () => import('../views/Index.vue')
        }
      ]
    }
  ]
});

export default router;
