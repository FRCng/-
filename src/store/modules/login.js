const state = {
  token: JSON.parse(localStorage.getItem('user_token')) || null,
  CachePage: ['Layout'],
};
const getters = {
  user_token: (state) => state.token
}
const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
    if (value == null) {
      localStorage.removeItem('user_token');
    } else {
      localStorage.setItem('user_token', JSON.stringify(value));
    }
  },
  //设置缓存页面
  SET_CACHE_PAGE(state, value) {
    if (!state.CachePage.includes(value)) {
      console.log('设置缓存页面:' + value);
      state.CachePage.push(value);
    }
  },
  CLEAR_CACHE_PAGE(state, value) {
    const index = state.CachePage.indexOf(value);
    if (index !== -1) {
      console.log('删除缓存页面:' + value);
      state.CachePage.splice(index, 1);
    }
  },
};
export default {
  namespaced: true,
  state,
  mutations, getters
};
