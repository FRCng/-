<template>
  <div class="back">
    <h4 class="title" @click="back">{{ title }}</h4>
    <h5 class="back-wrap">
      <slot name="login"></slot>
    </h5>
  </div>
</template>

<script>
export default {
  name: 'back',
  computed: {
    title() {
      return this.$store.state.app.isPreTitle;
    },
  },
  data() {
    return {};
  },
  methods: {
    back() {
      this.$router.go(-1);
    },
  },
};
</script>

<style lang="scss" scoped>
.back {
  position: absolute;
  display: flex;
  width: 100%;
  top: 30px;
  left: 30px;
}
.back-wrap {
  position: absolute;
  right: 50px;
}
.title {
  position: relative;
  color: #fff;
  padding-left: 33px;
  &::before {
    position: absolute;
    content: '';
    top: 50%;
    margin-top: -5px;
    left: 0;
    width: 10px;
    height: 10px;
    border-top: 2px solid #00a3ff;
    border-left: 2px solid #00a3ff;
    cursor: pointer;
    @include webkit(transform, rotate(-45deg));
  }
}
</style>
