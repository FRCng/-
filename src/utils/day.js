import dayjs from 'dayjs'; // ES 2015
import Vue from 'vue';
import 'dayjs/locale/zh-cn'; // ES 2015
import relativeTime from 'dayjs/plugin/relativeTime';
dayjs.extend(relativeTime);
// 配置使用中文语言包
dayjs.locale('zh-cn');
// 全局过滤器：处理相对时间
Vue.filter('relativeTime', (value) => {
  return dayjs().from(dayjs(value));
});
Vue.filter('formatDay', (value) => {
  return dayjs(value).format('YYYY-MM-DD');
});
