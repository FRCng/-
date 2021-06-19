import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import login from './modules/login';
import cart from './modules/cart';
export default new Vuex.Store({
  modules: {
    login,
    cart,
  },
});
