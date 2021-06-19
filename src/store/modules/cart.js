import { Toast } from 'vant';
const state = {
  cart: JSON.parse(localStorage.getItem('goods_item')) || [],
};
const mutations = {
  ADD_NUMBER(state, value) {
    value.num++;
  },
  ADD_CART(state, value) {
    state.cart.push(value);
    localStorage.setItem('goods_item', JSON.stringify(state.cart));
  },
};
const actions = {
  buy_goods({ commit, state }, data) {
    console.log(data);
    if (data) {
      let result = state.cart.find((item) => item.iid == data.iid);
      if (result) {
        Toast.success('数量加1');
        commit('ADD_NUMBER', result);
      } else {
        Toast.success('已添加到购物车');
        commit('ADD_CART', data);
      }
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
