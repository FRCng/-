<template>
  <div>
    <form action="/">
      <van-search
        v-model="value"
        show-action
        placeholder="请输入搜索关键词"
        @input="handler_input"
        @focus="handler_focus"
        @search="onSearch"
        @cancel="onCancel"
        @clear="clear"
      />
    </form>
    <!-- 联想搜索 -->
    <Lenovo
      v-if="show_suggestion"
      :suggestion="suggestion"
      @search="search_result"
    />
    <!-- 搜索结果 -->
    <Result v-else-if="lenovo_text" :result="result_value" />
    <!-- 历史记录 -->
    <History v-else :history_value="history_value" />
  </div>
</template>

<script>
//组件
import History from './components/history';
import Lenovo from './components/lenovo';
import Result from './components/result';
export default {
  name: 'Search',
  components: { Result, History, Lenovo },
  data() {
    return {
      value: '',
      suggestion: '',
      show_suggestion: false,
      lenovo_text: false,
      result_value: '',
      history_value: [],
    };
  },
  methods: {
    clear() {
      this.show_suggestion = false;
      this.lenovo_text = false;
    },
    search_result(data) {
      console.log(data);
      this.lenovo_text = true;
      this.result_value = data;
      this.show_suggestion = false;
    },
    handler_focus() {
      this.show_suggestion = true;
    },
    handler_input(value) {
      this.suggestion = value;
      this.lenovo_text = value;
      const index = this.history_value.indexOf(value);
      if (index == -1) {
        this.history_value.unshift(value);
      } else {
        this.history_value.splice(index, 1);
      }
    },
    onSearch(val) {
      this.lenovo_text = true;
      this.result_value = val;
      this.show_suggestion = false;
    },
    onCancel() {
      this.$router.back();
    },
  },
};
</script>

<style lang="" scoped></style>
