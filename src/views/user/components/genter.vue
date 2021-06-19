<template>
  <van-picker
    title="标题"
    show-toolbar
    :defaultIndex="defaultIndex"
    :columns="columns"
    @confirm="onConfirm"
    @cancel="onCancel"
    @change="onChange"
  >
  </van-picker>
</template>

<script>
import { EditUser } from '@/api/user';
export default {
  name: 'Gender',
  data() {
    return {
      columns: ['男', '女'],
      defaultIndex: this.gender,
    };
  },
  props: {
    gender: {
      type: Number,
      default: '',
    },
  },
  mounted() {
    console.log(this.gender);
  },
  methods: {
    onConfirm(value, index) {
      console.log(this.defaultIndex);
      EditUser({ gender: this.defaultIndex }).then((res) => {
        const data = res.data.data;
        if (data) {
          console.log(data.id);
          this.$toast.success('修改成功');
          this.$emit('update:gender', this.defaultIndex);
          this.$emit('close', { type: 'gender' });
        }
      });
    },
    onChange(picker, value, index) {
      this.defaultIndex = index;
    },
    onCancel() {
      this.$emit('close', { type: 'gender' });
    },
  },
  watch: {},
};
</script>

<style lang="" scoped></style>
