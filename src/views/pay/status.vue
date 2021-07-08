<template>
  <div class="user-container">
    <Back />
    <div class="text-center color-white mt lh-40">
      <h4><strong>订单号</strong></h4>
      <p>a2121fads34fas31fa</p>
    </div>
    <div class="blank-40"></div>
    <div class="text-center p20">
      <el-button type="warning" round class="button-block"
        ><strong>去支付</strong></el-button
      >
    </div>
    <div class="blank-20"></div>
    <div class="text-center p20">
      <el-button type="primary" round class="button-block"
        ><strong>完成支付</strong></el-button
      >
    </div>
  </div>
</template>
<script>
import { OrderStatus } from '@/api/pay';
export default {
  name: 'Status',
  data() {
    return {
      timer: null,
    };
  },
  beforeMount() {
    this.order_status();
    this.setinter();
  },
  methods: {
    order_status() {
      const order_no = localStorage.getItem('order_no');
      return OrderStatus({ order_no }).then((res) => {
        return res.data.status;
      });
    },
    //获取订单状态
    async get_order_status() {
      const result = await this.order_status();
      this.finish(result);
    },
    finish(status) {
      if (status == 'success') {
        clearInterval(this.timer);
        this.$router.replace({
          name: 'Result',
          query: {
            status: status,
          },
        });
      }
    },
    //定时器
    setinter() {
      this.timer = setInterval(() => {
        this.get_order_status();
      }, 3000);
    },
  },
};
</script>
<style lang="scss"></style>
