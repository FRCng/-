<template>
  <div>
    <van-list v-model="loading" :finished="finished" finished-text="没有更多了" @load="onLoad">
      <van-cell v-for="(item, index) in list" :key="index" @click="handlerClick">
        <div slot="title">{{ item.title }}</div>
      </van-cell>
    </van-list>
  </div>
</template>

<script>
import { GetSearchResult } from '@/api/search';
export default {
  name: 'Result',
  data() {
    return { list: [], loading: false, finished: false, page: 1, per_page: 10 };
  },
  props: {
    result: {
      type: String,
      default: '',
    },
  },
  methods: {
    handlerClick(){
      console.log('object');
      this.$router.push({
        name:"detailed",
        query:{
          id:this.list.art_id
        }
      })
    },
    onLoad() {
      this.get_result();
    },
    get_result() {
      const requestData = {
        page: this.page ? 1 : this.page++,
        per_page: this.per_page,
        q: this.result,
      };
      GetSearchResult(requestData).then((res) => {
        const data = res.data.data;
        if (data && data.results.length > 0) {
          this.list.unshift(...data.results);
        }
        if (data.results.length == 0) {
          this.finished = true;
        }
      });
      this.loading = false;
    },
  },
  watch: {
    result: {
      handler(value) {
        if (value) {
          this.onLoad();
        }
      },
    },
  },
};
</script>

<style lang="" scoped></style>
