<template>
  <div id="cart">
    <template v-if="show_cart">
      <template v-for="item in cart_info">
        <div class="cart-goods">
          <van-checkbox v-model="item.status" @change="handleStatus"></van-checkbox>
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
            </template>
          </van-card>
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
    </template>
    <template v-else>
      <div class="none">购物车空空如野</div>
    </template>
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
    show_cart(){
      console.log(this.cart_info);
     return this.cart_info && this.cart_info.length>0 ? true : false
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
    },
  },
  created() {
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
#cart {
  position: relative;
  width: 100vw;
  height: calc(100vw - 50px);
}
.cart-goods {
  display: flex;
  .van-checkbox {
    width: 50px;
  }
  .van-card__content {
    padding: 15px;
  }
}
.none {
  color: #ccc;
  font-size: 20px;
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%);
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
