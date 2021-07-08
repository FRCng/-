<template>
  <div class="p-r">
    <section class="cars-info" @click="show_cars_info">
      <header>
        <h4 class="cars-logo">
          <img :src="data.imgUrl" alt="" />
          <span class="title">{{ data.carsMode }}</span>
        </h4>
        <p class="cars-attr">
          {{ data.carsAttr | engterType }}&nbsp;|&nbsp;{{
            data.carsAttr | seat
          }}座
        </p>
      </header>
      <div class="cars-content">
        <div class="content-info">
          <div>
            <h4 class="title">{{ data.carsNumber }}</h4>
            <div class="flex">
              <ul :class="data.oil || data.electric | countKm">
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
                <li></li>
              </ul>
              <p class="distance">
                <sub>约</sub>
                <strong>{{ data.countKm }}</strong>
                <sub>KM</sub>
              </p>
            </div>
          </div>
        </div>
        <img :src="data.carsImg" alt="" />
      </div>
      <footer>
        <a href="javascript:;" class="cars-parking">{{ data.parkingName }}</a>
      </footer>
    </section>
    <section
      class="cars-info cars-detailed"
      :style="'height:' + detailedHeight"
      v-if="cars_detailed"
    >
      <div class="over-hid">
        <h4 class="park-name">
          {{ data.parkingName }}
          <i class="close" @click="close_cars_info"></i>
        </h4>
        <header>
          <h4 class="cars-logo">
            <img :src="data.imgUrl" alt="" />
            <span class="title">{{ data.carsMode }}</span>
          </h4>
          <p class="cars-attr">{{ data.carsAttr | engterType }}座</p>
        </header>
        <div class="cars-img">
          <img :src="data.carsImg" alt="" />
        </div>
        <div class="content-info flex flex-between">
          <h4 class="title">{{ data.carsNumber }}</h4>
          <p class="distance">
            <sub>约</sub>
            <strong>600</strong>
            <sub>KM</sub>
          </p>
        </div>
        <div class="plan">
          <p class="plan-realy" style="width: 80%"></p>
          <p class="plan-bg"></p>
        </div>
        <p class="text-center f-14 op-8">
          取车约支付12.0元停车费，实际补贴12.0元
        </p>
        <ul class="flex flex-column">
          <li
            v-for="item in lease_data"
            :key="item.id"
            class="flex flex-between cars-type"
            :class="{ current: cars_lease_id == item.carsLeaseTypeId }"
            @click="cars_lease(item.carsLeaseTypeId)"
          >
            <span>{{ item.carsLeaseTypeName }}</span>
            <span>￥{{ item.price }}</span>
          </li>
        </ul>
        <div class="success flex flex-between">
          <span>参保《全面保障服务》用车更放心</span>
          <span class="confirm"></span>
        </div>
      </div>
      <div class="btn" @click="confirm">预约用车</div>
    </section>
  </div>
</template>

<script>
import { getCarsAttrKry } from '@/utils/format';
//api
import { GetLease, ConfirmCars } from '@/api/cars';
export default {
  name: 'Carlist',
  data() {
    return {
      detailedHeight: '',
      cars_detailed: false,
      timer: null,
      lease_data: [],
      cars_lease_id: '',
      back_key: '',
      token: this.$store.state.account.token,
      alert_msg: {
        check_real_name: {
          msg: '您未实名认证，请先实名认证',
          router: 'Safe',
          type: 'identity',
        },
        check_cars: {
          msg: '您未上传驾驶证，请先上传驾驶证，审核通过后便可租车',
          router: 'Safe',
          type: 'drive',
        },
        gilding: {
          msg: '您还没交压金，请先压金哦',
          type: 'gilding',
          router: 'Recharge',
        },
        illegalAmount: {
          msg: '您的预缴违章金额小于200元，请先预缴违章金额',
          type: 'illegal',
          router: 'Recharge',
        },
        blank: {
          msg: '请先绑定银行卡',
          router: 'Safe',
          type: 'bank',
        },
      },
    };
  },
  filters: {
    countKm(value) {
      let result = parseInt(value / 10);
      return `active-li-${result}`;
    },
    engterType(value) {
      return getCarsAttrKry({
        data: value,
        parent: 'basics',
        children: 'energy_type',
      });
    },
    seat(value) {
      return getCarsAttrKry({
        data: value,
        parent: 'basics',
        children: 'seat',
      });
    },
  },
  methods: {
    confirm() {
      if (!this.token) {
        this.$confirm('用戶未登錄，是否登錄', '提示', {
          confirmButtonText: '确定',
          cancelButtonText: '取消',
          type: 'warning',
        }).then(() => {
          this.$router.push({
            path: '/login',
          });
        });
      } else {
        this.confirm_cars();
      }
    },
    // 预约用车
    confirm_cars() {
      const requestData = {
        cars_id: this.data.id,
        cars_lease_type_id: this.cars_lease_id,
      };
      ConfirmCars(requestData).then((res) => {
        console.log(res);
        const data = res.data;
        if (
          !data.check_real_name ||
          !data.check_cars ||
          !data.gilding ||
          !data.illegalAmount
        ) {
          let msg = '';
          let key = Object.keys(data);
          if (key && key.length > 0) {
            this.back_key = key[0];
            let message = this.alert_msg[key[0]].msg;
            message && (msg = message);
          }
          this.$confirm(msg, '提示', {
            confirmButtonText: '确定',
            cancelButtonText: '取消',
            type: 'warning',
          })
            .then(() => {
              this.$router.push({
                name: this.alert_msg[this.back_key].router,
                query: {
                  type: this.alert_msg[this.back_key].type,
                },
              });
            })
            .catch(() => {
              this.$message.info('已取消');
            });
        }
      });
    },
    cars_lease(item) {
      this.cars_lease_id = item;
    },
    get_lease() {
      GetLease({ carsId: this.data.id }).then((res) => {
        const data = res.data.data;
        if (data) {
          this.lease_data = res.data.data;
        }
      });
    },
    show_cars_info() {
      this.get_lease();
      const viewHeight =
        document.documentElement.clientHeight || document.body.clientHeight;
      const height = viewHeight - 145;
      this.cars_detailed = true;
      if (this.timer) {
        this.timer = null;
      }
      this.timer = setTimeout(() => {
        this.detailedHeight = `${height}px`;
        this.timer = null;
      }, 1);
    },
    close_cars_info() {
      this.cars_detailed = false;
      this.detailedHeight = '0';
    },
  },
  props: {
    data: {
      type: Object,
      default: () => ({}),
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
