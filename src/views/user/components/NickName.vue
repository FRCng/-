<template>
  <div>
    <van-nav-bar
      title="个人信息"
      left-arrow
      right-text="保存"
      @click-left="onClickLeft"
      @click-right="onClickRight"
    />
    <van-field
      v-model="message"
      rows="2"
      autosize
      label="昵称"
      type="textarea"
      maxlength="10"
      placeholder="请输入昵称"
      show-word-limit
    />
  </div>
</template>

<script>
import { EditUser } from '@/api/user';
export default {
  name: 'NickName',
  data() {
    return { message: this.name };
  },
  props: {
    name: {
      type: String,
      default: '',
    },
  },
  methods: {
    onClickLeft() {
      this.$router.back();
    },
    onClickRight() {
      EditUser({ name: this.message }).then((res) => {
        console.log(res);
        const data = res.data.data;
        if (data) {
          this.$toast.success('修改成功');
          this.$emit('update:name', data.name);
          this.$emit('close', { type: 'nickName' });
        }
      });
    },
  },
};
</script>

<style lang="" scoped></style>
