<template>
  <div class="user-warp">
    <Back />
    <ul class="menu">
      <li>
        <router-link tag="a" to="/password">修改登录密码</router-link>
      </li>
      <li>
        <router-link tag="a" to="/user">设置资金密码</router-link>
      </li>
      <li>
        <router-link tag="a" to="/user">绑定手机号</router-link>
      </li>
      <li>
        <router-link tag="a" to="/safe">绑定银行号</router-link>
      </li>
    </ul>
    <div class="btn">退出</div>
  </div>
</template>

<script>
export default {
  name: 'safe',
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
