<template>
  <div id="detailed">
    <van-cell class="main-color h-48" to="/" />
    <itemList :id="id" />
    <!-- 底部 -->
    <div class="bottom">
      <div class="pinlun">
        <van-button
          type="primary"
          class="pinlun-content"
          text="写评论"
          @click="handler_btn"
        ></van-button>
      </div>
      <div class="icon">
        <i
          class="iconfont icon-dianzan"
          :class="{ current: linkg }"
          @click="liking"
        >
        </i>
        <i class="iconfont icon-pinglun"></i>
        <i
          class="iconfont icon-shoucang"
          :class="{ current: coll }"
          @click="collection"
        ></i>
        <i class="iconfont icon-fenxiang"></i>
      </div>
    </div>
    <van-popup
      v-model="show"
      closeable
      position="bottom"
      :style="{ height: '30%' }"
      ><van-row class="comments" gutter="20">
        <van-col span="12">
          <van-field autosize v-model="text" label="请输入评论"
        /></van-col>
        <van-col span="12"
          ><van-button type="primary" size="mini" @click="add_comments"
            >添加评论</van-button
          ></van-col
        >
      </van-row>
    </van-popup>
  </div>
</template>

<script>
import {
  Likings,
  AddComments,
  CancelLiking,
  Collection,
  CancelCollection,
} from '@/api/news';
import itemList from './Detailedlist';
export default {
  name: 'Detailed',
  components: { itemList },
  data() {
    return {
      id: this.$route.query.id,
      text: '',
      show: false,
      linkg: false,
      coll: false,
    };
  },
  mounted() {},
  methods: {
    collection() {
      if (!this.coll) {
        Collection({ target: this.id }).then((res) => {
          this.coll = true;
          this.$toast.success('已收藏');
        });
      } else {
        CancelCollection(this.id).then((res) => {
          this.false = true;
          this.$toast.success('已取消');
        });
      }
    },
    handler_btn() {
      this.show = true;
    },
    liking() {
      if (!this.linkg) {
        Likings({ target: this.id }).then((res) => {
          this.linkg = true;
          this.$toast.success('点赞成功');
        });
      } else {
        CancelLiking(this.id).then((res) => {
          this.linkg = false;
          this.$toast.fail('已取消');
        });
      }
    },
    add_comments() {
      AddComments({
        target: this.id,
        content: this.text,
      }).then((res) => {
        if (res.data.message == 'OK') {
          this.$toast.success('添加成功');
          this.show = false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.current {
  color: yellow;
}
.comments {
  padding: 15px;
  margin: 20px auto 10px;
}
.bottom {
  display: flex;
  justify-content: space-evenly;
  position: fixed;
  left: 0;
  right: 0;
  bottom: 0;
  height: 50px;
  line-height: 50px;
  background-color: #fff;
  .pinlun {
    flex: 1;
    .pinlun-content {
      width: 200px;
      height: 32px;
      background-color: #fff;
      border: 1px solid #eeeeee;
      border-radius: 15px;
      color: #000;
    }
  }
  .icon {
    flex: 1;
    display: flex;
    justify-content: space-evenly;
    i {
      display: inline-block;
    }
  }
}
</style>
