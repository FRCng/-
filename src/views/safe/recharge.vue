<template>
  <div id="recharge">
    <Back />
    <ul class="money">
      <li
        v-for="item in data"
        :key="item.id"
        :class="{ 'item-current': current_id == item.id }"
        @click="handlerCurrent(item)"
      >
        {{ item.amount }}
      </li>
    </ul>
    <div class="input">
      <el-input
        v-model="money"
        placeholder="请输入充值金额"
        class="bg-black"
      ></el-input>
    </div>
    <div class="play">
      <span>支付类型</span>
      <ul class="play-wrap">
        <li>微信支付</li>
        <li class="current">支付宝</li>
      </ul>
    </div>
    <div class="recharge">
      <el-button class="block" @click="realy_money">确认充值</el-button>
    </div>
  </div>
</template>

<script>
import { GetRecharge, PayMoney } from '@/api/pay';
export default {
  name: 'Recharge',
  data() {
    return {
      money: 0,
      type: this.$route.query.type,
      data: [],
      current_id: '',
      current_money: 0,
    };
  },
  beforeMount() {
    this.get_recharge();
  },
  methods: {
    handlerCurrent(item) {
      this.current_id = item.id;
      this.current_money = item.amount;
    },
    //获取充值列表
    get_recharge() {
      GetRecharge().then((res) => {
        if (res.data) {
          this.data = res.data;
        }
      });
    },
    //充值
    realy_money() {
      if (!this.current_money) {
        this.$message.warning('请先选择充值金额');
        return false;
      }
      PayMoney({ amount: this.current_money, type: this.type }).then((res) => {
        console.log(res);
        const data = res.data;
        localStorage.setItem('order_no', data.order_no);
        this.$router.replace({
          name: 'Status',
        });
      });
    },
  },
};
</script>

<style lang="scss" scoped>
.item-current {
  background-color: #00a3ff;
  border-color: #00a3ff;
}
.recharge {
  margin-top: 50px;
  padding: 0 30px;
}
.block {
  width: 100%;
  display: block !important;
  border-radius: 25px;
  background-color: #00a3ff;
  border: #00a3ff;
  color: #fff;
}
.money {
  margin-top: 120px;
  padding: 0 15px;
  display: flex;
  flex-wrap: wrap;
  justify-content: center;
  box-sizing: border-box;
  li {
    width: 130px;
    height: 50px;
    border: 3px solid rgba(0, 0, 0, 0.6);
    border-radius: 8px;
    font-size: 24px;
    color: #fff;
    text-align: center;
    line-height: 50px;
    box-sizing: border-box;
    margin: 9px;
    cursor: pointer;
  }
}
.input {
  margin: 20px 30px 10px;
}
.play {
  padding: 0 30px;
  color: #fff;
  > span {
    display: inline-block;
    font-size: 14px;
    opacity: 0.5;
    margin-bottom: 33px;
  }
  .play-wrap {
    font-size: 16px;
    li {
      cursor: pointer;
      position: relative;
      padding: 13px 0;
      &::after {
        content: '';
        position: absolute;
        right: 0;
        width: 18px;
        height: 18px;
        border-radius: 11px;
        border: 1px solid rgba(255, 2555, 255, 0.6);
      }
    }
  }
}
.current {
  background-color: #00a3ff;
  border-color: #00a3ff;
}
</style>
