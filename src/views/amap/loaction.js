import store from '@/store';
let geolocation = null;
export function SelfLoaction(params) {
  if (!geolocation) {
    geolocation = new AMap.Geolocation({
      enableHighAccuracy: true, //是否使用高精度定位，默认:true
      timeout: 10000, //超过10秒后停止定位，默认：5s
      showButton: false,
      zoomToAccuracy: true, //定位成功后是否自动调整地图视野到定位点
    });
  }
  params.map.addControl(geolocation);
  geolocation.getCityInfo((status, result) => {
    if (result.info == 'SUCCESS') {
      store.commit('loaction/SET_CENTER', result.center);
    } else {
    }
  });
}
