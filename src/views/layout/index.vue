<template>
  <div>
    <!-- 路由视图 -->
    <keep-alive exclude="Shop">
      <router-view></router-view>
    </keep-alive>
    <!-- 导航栏 -->
    <van-tabbar v-model="active" route>
      <van-tabbar-item icon="home-o" to="/">首页</van-tabbar-item>
      <van-tabbar-item icon="search" to="/shop">美丽说</van-tabbar-item>
      <van-tabbar-item icon="search" to="/category">分类</van-tabbar-item>
      <van-tabbar-item icon="friends-o" to="/cart">购物车</van-tabbar-item>
      <van-tabbar-item icon="setting-o" to="/my">个人中心</van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<script>
export default {
  name: 'Layout',
  data() {
    return { active: 0 };
  },
  mounted() {
    this.$store.commit('login/SET_CACHE_PAGE', 'Layout');
  },
};
</script>

<style lang="" scoped></style>
