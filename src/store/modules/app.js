const state = {
  //全局路由名称
  isPreTitle: '',
};
const mutations = {
  SET_TITLE(state, value) {
    state.isPreTitle = value;
  },
};
const actions = {};
const modules = {};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
  modules,
};
