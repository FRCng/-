<template>
  <div id="channel">
    <!-- 我的频道 -->
    <van-cell center :border="false">
      <template #title>我的频道</template>
      <template #right-icon>
        <van-button
          type="primary"
          size="mini"
          round
          @click="show_edit = !show_edit"
          >编辑</van-button
        >
      </template>
    </van-cell>
    <van-grid :border="false" class="channel-item" :gutter="10">
      <van-grid-item
        :class="{ current: current_channel == index }"
        v-for="(item, index) in channel_list"
        :icon="show_edit && index != 0 ? 'clear' : ''"
        :key="item.id"
        :text="item.name"
        @click="handler_channel(item, index)"
      />
    </van-grid>
    <!-- 推荐频道 -->
    <van-cell center :border="false">
      <template #title>推荐频道</template>
    </van-cell>
    <van-grid :border="false" class="channel-item" :gutter="10">
      <van-grid-item
        v-for="item in Recommen"
        :key="item.id"
        :text="item.name"
        @click="add_channel(item)"
      />
    </van-grid>
  </div>
</template>

<script>
import { AllChannel, DelChannel, AddChannel } from '@/api/user';
export default {
  name: 'Channel',
  props: {
    news_info: { type: Array, default: () => [] },
    current_index: {
      type: Number,
      default: 0,
    },
  },
  data() {
    return {
      channel_list: [],
      all_channel_list: [],
      recommended_list: [],
      show_edit: false,
      current_channel: 0,
      user_token: this.$store.state.login.token,
    };
  },
  computed: {
    Recommen() {
      const res = this.all_channel_list.filter((item) => {
        // console.log(item.id);
        return !this.channel_list.find((value) => {
          return value.id == item.id;
        });
      });
      return res;
    },
  },
  beforeMount() {
    this.get_all_channel();
  },
  methods: {
    //频道编辑
    handler_channel(data, index) {
      if (this.show_edit) {
        this.delete_channel(data, index);
      } else {
        this.current_channel = index;
        this.switch_channel(index);
      }
    },
    //切换频道
    switch_channel(data) {
      this.$emit('switch', data);
    },
    //删除指定频道
    delete_channel(data, index) {
      if (index != 0) {
        if (index < this.current_channel) {
          this.current_channel--;
        }
        this.channel_list.splice(index, 1);
        DelChannel(data.id).then((res) => {
          console.log(res);
        });
      }
    },
    //添加频道
    add_channel(data) {
      this.channel_list.push(data);
      if (this.user_token.token) {
        AddChannel([
          {
            id: data.id,
            seq: this.channel_list.length,
          },
        ]).then((res) => {
          console.log(res.data);
        });
      }
    },
    get_all_channel() {
      AllChannel().then((res) => {
        const data = res.data.data.channels;
        if (data && data.length != 0) {
          this.all_channel_list = data;
        }
      });
    },
  },
  watch: {
    news_info: {
      handler(value) {
        if (value) {
          this.channel_list = value;
        }
      },
      immediate: true,
    },
    current_index: {
      handler(value) {
        this.current_channel = value;
      },
      immediate: true,
    },
  },
};
</script>

<style lang="scss" scoped>
.current {
  ::v-deep .van-grid-item__text {
    color: red;
  }
}
#channel {
  padding-top: 50px;
  .channel-item {
    margin-top: 15px;
    .van-grid-item {
      ::v-deep .van-grid-item__content {
        background-color: #f4f5f6 !important;
      }
      ::v-deep .van-grid-item__icon + .van-grid-item__text {
        margin-top: 0;
      }
      ::v-deep .van-grid-item__icon {
        position: absolute;
        top: -8px;
        right: 2px;
        font-size: 20px;
      }
    }
  }
}
</style>
