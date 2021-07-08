const state = {
  //是否点击了汽车列表
  isClickCarsList: true,
  //是否请求了停车场列表
  isRequestCras: false,
  //車輛信息
  isCarsInfo:true
};
const mutations = {
  SET_CARS_LIST_STATE(state, value) {
    state.isClickCarsList = value;
  },
  SET_CARS_REQUEST_STATE(state, value) {
    state.isRequestCras = value;
  },
  SET_CARS_INFO(state, value) {
    state.isCarsInfo = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
