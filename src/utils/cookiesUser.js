import Cookies from 'js-cookie';

const tokenkey = 'carsAccountToken';
const usernamekey = 'carsAccountUsername';

//token
export function setToken(value) {
  Cookies.set(tokenkey, value, { expires: 7 });
}
export function getToken() {
  return Cookies.get(tokenkey);
}
export function getTokenAdmin() {
  return Cookies.get(tokenkey);
}
export function removeToken() {
  return Cookies.remove(tokenkey);
}
//username
export function setUserName(value) {
  Cookies.set(usernamekey, value, { expires: 7 });
}
export function getUserName() {
  return Cookies.get(usernamekey);
}
export function removeUserName() {
  return Cookies.remove(usernamekey);
}
