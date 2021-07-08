<template>
  <div class="navbar-wrap">
    <ul>
      <li><i class="icon w-h-45 icon-help"></i></li>
      <li><i class="icon w-h-45 icon-search"></i></li>
      <li>
        <a href="javascript:void(0);" class="cars-select">选择车辆</a>
      </li>
      <li><i class="icon w-h-45 icon-position" @click="selfloaction"></i></li>
      <li><i class="icon w-h-45 icon-user" @click="user"></i></li>
    </ul>
  </div>
</template>

<script>
export default {
  name: 'navbar',
  data() {
    return {};
  },
  methods: {
    user() {
      this.$router.push({ path: '/user' });
    },
    selfloaction() {
      this.$store.commit('loaction/SET_LOACTION');
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
