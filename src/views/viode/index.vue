<template>
  <div>
    <template v-for="item in cart_info">
      <div class="cart-goods">
        <van-checkbox
          v-model="item.status"
          @change="handleStatus"
        ></van-checkbox>
        <van-card
          :num="item.num"
          :price="item.price"
          desc="描述信息"
          :title="item.title"
          :thumb="item.img"
          centered
        >
          <template #footer>
            <van-button size="small" @click="minus(item)">-</van-button>
            <van-button size="small" @click="add(item)">+</van-button>
          </template></van-card
        >
      </div>
    </template>
    <div class="settle">
      <div class="btn" :class="{ current: show }" @click="handle_check"></div>
      <div>
        合计:
        <i>{{ money }}</i>
      </div>
      <van-button type="danger" @click="payment">付款</van-button>
    </div>
  </div>
</template>

<script>
export default {
  name: 'Cart',
  data() {
    return {
      radio: false,
      cart_info: this.$store.state.cart.cart,
      active: 0,
    };
  },
  computed: {
    show() {
      return !this.cart_info.find((item) => !item.status);
    },
    money() {
      let count = 0;
      this.cart_info.forEach((element) => {
        if (element.status) {
          count += element.price * 1 * element.num;
        }
      });
      return count;
    },
    CheckAll() {
      return true;
      console.log('555');
    },
  },
  created() {
    console.log(this.cart_info);
  },
  methods: {
    payment() {
      if (!this.money) {
        this.$toast.fail({ message: '请选择商品', icon: 'clear' });
        return false;
      } else {
        this.$toast.success({
          message: '支付成功',
          icon: 'refund-o',
        });
      }
    },
    handleStatus(value) {
      console.log(value);
    },
    minus(data) {
      console.log(data);
      if (data.num == 1) {
        this.$toast.fail('不能在继续减啦');
      } else {
        data.num--;
      }
    },
    add(data) {
      data.num++;
    },
    handle_check() {
      if (this.show) {
        this.cart_info.forEach((item) => (item.status = false));
      } else {
        this.cart_info.forEach((item) => (item.status = true));
      }
      console.log('全选');
    },
  },
};
</script>

<style lang="scss" scoped>
.cart-goods {
  display: flex;
  .van-checkbox {
    width: 50px;
  }
  .van-card__content {
    padding: 15px;
  }
}
.settle {
  position: fixed;
  left: 0;
  right: 0;
  bottom: 50px;
  display: flex;
  align-items: center;
  justify-content: space-between;
  font-size: 18px;
}
.btn {
  width: 30px;
  height: 30px;
  border-radius: 100%;
  border: 1px solid #000;
}
.current {
  background-color: pink;
}
</style>
