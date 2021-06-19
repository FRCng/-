<template>
  <div>
    <van-nav-bar
      class="app-nav"
      title="登录"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 表单 -->
    <van-form
      validate-first
      ref="form"
      @failed="onFailed"
      @submit="submit"
      :show-error-message="false"
      :show-error="false"
    >
      <van-cell-group>
        <van-field
          v-model="mobile"
          name="mobile"
          class="iconfont icon-shouji"
          placeholder="请输入手机号"
          :maxlength="11"
          :rules="form.mobile"
        /> </van-cell-group
      ><van-field
        v-model="code"
        center
        clearable
        class="iconfont icon-yanzhengma"
        placeholder="请输入短信验证码"
        :rules="form.code"
      >
        <template #button>
          <van-button
            size="small"
            :disabled="btn.disabled"
            :loading="btn.loading"
            loading-text="请求中..."
            type="primary"
            @click.prevent="send_code"
            >发送验证码</van-button
          >
        </template>
      </van-field>

      <van-button type="info" block>登录</van-button>
    </van-form>
  </div>
</template>

<script>
import { GetCode, Login } from '@/api/login';
export default {
  data() {
    return {
      mobile: '13911111111',
      code: '246810',
      btn: {
        disabled: false,
        loading: false,
      },
      form: {
        mobile: [
          { required: true, message: '请输入手机号' },
          {
            pattern: /^1[356789]{11}$/.test(this.mobile),
            message: '请输入11位的数字',
          },
        ],
        code: [{ required: true, message: '请输入验证码' }],
      },
    };
  },
  methods: {
    onClickLeft() {
      this.$router.go(-1);
    },
    //发送验证码
    send_code() {
      this.btn.disabled = true;
      this.btn.loading = true;
      this.$refs['form']
        .validate('mobile')
        .then((res) => {
          this.get_code();
          this.btn.disabled = false;
          this.btn.loading = false;
        })
        .catch((error) => {
          this.btn.disabled = false;
          this.btn.loading = false;
          this.$toast({
            message: error.message,
            position: 'top',
          });
        });
    },
    //获取验证码
    get_code() {
      GetCode(this.mobile)
        .then((res) => {
          if (res.status == 200) {
            this.$toast({
              message: '短信发送成功，请注意查收',
              position: 'top',
            });
          }
        })
        .catch((err) => {
          if (err && err.response && err.response.status == 429) {
            this.$toast({
              message: '请勿频繁请求',
              position: 'top',
            });
          }
        });
    },
    //验证通过
    submit() {
      Login({
        mobile: this.mobile,
        code: this.code,
      })
        .then((res) => {
          console.log(res);
          if (res.status == 201) {
            this.$store.commit('login/CLEAR_CACHE_PAGE', 'Layout');
            this.$toast({
              message: '登录成功',
              position: 'top',
            });
            this.$store.commit('login/SET_TOKEN', res.data.data);
          }
          this.$router.push(this.$route.query.redirect || '/');
        })
        .catch((err) => {
          console.log(err);
        });
    },
    //验证失败
    onFailed(err) {
      console.log(err);
      if (err && err.errors[0]) {
        this.$toast({
          message: err.errors[0].message,
          position: 'top',
        });
      }
    },
  },
};
</script>

<style lang="" scoped></style>
