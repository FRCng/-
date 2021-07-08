<template>
  <div class="cars-wrap" v-if="CarsList.length > 0">
    <div class="cars-swiper">
      <swiper class="swiper" ref="mySwiper" :options="swiperOption">
        <swiper-slide v-for="item in CarsList" :key="item.id"
          ><CarsItem :data="item" />
        </swiper-slide>
      </swiper>
      <div class="swiper-button-prev" @click="prev" ></div>
      <div class="swiper-button-next" @click="next"></div>
    </div>
    <span @click="user">汽车列表</span>
  </div>
</template>

<script>
import { swiper, swiperSlide } from 'vue-awesome-swiper';
import 'swiper/css/swiper.css';
import CarsItem from './component/index';
//api
import { GetCarsList } from '@/api/cars';
export default {
  name: 'cars',
  components: { swiper, swiperSlide, CarsItem },
  data() {
    return {
      swiperOption: {
        slidesPerView: 3,
        spaceBetween: 15,
        navigation: {
          nextEl: '.swiper-button-next',
          prevEl: '.swiper-button-prev',
        },
      },
      CarsList: [],
    };
  },
  methods: {
    get_cars_list(parkingId) {
      GetCarsList({ parkingId }).then((res) => {
        const data = res.data.data;
        if (data) {
          this.CarsList = data;
        }
        this.$store.commit('carsInfo/SET_CARS_REQUEST_STATE', false);
      });
    },
    prev() {
      this.$refs.mySwiper.swiper.slidePrev();
    },
    next() {
      this.$refs.mySwiper.swiper.slideNext();
    },
    user() {
      this.$router.push({ path: '/user' });
    },
  },
  watch: {
    '$store.state.carsInfo.isClickCarsList': {
      handler(value) {
        if (!value) {
          this.CarsList = [];
        }
        this.$store.commit('carsInfo/SET_CARS_LIST_STATE', true);
      },
    },
  },
};
</script>

<style lang="scss" scoped>
@import './index.scss';
</style>
