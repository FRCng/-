import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

import app from './modules/app';
import loaction from './modules/loaction';
import carsInfo from './modules/carsInfo';
import account from './modules/account';
export default new Vuex.Store({
  modules: {
    app,
    loaction,
    carsInfo,
    account,
  },
});
