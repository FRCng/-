import Vue from 'vue';
import App from './App.vue';
import router from './router';
import store from './store';
import './plugin/aMap.js';
// 全局路由守卫
import './router/pre';
//elem-ui
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './components/back/index';
Vue.config.productionTip = false;
Vue.use(ElementUI);
new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
