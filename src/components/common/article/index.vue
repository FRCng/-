<template>
  <van-cell id="article" @click="handleDetailed">
    <div class="article-wrap">
      <!-- 标题 -->
      <div slot="title" class="custom-title">
        <span>{{ article.title }}</span>
      </div>
      <!-- 简介 -->
      <div slot="label">
        <span class="desc">{{ article.aut_name }}</span>
        <span class="desc">{{ article.collect_count }}评论</span>
        <span class="desc">{{ article.pubdate | relativeTime }}</span>
      </div>
    </div>
    <div v-if="article.cover.type == 1" slot="default">
      <van-image
        width="116"
        height="73"
        v-lazy="article.cover.images[0]"
        fit="cover"
        :src="article.cover.images[0]"
      />
    </div>
  </van-cell>
</template>

<script>
export default {
  name: 'Article',
  data() {
    return {};
  },
  props: {
    article: {
      type: Object,
      default: () => ({}),
    },
  },
  methods: {
    handleDetailed() {
      this.$router.push({
        path: '/detailed',
        query: { id: this.article.art_id },
      });
    },
  },
};
</script>

<style lang="scss" scoped>
#article {
  .article-wrap {
    display: flex;
    flex-direction: column;
    justify-content: space-between;
  }
  > .van-cell__value--alone {
    display: flex;
    justify-content: space-between;
  }
  > .van-cell__value {
    flex: unset;
  }
  .custom-title {
    padding-left: 17px;
    font-size: 16px;
    color: #3a3a3a;
  }
  .desc {
    display: inline-block;
    font-size: 12px;
    color: #b4b4b4;
    line-height: 26px;
    &:first-child {
      margin-left: 16px;
    }
    &:not(last-child) {
      margin-right: 16px;
    }
  }
}
</style>
