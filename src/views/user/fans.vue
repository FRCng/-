<template>
  <div id="fans">
    <van-nav-bar left-arrow @click-left="$router.back()">
      <div slot="title" class="fff">
        <span
          v-for="(item, index) in list"
          :class="{ current: current_index == index }"
          :key="index"
          @click="handler_click(item, index)"
          >{{ item.label }}</span
        >
      </div>
    </van-nav-bar>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <van-cell center v-for="(item, index) in fans_list" :key="index">
        <div slot="icon">
          <van-image class="img" round :src="item.photo" />
        </div>
        <div slot="title">
          <span class="name">{{ item.name }}</span>
        </div>
        <div slot="label">
          <span class="number">粉丝数</span><i>{{ item.fans_count }}</i>
        </div>
        <div slot="right-icon">
          <van-button type="primary">关注</van-button>
        </div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { Follow, Followers } from '@/api/user';
export default {
  name: 'Fans',
  data() {
    return {
      current_index: 0,
      list: [
        { label: '关注', type: 'focus' },
        { label: '粉丝', type: 'fans' },
      ],
      page: 1,
      per_page: 10,
      fans_list: [],
      loading: false,
      finished: false,
    };
  },
  methods: {
    handler_click(item, index) {
      this.current_index = index;
      if (item.type == 'focus') {
        this.focus_on();
      } else {
        this.get_fans();
      }
    },
    onLoad() {
      this.focus_on();
    },
    //关注
    focus_on() {
      const request = {
        page: this.page,
        per_page: this.per_page,
      };
      console.log(request);
      Follow(request).then((res) => {
        console.log(res.data.data);
        const data = res.data.data;
        if (data && data.results.length > 0) {
          this.page = data.page + 1;
          this.fans_list.push(...data.results);
        }
        this.loading = false;
        if (data.results.length == 0) {
          this.finished = true;
        }
      });
    },
    //粉丝
    get_fans() {
      Followers({
        page: this.page,
        per_page: this.per_page,
      })
        .then((res) => {
          // console.log(res);
        })
        .catch((err) => {
          console.log(err);

          this.$toast.fail('接口有问题，无须担心');
        });
    },
  },
};
</script>

<style lang="scss" scoped>
.current {
  border-bottom: 2px solid #fff;
}
#fans {
  .number {
    display: inline-block;
    margin-right: 5px;
  }
  .name {
    display: inline-block;
    margin-top: 7px;
    margin-bottom: 7px;
  }
  .img {
    width: 50px;
    height: 50px;
    margin-right: 13px;
  }
  .van-cell {
    padding: 13px 15px !important;
  }
  .van-nav-bar {
    background-color: royalblue !important;
  }
  .fff {
    display: flex;
    color: #fff;
    span {
      flex: 1;
      margin: 0 13px;
    }
  }
}
</style>
