<template>
  <div id="tabbar">
    <div class="tabber-wrap">
      <div
        v-for="(item, index) in list"
        :class="{ current: currentIndex == index }"
        :key="item"
        @click="target(index)"
      >
        {{ item }}
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Tabbar',
  data() {
    return {
      currentIndex: 0,
    };
  },
  props: {
    list: {
      type: Array,
      default: () => [],
    },
  },
  methods: {
    target(index) {
      this.currentIndex = index;
      this.$emit('toggle', index);
    },
  },
};
</script>

<style lang="scss" scoped>
#tabbar {
  margin-top: 15px;
  height: 55px;
  line-height: 55px;
}
.tabber-wrap {
  display: flex;
  height: 100%;
  color: #000;
  > div {
    flex: 1;
    text-align: center;
    height: 100%;
    font-size: 15px;
  }
}
.current {
  width: 5px;
  border-bottom: 2px solid #000;
  color: blueviolet;
}
</style>
