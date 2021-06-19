<template>
  <div>
    <van-cell title="搜索历史">
      <div slot="default">
        <span @click="delAll">全部删除</span><span>完成</span>
      </div>
    </van-cell>
    <template v-for="(item, index) in list">
      <van-cell>
        <div slot="title">
          {{ item }}
        </div>
        <div slot="right-icon">
          <van-icon name="search" class="close-icon" @click="del(index)" />
        </div> </van-cell
    ></template>
  </div>
</template>

<script>
import { GetHistory, DelHistory } from '@/api/search';
export default {
  name: 'History',
  data() {
    return {
      list: [],
    };
  },
  props: {
    history_value: {
      type: Array,
      default: () => [],
    },
  },
  beforeMount() {
    this.get_history();
  },
  methods: {
    delAll() {
      DelHistory().then((res) => {
        console.log(res);
      });
    },
    del(data) {
      this.history_value.splice(data, 1);
    },
    get_history() {
      GetHistory().then((res) => {
        const data = res.data.data;
        if (data && data.keywords.length > 0) {
          this.list.unshift(...data.keywords);
        }
      });
    },
  },
  watch: {
    history_value: {
      handler(value) {
        console.log('6666');
        console.log(value);
        this.list.unshift(...value);
      },
      immediate: true,
    },
  },
};
</script>

<style lang="" scoped></style>
