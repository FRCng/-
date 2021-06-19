<template>
  <div id="app">
    <keep-alive :include="CachePage">
      <router-view />
    </keep-alive>
  </div>
</template>

<style lang="scss">
#app {
}
</style>
<script>
export default {
  name: 'App',
  computed: {
    CachePage() {
      return this.$store.state.login.CachePage;
    },
  },
};
</script>
