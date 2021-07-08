import Vue from 'vue';
import VueRouter from 'vue-router';
import Home from '../views/Index/index.vue';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'Index',
    component: Home,
    children: [
      {
        path: '/login',
        name: 'Login',
        meta: {
          title: '登录',
        },
        component: () => import('../views/account/login'),
      },
      {
        path: '/register',
        name: 'Register',
        meta: {
          title: '注册',
        },
        component: () => import('../views/account/register'),
      },
      {
        path: '/user',
        name: 'User',
        meta: {
          title: '用户',
        },
        component: () => import('../views/user/index'),
      },
      {
        path: '/safe',
        name: 'Safe',
        meta: {
          title: '安全设置',
        },
        component: () => import('../views/safe/index'),
      },
      {
        path: '/password',
        name: 'Password',
        meta: {
          title: '修改密码',
        },
        component: () => import('../views/safe/password.vue'),
      },
      {
        path: '/recharge',
        name: 'Recharge',
        meta: {
          title: '充值金額',
        },
        component: () => import('../views/safe/recharge.vue'),
      },
      {
        path: '/status',
        name: 'Status',
        meta: {
          title: '订单状态',
        },
        component: () => import('../views/pay/status.vue'),
      },
      {
        path: '/result',
        name: 'Result',
        meta: {
          title: '充值结果',
        },
        component: () => import('../views/pay/result.vue'),
      },
    ],
  },
];

const router = new VueRouter({
  mode: 'history',
  base: process.env.BASE_URL,
  routes,
});

export default router;
