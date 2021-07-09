import service from '@/utils/request1';
//首页
export function GetMultidata() {
  return service.request({
    method: 'get',
    url: `/home/multidata`,
  });
}
//商品列表
export function GetGoods(params) {
  return service.request({
    method: 'get',
    url: `/home/data`,
    params,
  });
}
//商品详情
export function GoodsDetailed(iid) {
  return service.request({
    url: `/detail`,
    params: {
      iid,
    },
  });
}
