<template>
  <div id="shop" ref="shop">
    <van-nav-bar title="美丽说" />
    <!-- 轮播图 -->
    <van-swipe class="my-swipe" :autoplay="3000" indicator-color="white">
      <van-swipe-item v-for="(item, index) in banner" :key="index">
        <van-image :src="item.image" :title="item.title" />
      </van-swipe-item>
    </van-swipe>
    <!-- 推荐列表 -->
    <van-row class="recommend" :gutter="10">
      <van-col span="6" v-for="item in recommend">
        <van-image class="w-h75" :src="item.image" :title="item.title" />
        <span>{{ item.title }}</span>
      </van-col>
    </van-row>
    <Tabbar :list="['流行', '新款', '精选']" @toggle="toggle" />
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Goods :goods="show" />
    </van-list>

    <BackTop v-if="back_show" class="back_top" @click.native="back_top" />
  </div>
</template>

<script>
//组件
import Tabbar from './components/Tabbar';
import Goods from '@/components/goods/';
import BackTop from '@/components/common/TopBar/';
//api
import { GetMultidata, GetGoods } from '@/api/shop';
//utils
import { debounce } from '@/utils/debounce';
export default {
  name: 'Shop',
  components: { Tabbar, Goods, BackTop },
  data() {
    return {
      banner: [],
      recommend: [],
      page: 1,
      type: 'pop',
      goods: {
        pop: { page: 0, list: [] },
        new: { page: 0, list: [] },
        sell: { page: 0, list: [] },
      },
      back_show: false,
      timer: null,
      scroll_top: 0,
      finished: false,
      loading: false,
    };
  },
  computed: {
    show() {
      return this.goods[this.type].list;
    },
  },
  created() {
    this.get_goods('pop');
    this.get_goods('new');
    this.get_goods('sell');
    this.get_multidata();
  },
  mounted() {
    const res = this.$refs.shop;
    window.addEventListener('scroll', this.handleScroll, true);
  },
  methods: {
    onLoad() {
      this.get_goods(this.type);
    },
    //回到顶部
    back_top() {
      this.timer && clearInterval(this.timer);
      let speed = -50;
      this.timer = setInterval(() => {
        if (document.documentElement.scrollTop == 0) {
          clearInterval(this.timer);
        }
        document.documentElement.scrollTop += speed;
      }, 10);
    },
    //监听屏幕滚动
    handleScroll(e) {
      const scroll_top =
        document.documentElement.scrollTop || document.body.scrollTop;
      if (scroll_top >= 1000) {
        this.back_show = true;
      } else {
        this.back_show = false;
      }
    },
    //tab切换
    toggle(index) {
      if (index == 0) {
        this.type = 'pop';
      } else if (index == 1) {
        this.type = 'new';
      } else {
        this.type = 'sell';
      }
    },
    //获取商品数据
    get_goods(type) {
      const page = this.goods[type].page + 1;
      GetGoods({
        type,
        page,
      }).then((res) => {
        const data = res.data.data;
        if (data && data.list && data.list.length > 0) {
          this.goods[type].page = data.page;
          this.goods[type].list.push(...data.list);
          this.loading = false;
        }
        if (data.list.length == 0) {
          this.finished = true;
        }
      });
    },
    // 获取首页数据
    get_multidata() {
      GetMultidata().then((res) => {
        const data = res.data.data;
        if (data) {
          this.banner.push(...data.banner.list);
          this.recommend.push(...data.recommend.list);
        }
      });
    },
  },
};
</script>

<style lang="scss">
#shop {
  color: wheat !important;
  .van-nav-bar {
    background-color: #fb3ffd;
  }
}
.recommend {
  display: flex;
  color: #000;
  .van-col {
    text-align: center !important;
  }
  span {
    display: inline-block;
  }
}

.w-h75 {
  width: 75px;
  height: 75px;
}
.back_top {
  position: fixed;
  right: 0;
  bottom: 100px;
  z-index: 1000;
  width: 45px;
  height: 45px;
  line-height: 45px;
  border-radius: 100%;
  background-color: cadetblue;
  &::after {
    content: '+';
    position: absolute;
    width: 100%;
    text-align: center;
    height: 100%;
    font-size: 28px;
  }
}
</style>
