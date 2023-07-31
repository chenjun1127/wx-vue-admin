import Index from '../views/Index.vue';
const routes = [
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
      // {
      //   path: '/user-manage',
      //   name: 'userManage',
      //   component: () => import('../views/manage/user.vue')
      // },
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
];

const dynamicRoutes = [
  {
    path: '/user-manage',
    name: 'userManage',
    component: () => import('../views/manage/user.vue')
  }
];
