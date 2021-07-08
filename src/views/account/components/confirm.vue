<template>
  <el-form-item
    id="confirm"
    prop="confirm_password"
    :rules="[{ validator: validator_password, trigger: 'blur' }]"
  >
    <el-input
      v-model="confirm_password"
      placeholder="确认密码"
      v-on:input="engter"
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_password } from '@/utils/validate';
export default {
  data() {
    return {
      confirm_password: '',
    };
  },
  props: {
    password: {
      type: String,
      default: '',
    },
  },
  methods: {
    validator_password(rule, value, callback) {
      console.log(this.confirm_password);
      if (!this.confirm_password || this.confirm_password == '') {
        return callback(new Error('请再次输入密码'));
      } else if (!validate_password(this.confirm_password)) {
        return callback(new Error('请输入6-20位的数字+英文'));
      } else if (this.confirm_password != this.password) {
        return callback(new Error('两次密码不一致'));
      } else {
        return callback();
      }
    },
    engter() {
      const result = validate_password(this.confirm_password);
      let value = result ? this.confirm_password : '';
      this.$emit('update:value', this.confirm_password);
    },
  },
  watch: {
    password: {
      handler(value) {
        if (value && value == this.confirm_password) {
          const el = document
            .getElementById('confirm')
            .querySelector('.el-form-item__error');
          el.style.display = 'none';
        }
      },
    },
  },
};
</script>

<style lang="" scoped></style>
