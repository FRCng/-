<template>
  <el-form-item
    prop="username"
    :rules="[{ validator: validate_username, trigger: 'blur' }]"
  >
    <el-input
      v-model="username"
      :placeholder="placeholder"
      v-on:input="entetInput"
      minlength="6"
      maxlength="11"
    ></el-input>
  </el-form-item>
</template>

<script>
import { validate_phone } from '@/utils/validate';
export default {
  name: 'User',
  data() {
    return {
      username: '',
    };
  },
  props: {
    placeholder: {
      type: String,
      default: '用户名',
    },
  },
  methods: {
    validate_username(value, rule, callback) {
      if (!this.username || this.username == '') {
        return callback(new Error('请输入用户名'));
      } else if (!validate_phone(this.username)) {
        return callback(new Error('请输入11位的数字'));
      } else {
        return callback();
      }
    },
    entetInput() {
      const username = validate_phone(this.username);
      let value = username ? this.username : '';
      this.$emit('update:value', value);
    },
  },
};
</script>

<style lang="" scoped></style>
