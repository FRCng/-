import service from '@/utils/request';

// 获取验证码
export function GetCode(mobile) {
  return service.request({
    method: 'GET',
    url: `/app/v1_0/sms/codes/${mobile}`,
  });
}
//登录、注册
export function Login(data) {
  return service.request({
    method: 'post',
    url: '/app/v1_0/authorizations',
    data,
  });
}

//用户信息
export function GetUserInfo() {
  return service.request({
    method: 'get',
    url: '/app/v1_0/user',
  });
}
