<template>
  <div id="app">
    <router-view />
  </div>
</template>
<script>
export default {
  name: 'App',
  mounted() {
    const app = document.getElementById("app")
    app.addEventListener('mouseup', (e) => {
      let showRoute = document.getElementById('child-view');
      //车辆列表
      let carsSwiper = document.getElementsByClassName('cars-wrap')[0];
      if (carsSwiper && !carsSwiper.contains(e.target)) {
        const RequestCarsList = this.$store.state.isRequestCras;
        if (!RequestCarsList) {
          this.$store.commit('carsInfo/SET_CARS_LIST_STATE', false);
        }
      }

      if (showRoute && !showRoute.contains(e.target)) {
        let routerTarget = this.$route.name;
        if (routerTarget === 'Index') {
          return false;
        }
        this.$router.push({ path: '/' });
      }
    });
  },
};
</script>
<style lang="scss">
#app {
}
</style>
