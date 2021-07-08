<template>
  <div class="user-warp">
    <Back>
      <template v-slot:login>
        <router-link to="/login" class="white">登录</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <UserVue :value.sync="form.username" />
        <PasswordVue :value.sync="form.password" :confirm="form.password2" />
        <Confirm :value.sync="form.password2" :password="form.password" />
        <CodeVue :username="form.username" :value.sync="form.code" />
        <el-form-item>
          <el-button type="primary" @click="submit">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div class="btn">退出</div>
  </div>
</template>

<script>
import sha1 from 'js-sha1';
//组件
import UserVue from './components/user';
import PasswordVue from './components/password';
import Confirm from './components/confirm';
import CodeVue from '@c/code';

export default {
  name: 'login',
  components: { UserVue, CodeVue, PasswordVue, Confirm },
  data() {
    return {
      form: {
        username: '',
        password: '',
        password2: '',
        code: '',
      },
    };
  },
  methods: {
    submit() {
      this.$refs['form'].validate((valid) => {
        if (valid) {
          const requestData = {
            username: this.form.username,
            password: sha1(this.form.password),
            code: this.form.code,
          };
          this.$store.dispatch('account/register', requestData).then((res) => {
            this.$message.success(res.message);
            this.$router.replace({
              name: 'Login',
            });
          });
        } else {
          console.log('error submit!!');
          return false;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
