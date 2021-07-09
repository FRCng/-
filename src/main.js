import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
//vant
import Vant from 'vant';
import 'vant/lib/index.css';
import 'vant/lib/icon/local.css';
//dayjs
import '@/utils/day.js';
//路由守卫
import "./router/permission";

//全局注册vant
Vue.use(Vant);
import { Lazyload } from 'vant';
Vue.use(Lazyload);
//lib-flexible
import 'lib-flexible';
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
