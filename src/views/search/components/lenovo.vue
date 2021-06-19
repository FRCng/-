<template>
  <div>
    <template v-for="(item, index) in list">
      <van-cell :key="index" @click="handler_suggestion(item)">
        <div slot="title" v-html="highlight(item)"></div>
        <div slot="right-icon">
          <van-icon name="search" class="close-icon" />
        </div>
      </van-cell>
    </template>
  </div>
</template>

<script>
import { debounce } from '@/utils/debounce';
//api
import { GetSuggestion } from '@/api/search';
export default {
  name: 'suggestion',
  data() {
    return {
      list: [],
    };
  },
  props: {
    suggestion: {
      type: String,
      default: '',
    },
  },
  methods: {
    handler_suggestion(data) {
      this.$emit('search', data);
    },
    //高亮文本
    highlight(str) {
      return str.replace(
        new RegExp(this.suggestion, 'gi'),
        `<span style="color:red">${this.suggestion}</span>`
      );
    },
    //接口
    get_suggestion(value) {
      GetSuggestion(value).then((res) => {
        const data = res.data.data.options;
        if (data && data.length != 0) {
          this.list = data;
        }
      });
    },
  },
  watch: {
    suggestion: {
      handler(value) {
        if (value) {
          this.get_suggestion(value);
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="" scoped></style>
