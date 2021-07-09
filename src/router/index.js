import Vue from 'vue';
import VueRouter from 'vue-router';
import store from '@/store';
import { Toast } from 'vant';
Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    component: () => import('@/views/layout/'),
    children: [
      {
        path: '',
        name: 'home',
        component: () => import('@/views/home/'),
      },
      {
        path: '/shop',
        name: 'shop',
        component: () => import('@/views/shop/'),
      },
      {
        path: '/category',
        name: 'category',
        component: () => import('@/views/category/'),
      },
      {
        path: '/cart',
        name: 'cart',
        component: () => import('@/views/cart/'),
      },
      {
        path: '/my',
        name: 'my',
        component: () => import('@/views/my/'),
      },
    ],
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/login/'),
  },
  {
    path: '/search',
    name: 'search',
    component: () => import('@/views/search'),
  },
  {
    path: '/detailed',
    name: 'detailed',
    component: () => import('@/views/detailed'),
  },
  {
    path: '/user/info',
    name: 'UserInfo',
    component: () => import('@/views/user'),
  },
  {
    path: '/user/fans',
    name: 'UserFans',
    component: () => import('@/views/user/fans'),
  },
  {
    path: '/goods/detailed',
    name: 'GoodsDetailed',
    component: () => import('@/views/shop/detailed'),
  },
];

const router = new VueRouter({
  mode: 'hash',
  base: process.env.BASE_URL,
  routes,
});

export default router;
router.beforeEach(function (to, from, next) {
  if (to.fullPath == '/vidoe') {
    if (!store.state.login.token) {
      Toast.fail('请先登录');
    }
  } else {
    next();
  }
});
