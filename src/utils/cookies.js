import Cookies from 'js-cookie';
// 变量
const tokenKey = 'tokenAdmin';
const userNameKey = 'username';
// 获取token
export function getToken() {
  return Cookies.get(tokenKey);
}
// 写入token
export function setToken(value) {
  Cookies.set(tokenKey, value, { expires: 7 });
}
// 删除token
export function removeToken() {
  return Cookies.remove(tokenKey);
}
// 写入userName
export function setUsername(value) {
  Cookies.set(userNameKey, value, { expires: 7 });
}
// 获取userName
export function getUsername() {
  return Cookies.get(userNameKey);
}
// 删除userName
export function removeUsername() {
  return Cookies.remove(userNameKey);
}

//用户
const accountToken = 'accountToken';
const accountUsername = 'accountUsername';
// 获取Token
export function getAccountToken() {
  return Cookies.get(accountToken);
}
