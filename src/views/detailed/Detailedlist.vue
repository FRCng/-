<template>
  <div>
    <van-list
      v-model="loading"
      :finished="finished"
      finished-text="没有更多了"
      @load="get_news_detailed"
    >
      <h1 class="title article-title fz20 l-h32">{{ article.title }}</h1>
      <van-cell>
        <!-- 使用 title 插槽来自定义标题 -->
        <div slot="icon">
          <van-image width="35" height="35" round :src="article.aut_photo" />
        </div>
        <div slot="title">{{ article.aut_name }}</div>
        <div slot="label">{{ article.pubdate | relativeTime }}</div>
        <div slot="right-icon">
          <van-button
            :type="article.is_followed ? 'primary' : 'default'"
            round
            :icon="article.is_followed ? '' : 'plus'"
            @click="handle_followed"
          >{{ article.is_followed ? '已关注' : '关注' }}</van-button>
        </div>
      </van-cell>
      <div class="markdown-body" ref="article-info" v-html="article.content"></div>
      <!-- 评论 -->
      <Comment :id="id" />
    </van-list>
  </div>
</template>

<script>
import Comment from './components/comments';
//api
import { Followings, Cancel } from '@/api/user';
import { GetDetailed } from '@/api/news';
import { ImagePreview } from 'vant';
export default {
  name: 'List',
  components: { Comment },
  props: {
    id: '',
    required: true,
  },
  data() {
    return {
      list: [],
      loading: false,
      finished: false,
      article: {},
    };
  },
  methods: {
    //获取文章详情
    get_news_detailed() {
      GetDetailed(this.id).then((res) => {
        if (res.data.data) {
          this.article = res.data.data;
          this.$nextTick(() => {
            const article_detailed = this.$refs['article-info'];
            const Imgs = article_detailed.querySelectorAll('img');
            let Imgsrc = [];
            Imgs.forEach((item) => {
              Imgsrc.push(item.src);
              item.onclick = function () {
                ImagePreview({
                  images: Imgsrc,
                  startPosition: 0,
                  closeable: true,
                });
              };
            });
          });
          this.finished = false;
        } else {
          this.finished = true;
        }
      });
    },
    // 用户关注
    handle_followed() {
      if (this.article.is_followed) {
        Cancel(this.article.aut_id).then((res) => {
          this.$toast.fail('已取消');
        });
      } else {
        Followings(this.article.aut_id).then((res) => {
          this.$toast.success('关注成功');
        });
      }
    },
    onLoad() {},
  },
};
</script>

<style lang="" scoped></style>
