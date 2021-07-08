import service from '@/utils/request';

export function GetCarsList(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/cars/`,
    data,
  });
}
export function GetLease(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/lease/`,
    data,
  });
}
//预约用车
export function ConfirmCars(data= {}){
  return service.request({
    method:"post",
    url: `${process.env.VUE_APP_API_WEB}/confirmCars/`,
    data
  })
}