<template>
  <div>
    <!-- 登录 -->
    <LoginVue />
    <!-- 地图 -->
    <aMap ref="amap" @callbackComponents="callbackComponents" />
    <!-- cars  data渲染 -->
    <Cars ref="cars" />
    <!-- 会员 -->
    <div id="child-view" :class="{ open: show }">
      <router-view />
    </div>
    <!-- 导航 -->
    <NavBar />
    <div id="panel"></div>
    <div class="sale" v-if="cars_activation_order">正在使用的车辆</div>
    <div
      class="btn"
      v-if="cars_activation_order && cars_activation_order.order_status"
    >
      <el-button
        v-if="cars_activation_order.order_status == 'WAIT'"
        @click="get_cars"
        >取车</el-button
      >
      <el-button
        v-if="cars_activation_order.order_status == 'RETURN'"
        @click="return_cars"
        >还车</el-button
      >
      <el-button
        v-if="cars_activation_order.order_status == 'WAIT'"
        @click="cancle"
        >取消车辆订单</el-button
      >
    </div>
  </div>
</template>

<script>
// api
import { Parking } from '@/api/parking';
import { CarsActivation, GetCars, ReturnCars, CancelCars } from '@/api/order';
//组件
import LoginVue from './login';
import aMap from '../amap/index';
import Cars from '../cars/index';
import NavBar from '@c/navbar';
export default {
  name: 'Index',
  components: { aMap, Cars, NavBar, LoginVue },
  data() {
    return {
      parking_id: '',
      cars_activation_order: JSON.parse(localStorage.getItem('cars_order')),
    };
  },
  computed: {
    show() {
      let routerName = this.$route;
      return routerName.name === 'Index' ? false : true;
    },
  },
  beforeMount() {
    this.cars_activation();
  },
  methods: {
    //取消车辆订单
    cancle() {
      CancelCars({
        order_no: this.cars_active_data.order_no,
        cars_id: this.cars_active_data.cars_id,
      }).then((res) => {
        this.cars_active_data = null;
        localStorage.removeItem('cars_order');
      });
    },
    //还车
    return_cars() {
      ReturnCars({
        order_no: this.cars_activation_order.order_no,
        cars_id: this.cars_activation_order.cars_id,
        parking_id: this.parking_id,
      }).then((Res) => {
        if (Res.data && Res.data.order_status) {
          this.cars_activation_order = null;
          localStorage.removeItem('cars_order');
        }
      });
    },
    //订单详情
    cars_activation() {
      CarsActivation().then((res) => {
        this.$message({
          type: 'success',
          message: res.message,
        });
        if (res.data) {
          this.cars_activation_order = res.data;
          localStorage.setItem('cars_order', JSON.stringify(res.data));
        }
      });
    },
    //取车
    get_cars() {
      GetCars({
        order_no: this.cars_activation_order.order_no,
        cars_id: this.cars_activation_order.cars_id,
      }).then((res) => {
        console.log(res);
        if (res.data && res.data.order_status) {
          this.cars_activation_order.order_status = res.data.order_status;
          localStorage.setItem(
            'cars_order',
            JSON.stringify(this.cars_activation_order)
          );
        }
        this.$message.success(res.message);
      });
    },
    callbackComponents(params) {
      if (params.function) {
        this[params.function]();
      }
    },
    initData() {
      Parking().then((res) => {
        const data = res.data.data;
        if (data) {
          data.forEach((item) => {
            item.position = item.lnglat.split(',');
            item.offset = [-30, -55];
            item.offsetText = [-30, -70];
            item.events = {
              click: (e) => {
                this.parking_id = item.id;
                this.handlerWark(e);
                this.$store.commit('carsInfo/SET_CARS_REQUEST_STATE', true);
              },
            };
            item.content =
              "<img src='" + require('@/assets/marker.png') + " ' />";
            item.text = `<div style="width: 61px;height: 76px;line-height: 76px;color: white;font-size: 20px;text-align: center;">${item.carsNumber}</div>`;
          });
        }
        if (this.$refs.amap) {
          this.$refs.amap.showParking(data);
        }
      });
    },

    //路径信息
    handlerWark(e) {
      const data = e.target.getExtData();
      if (this.$refs.amap) {
        this.$refs.amap.warking(data);
      }
      if (this.$refs.cars) {
        this.$refs.cars.get_cars_list(data.id);
      }
    },
  },
};
</script>

<style lang="scss" scoped>
#child-view {
  position: fixed;
  right: -600px;
  top: 0;
  bottom: 0;
  z-index: 101;
  width: 360px;
  background-color: darkslategray;
  -webkit-transition: all 0.3s ease 0s;
  transition: all 0.8s ease 0s;
  &.open {
    right: 0;
  }
}
.sale {
  position: fixed;
  top: 50px;
  left: 50px;
  width: 200px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  z-index: 100;
  background-color: paleturquoise;
  border-radius: 15px;
}
.btn {
  position: fixed;
  top: 100px;
  left: 50px;
  text-align: center;
  line-height: 50px;
  color: #fff;
  z-index: 100;
  border-radius: 15px;
}
</style>
