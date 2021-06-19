<template>
  <div>
    <van-datetime-picker
      v-model="currentDate"
      type="date"
      title="自定义列排序"
      :columns-order="['month', 'day', 'year']"
      :formatter="formatter"
      @confirm="confirm"
      @change="change"
    />
  </div>
</template>

<script>
import { EditUser } from '@/api/user';
import dayjs from 'dayjs';
export default {
  name: 'Birthday',
  data() {
    return { currentDate: '', format_birthday: '' };
  },
  props: {
    birthday: {
      type: String,
      default: '',
    },
  },
  mounted() {},
  methods: {
    change() {
      this.format_birthday = dayjs(this.currentDate).format('YYYY-MM-DD');
    },
    confirm() {
      EditUser({ birthday: this.format_birthday }).then((res) => {
        const data = res.data.data;
        if (data) {
          this.$toast.success('修改成功');
          console.log(data.birthday);
          this.$emit('update:birthday', data.birthday);
          this.$emit('close', { type: 'birthday' });
        }
      });
    },
    formatter(type, val) {
      if (type === 'year') {
        return val + '年';
      }
      if (type === 'month') {
        return val + '月';
      }
      if (type === 'day') {
        return val + '日';
      }
      return val;
    },
  },
  watch: {
    birthday: {
      handler(value) {
        if (value) {
          this.currentDate = value;
        }
      },
      immediate: true,
    },
  },
};
</script>

<style lang="" scoped></style>
