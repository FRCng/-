<template>
  <div id="goods-item" @click="detailed">
    <van-image :src="showImg" />
    <div class="goods-item-wrap">
      <div class="title">{{ goods_item.title }}</div>
      <div class="info">
        <span class="price">￥{{ goods_item.price }}</span>
        <span class="sale">销量:{{ goods_item.sale }}</span>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: 'GoodsItem',
  data() {
    return {
      goods: {},
    };
  },
  computed: {
    showImg() {
      return this.goods_item.image || this.goods_item.show.img;
    },
  },
  props: {
    goods_item: {
      type: Object,
      default: () => {},
    },
  },
  methods: {
    detailed() {
      this.$router.push({
        name: 'GoodsDetailed',
        query: {
          iid: this.goods_item.iid,
        },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#goods-item {
  margin-top: 15px;
  padding: 10px;
  width: 48%;
  color: #000;
  display: flex;
  flex-direction: column;
  box-sizing: border-box;
  justify-content: space-between;
  .title {
    font-size: 15px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
  }
  .price {
    color: red;
    margin-right: 10px;
  }
  .info {
    display: flex;
    justify-content: center;
  }
}
</style>
