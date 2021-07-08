import Vue from 'vue';
// 高德离线地图
import VueAMap from 'vue-amap';
Vue.use(VueAMap);

VueAMap.initAMapApiLoader({
  // 高德key
  key: 'dfc121e502ffda6b9a7e4f68783e1735', // 自己到官网申请，我随便写的
  // 插件集合 （插件按需引入）
  plugin: ['AMap.Geolocation', 'AMap.Walking'],
  v: '1.4.15',
  uiVersion: '1.0.11', // ui版本号，也是需要写
});
