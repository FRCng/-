import Router from './index';
import store from '../store/index';
import { Dialog } from 'vant';
Router.beforeEach((to, from, next) => {
  let data = store.getters['login/user_token']
  if (to.name == 'cart') {
    if (!data) {
      Dialog.alert({
        title: '当前用户未登录，是否登录？'
      }).then(() => {
        Router.push("/login")
        next()
      });
    } else {
      next()
    }
  } else {
    next()
  }
})
