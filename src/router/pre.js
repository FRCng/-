import router from './index';
import store from '../store';

//路由守卫
router.beforeEach((to, form, next) => {
  if (to.meta && to.meta.title) {
    const routerName = to.meta.title;
    document.title = routerName;
    store.commit('app/SET_TITLE', routerName);
  }
  next();
});
