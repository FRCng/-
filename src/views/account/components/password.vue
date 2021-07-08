<template>
  <el-form-item
    id="password"
    prop="password"
    :rules="[{ validator: validatorPassword, trigger: 'blur' }]"
  >
    <el-input
      v-model="password"
      placeholder="新密码"
      v-on:input="entetInput"
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_password } from '@/utils/validate';
export default {
  data() {
    return {
      password: '',
    };
  },
  props: {
    confirm: {
      type: String,
      default: '',
    },
  },
  methods: {
    entetInput() {
      if (validate_password(this.password)) {
        this.$emit('update:value', this.password);
      }
    },
    validatorPassword(rule, value, callback) {
      if (!this.password || this.password == '') {
        return callback(new Error('请输入密码'));
      } else if (!validate_password(this.password)) {
        return callback(new Error('请输入6-20为的数字+英文'));
      } else if (this.confirm && this.password != this.confirm) {
        return callback(new Error('两次密码不一致'));
      } else {
        return callback();
      }
    },
  },
  watch: {
    confirm: {
      handler(value) {
        if (value && value == this.password) {
          const password = document
            .getElementById('password')
            .querySelector('.el-form-item__error');
          password.style.display = 'none';
        }
      },
    },
  },
};
</script>

<style lang="" scoped></style>
