<template>
  <div id="home">
    <!-- 搜索框 -->
    <van-search
      v-model="search"
      shape="round"
      background="#3296fa"
      placeholder="请输入搜索关键词"
      class="serach"
      @focus="handler_search"
    />
    <!-- 标签页 -->
    <van-tabs v-model="active" class="scroll" @click="target_channel">
      <van-tab v-for="item in news_info" :title="item.name" :key="item.id">
        <VanList ref="list" class="list" :channels="item" />
      </van-tab>
      <div slot="nav-right" class="placeholder"></div>
      <div slot="nav-right" class="menu"><Menu @click.native="pop_up" /></div>
    </van-tabs>
    <!-- 弹出层 -->
    <van-popup
      v-model="show"
      position="bottom"
      closeable
      get-container="body"
      :style="{ height: '100%' }"
    >
      <Chnannel
        :news_info="news_info"
        @switch="switch_channel"
        :current_index="current_channel"
      />
    </van-popup>
  </div>
</template>

<script>
//组件
import VanList from './list.vue';
import Menu from './components/menu';
import Chnannel from './components/channel';
//api
import { GetInfo } from '@/api/user';
export default {
  name: 'Home',
  components: { VanList, Menu, Chnannel },
  data() {
    return {
      search: '',
      active: 0,
      news_info: [],
      show: false,
      current_channel: 0,
      user_token: this.$store.state.login.token,
    };
  },
  beforeMount() {
    this.get_news_info();
  },
  mounted() {},
  methods: {
    handler_search() {
      this.$router.push({
        path: '/search',
      });
    },
    switch_channel(index) {
      this.show = false;
      this.active = index;
    },
    target_channel(index) {
      this.current_channel = index;
    },
    pop_up() {
      this.show = true;
    },
    //获取频道信息
    get_news_info() {
      if (this.user_token.token) {
        GetInfo().then((res) => {
          const data = res.data.data;
          if (data) {
            this.news_info = data.channels;
          }
        });
      }
    },
  },
};
</script>

<style lang="scss" scoped>
.serach {
  padding: 0 30px;
  height: 50px;
}
.list {
  position: fixed;
  top: 114px;
  left: 0;
  right: 0;
  overflow-y: auto;
  bottom: 50px;
}
.placeholder {
  width: 32px;
  height: 41px;
  flex-shrink: 0;
}
.menu {
  position: fixed;
  width: 32px;
  height: 41px;
  line-height: 41px;
  text-align: center;
  right: 0;
  top: 50px;
  background-color: #fff;
  font-size: 20px;
}
</style>
