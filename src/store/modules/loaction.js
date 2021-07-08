const state = {
  loactionInfo: true,
  SelfCenter: JSON.parse(localStorage.getItem('loaction')) || [],
};
const mutations = {
  SET_LOACTION(state) {
    state.loactionInfo = !state.loactionInfo;
  },
  SET_CENTER(state, value) {
    localStorage.setItem('loaction', JSON.stringify(value));
    state.SelfCenter = value;
  },
};

export default {
  namespaced: true,
  state,
  mutations,
};
