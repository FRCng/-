<template>
  <div id="goods">
    <GoodsItem v-for="(item, index) in goods" :goods_item="item" :key="index" />
  </div>
</template>

<script>
import GoodsItem from './item';
export default {
  name: 'Goods',
  components: {
    GoodsItem,
  },
  props: {
    goods: {
      type: Array,
      default: () => [],
    },
  },
  data() {
    return {};
  },
};
</script>

<style lang="scss" scoped>
#goods {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-evenly;
}
</style>
