import service from '@/utils/request';
//正在使用的车辆
export function CarsActivation(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsActivation/`,
    data,
  });
}

// 取车
export function GetCars(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsGet/`,
    data,
  });
}
// 还车
export function ReturnCars(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsReturnS/`,
    data,
  });
}
// 取消
export function CancelCars(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/carsCancel/`,
    data,
  });
}
