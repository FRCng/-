<template>
  <van-pull-refresh v-model="isLoading" @refresh="onRefresh" ref="article_list">
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="onLoad"
    >
      <Article v-for="(item, index) in list" :key="index" :article="item" />
    </van-list>
  </van-pull-refresh>
</template>

<script>
//组件
import Article from '@/components/common/article';
import { debounce } from '@/utils/debounce';
//api
import { GetArticles } from '@/api/user';
export default {
  name: 'List',
  components: { Article },
  props: {
    channels: {
      type: Object,
      default: () => ({}),
    },
  },
  data() {
    return {
      isLoading: false,
      list: [],
      loading: false,
      finished: false,
      timestamp: null,
      scrollTop: 0,
    };
  },
  mounted() {
    const article = this.$refs.article_list.$el;
    article.onscroll = debounce(() => {
      this.scrollTop = article.scrollTop;
    }, 50);
  },
  activated() {
    const article = this.$refs.article_list.$el;
    article.scrollTop = this.scrollTop;
  },
  deactivated() {},
  methods: {
    //下拉刷新
    onRefresh() {
      GetArticles({
        channel_id: this.channels.id,
        timestamp: Date.now(),
        with_top: 0,
      })
        .then((Res) => {
          this.isLoading = false;
          const data = Res.data.data;
          if (data && data.length != 0) {
            this.list.unshift(...data.results);
          }
        })
        .catch((err) => (this.isLoading = false));
    },
    //加载数据
    onLoad() {
      GetArticles({
        channel_id: this.channels.id,
        timestamp: this.timestamp || Date.now(),
        with_top: 0,
      }).then((res) => {
        this.loading = false;
        let data = res.data.data;
        if (data.results && data.results.length > 0) {
          this.timestamp = data.pre_timestamp;
          this.list.push(...data.results);
        } else {
          this.finished = true;
        }
      });
    },
  },
};
</script>

<style lang="scss" scoped></style>
