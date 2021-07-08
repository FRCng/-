import service from '@/utils/request';

export function Register(data = {}) {
  return service.request({
    url: `${process.env.VUE_APP_API_WEB}/account/register/`,
    method: 'post',
    data,
  });
}
export function GetCode(data = {}) {
  return service.request({
    url: `${process.env.VUE_APP_API_WEB}/account/code/`,
    method: 'post',
    data,
  });
}
export function Login(data = {}) {
  return service.request({
    url: `${process.env.VUE_APP_API_WEB}/account/login/`,
    method: 'post',
    data,
  });
}
