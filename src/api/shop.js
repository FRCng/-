import service from '@/utils/request';
//首页
export function GetMultidata() {
  return service.request({
    method: 'get',
    url: `${process.env.VUE_APP_SHOP}/home/multidata`,
  });
}
//商品列表
export function GetGoods(params) {
  return service.request({
    method: 'get',
    url: `${process.env.VUE_APP_SHOP}/home/data`,
    params,
  });
}
//商品详情
export function GoodsDetailed(iid) {
  return service.request({
    url: `${process.env.VUE_APP_SHOP}/detail`,
    params: {
      iid,
    },
  });
}
