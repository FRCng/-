import axios from 'axios';
import store from '@/store';
import jsonBig from 'json-bigint';
import { Toast } from 'vant';
import router from '@/router';

const refresh_token_req = axios.create({
  baseURL: '',
});
const service = axios.create({
  baseURL: '',
  timeout: 50000,
  transformResponse: [
    function (data) {
      try {
        // 如果转换成功则返回转换的数据结果
        return jsonBig.parse(data);
      } catch (err) {
        // 如果转换失败，则包装为统一数据格式并返回
        return {
          data,
        };
      }
    },
  ],
});
// 添加请求拦截器
service.interceptors.request.use(
  function (config) {
    // 在发送请求之前做些什么
    let Usertoken = store.state.login.token;
    if (Usertoken !== null) {
      config.headers.Authorization = `Bearer ${Usertoken.token}`;
    }
    return config;
  },
  function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加响应拦截器
service.interceptors.response.use(
  function (response) {
    // 对响应数据做点什么
    return response;
  },
  async function (error) {
    const status = error.response.status;
    const user = store.state.login.token;

    if (!store.state.login.token || !store.state.login.token.token) {
      return RedirectLogin();
    }
    if (status == 400) {
      Toast.fail('请求参数有误');
    } else if (status == 401) {
      try {
        const { data } = await refresh_token_req({
          method: 'put',
          url: 'http://ttapi.research.itcast.cn/app/v1_0/authorizations',
          headers: {
            Authorization: `Bearer ${user.refresh_token}`,
          },
        });
        user.token = data.data.token;
      } catch (err) {
        console.log('失败');
      }
      Toast.fail('token失效');
    } else if (status == 403) {
      Toast.fail('refresh_token 未携带或已过期');
    } else if (status >= 500) {
      Toast.fail('服务器出错');
    }
    // 对响应错误做点什么
    return Promise.reject(error);
  }
);
function RedirectLogin() {
  router.replace({
    name: 'Login',
    query: {
      redirect: router.fullPath,
    },
  });
}
export default service;
