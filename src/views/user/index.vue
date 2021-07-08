<template>
  <div class="user-warp">
    <div class="user-info">
      <h4></h4>
      <div class="flex flex-column">
        <span class="email">{{ username }}</span>
        <span class="drive">文明驾驶分 <strong>0</strong></span>
      </div>
    </div>
    <ul class="menu">
      <li>
        <i class="icon icon-menu_1"></i>
        <router-link tag="a" to="/user">我的账户</router-link>
      </li>
      <li>
        <i class="icon icon-menu_2"></i>
        <router-link tag="a" to="/user">租车订单</router-link>
      </li>
      <li>
        <i class="icon icon-menu_3"></i>
        <router-link tag="a" to="/user">实名认证</router-link>
      </li>
      <li>
        <i class="icon icon-menu_4"></i>
        <router-link tag="a" to="/safe">安全设置</router-link>
      </li>
      <li>
        <i class="icon icon-menu_5"></i>
        <router-link tag="a" to="/recharge">充值中心</router-link>
      </li>
    </ul>
    <div class="btn">退出</div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      username: this.$store.state.account.username,
    };
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
