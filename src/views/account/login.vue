<template>
  <div class="user-warp">
    <Back>
      <template v-slot:login>
        <router-link to="/register" class="white">注册</router-link>
      </template>
    </Back>
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <UserVue :value.sync="form.username" />
        <PasswordVue :value.sync="form.password" />
        <el-form-item>
          <el-button type="primary" @click="submit">登录</el-button>
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

export default {
  name: 'login',
  components: { UserVue, PasswordVue },
  data() {
    return {
      form: {
        username: '',
        password: '',
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
          };
          this.$store.dispatch('account/login', requestData).then((res) => {
            console.log(res);
            this.$message.success(res.message);
            this.$router.replace({
              name: 'Index',
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
