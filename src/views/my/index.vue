<template>
  <div class="my">
    <!-- 判断用户是否登录 -->
    <template v-if="token">
      <van-cell-group class="user-info" :border="false">
        <van-cell center>
          <template #title>
            <van-image width="50" height="50" round :src="user_info.photo" />
          </template>
          <template #right-icon>
            <van-button
              plain
              hairline
              type="info"
              round
              size="mini"
              to="/user/info"
              >编辑资料</van-button
            >
          </template>
        </van-cell>
      </van-cell-group>
      <!-- 用户信息 -->
      <van-grid :border="false" center class="my-info">
        <van-grid-item>
          <div slot="text">
            <div class="number">{{ user_info.art_count }}</div>
            <div class="text">头条</div>
          </div>
        </van-grid-item>
        <van-grid-item to="/user/fans">
          <div slot="text">
            <div class="number">{{ user_info.fans_count }}</div>
            <div class="text">粉丝</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="number">{{ user_info.like_count }}</div>
            <div class="text">关注</div>
          </div>
        </van-grid-item>
        <van-grid-item>
          <div slot="text">
            <div class="number">{{ user_info.follow_count }}</div>
            <div class="text">获赞</div>
          </div>
        </van-grid-item>
      </van-grid>
    </template>
    <template v-else>
      <div class="login" @click="login">
        <van-image
          width="50"
          height="50"
          round
          src="https://img01.yzcdn.cn/vant/cat.jpeg"
        />
        <span class="login-content">注册/登录</span>
      </div>
    </template>
    <van-grid :column-num="2">
      <van-grid-item icon="photo-o" to="/" text="历史" />
      <van-grid-item icon="photo-o" to="/" text="收藏" />
    </van-grid>
    <van-cell-group>
      <van-cell title="消息通知" is-link />
      <van-cell title="小智同学" is-link />
      <van-cell v-if="token" title="退出" @click="lought" class="lougth" />
    </van-cell-group>
  </div>
</template>

<script>
import { GetUserInfo } from '@/api/login';
export default {
  name: 'My',
  data() {
    return {
      user_info: {},
    };
  },
  computed: {
    token() {
      return this.$store.state.login.token;
    },
  },
  beforeMount() {
    this.get_user_info();
  },
  methods: {
    get_user_info() {
      if (this.token) {
        GetUserInfo().then((res) => {
          const data = res.data.data;
          // console.log(data);
          if (data) {
            this.user_info = data;
          }
        });
      }
    },
    //退出
    lought() {
      this.$dialog
        .confirm({
          title: '提示',
          message: '是否退出登录？',
        })
        .then(() => {
          this.$toast({
            message: '退出成功',
            position: 'top',
          });
          this.$store.commit('login/SET_TOKEN', null);
        });
    },
    //登录
    login() {
      // console.log(this.$route.fullPath);
      // return;
      this.$router.push({
        name: 'Login',
        query: {
          redirect: this.$route.fullPath,
        },
      });
    },
  },
};
</script>

<style lang="scss">
body {
  background-color: #f5f7f9;
}
.login {
  display: flex;
  justify-content: center;
  flex-direction: column;
  align-items: center;
  padding: 35px 0;
  .login-content {
    font-size: 14px;
    padding-top: 5px;
    color: #fff;
  }
}
.my {
  background-color: #46a0fa;
  > .user-info {
    background-color: unset;
  }
  > .user-info > .van-cell {
    background-color: unset;
  }
  .my-info > .van-grid-item > .van-grid-item__content {
    background-color: unset;
  }
}
.number {
  color: #fff;
  font-size: 18px;
}
.text {
  color: #fff;
  font-size: 12px;
}
.lougth {
  text-align: center;
  color: #d86262;
  font-size: 15px;
}
</style>
