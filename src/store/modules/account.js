import { Register, GetCode, Login } from '@/api/account';
import {
  setToken,
  getToken,
  removeToken,
  setUserName,
  getUserName,
  removeUserName,
} from '@/utils/cookiesUser';
const state = {
  token: '' || getToken(),
  username: '' || getUserName(),
};
const mutations = {
  SET_TOKEN(state, value) {
    state.token = value;
  },
  SET_USERNAME(state, value) {
    state.username = value;
  },
};
const actions = {
  //登录
  login(context, value) {
    return new Promise((resolve, reject) => {
      Login(value)
        .then((res) => {
          const data = res.data;
          context.commit('SET_TOKEN', data.token);
          context.commit('SET_USERNAME', data.username);
          setToken(data.token);
          setUserName(data.username);
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
  //注册
  register(context, value) {
    return new Promise((resolve, reject) => {
      Register(value)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => {
          reject(res);
        });
    });
  },
  //验证码
  getcode(context, value) {
    return new Promise((resolve, reject) => {
      GetCode(value)
        .then((res) => {
          resolve(res);
        })
        .catch((error) => reject(error));
    });
  },
};
export default {
  namespaced: true,
  state,
  mutations,
  actions,
};
