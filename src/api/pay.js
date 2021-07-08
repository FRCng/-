import service from '@/utils/request';

// 金额列表
export function GetRecharge(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/amount/`,
    data,
  });
}
//充值
export function PayMoney(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/pay/`,
    data,
  });
}
//查询订单状态
export function OrderStatus(data = {}) {
  return service.request({
    method: 'post',
    url: `${process.env.VUE_APP_API_WEB}/orderStatus/`,
    data,
  });
}
