<template>
  <div>
    <el-amap
      vid="amapDemo"
      :amap-manager="amapManager"
      :center="center"
      class="amap-demo"
      :zoom="zoom"
      :events="events"
    >
      <!-- 覆盖物 -->
      <el-amap-circle
        v-for="item in circle"
        :key="item.id"
        :center="item.center"
        :radius="item.radius"
        :fillColor="item.color"
        :storkeColot="item.color"
        :strokeOpacity="item.strokeOpacity"
        :strokeWeight="item.strokeWeight"
      ></el-amap-circle>
      <!-- 停车场 -->
      <el-amap-marker
        v-for="item in parking"
        :vid="item.id"
        :key="item.id"
        :position="item.position"
        :offset="item.offset"
        :content="item.content"
      ></el-amap-marker>
      <!-- 停车场数量 -->
      <el-amap-marker
        v-for="(item, index) in CarsNumber"
        :key="item.id + index"
        :extData="item"
        :events="item.events"
        :content="item.text"
        :offset="item.offsetText"
        :position="item.position"
        :vid="index"
      >
      </el-amap-marker>
      <!-- 停车场距离、车辆信息 -->
      <el-amap-marker
        v-for="(item, index) in parkingData"
        :key="index"
        zIndex="1000"
        :content="item.content"
        :offset="item.offset"
        :position="item.position"
        :vid="index"
      >
      </el-amap-marker>
    </el-amap>
  </div>
</template>

<script>
import { AMapManager, lazyAMapApiLoaderInstance } from 'vue-amap';
import { SelfLoaction } from './loaction';
import { Warking } from './warking';
let amapManager = new AMapManager();
export default {
  name: 'MampComponent',
  data() {
    const _this = this;
    return {
      map: null,
      zoom: 18,
      amapManager,
      center: [113.260111, 23.121028],
      events: {
        init(o) {
          lazyAMapApiLoaderInstance.load().then(() => {
            _this.initAmap();
          });
        },
      },
      circle: [
        {
          center: this.$store.state.loaction.SelfCenter,
          radius: 4,
          color: '#393e43',
          strokeOpacity: '0.2',
          strokeWeight: '30',
        },
      ],
      parking: [],
      CarsNumber: [],
      parkingInfo: {},
      parkingData: [],
      CarsLngLatEnd: [],
    };
  },
  methods: {
    showParking(data) {
      this.parking = data;
      this.CarsNumber = data;
    },
    warking(data) {
      this.CarsLngLatEnd = data.lnglat.split(',');
      this.parkingInfo = data;
      let lnglat = data.lnglat.split(',');
      Warking({
        map: this.map,
        start: this.circle[0].center,
        end: lnglat,
        complete: (val) => this.handlerWarking(val),
      });
    },
    handlerWarking(data) {
      this.parkingData = [
        {
          position: this.CarsLngLatEnd,
          offset: [-15, -55],
          content: `<div style="
          color:#fff;
          background-color: #34393f;
          border-radius: 100px;
          width: 185px;
          height: 47px;
          line-height: 47px;">${this.parkingInfo.carsNumber}&nbsp;辆车,距您离${
            data.routes[0].distance / 1000
          }公里</div>`,
        },
      ];
    },
    initAmap() {
      this.map = amapManager.getMap();
      this.$emit('callbackComponents', {
        function: 'initData',
      });
      this.loaction();
    },
    loaction() {
      SelfLoaction({ map: this.map });
      this.center = this.$store.state.loaction.SelfCenter;
    },
  },
  mounted() {},
  watch: {
    '$store.state.loaction.loactionInfo': {
      handler(value) {
        this.loaction();
      },
    },
  },
};
</script>

<style lang="scss" scoped>
.amap-demo {
  height: 100vh;
}
</style>
