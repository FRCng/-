<template>
  <div></div>
</template>

<script>
import { GetComments } from '@/api/news';
export default {
  name: 'Comments',
  data() {
    return {
      offset: null,
      pageNumber: 10,
    };
  },
  props: {
    id: { type: [Number, String, Object], requied: true },
  },
  beforeMount() {
    this.get_comments();
  },
  methods: {
    get_comments() {},
  },
};
</script>

<style lang="" scoped></style>
