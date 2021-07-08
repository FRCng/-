<template>
  <el-form-item
    prop="code"
    :rules="[{ validator: validator_code, trigger: 'blur' }]"
  >
    <button
      type="button"
      @click="handlercode"
      class="ps-button"
      :disabled="disabled"
    >
      {{ code_text }}
    </button>
    <el-input
      v-model="code"
      placeholder="验证码"
      maxlength="6"
      minlength="6"
      v-on:input="engter"
    ></el-input>
  </el-form-item>
</template>

<script>
export default {
  name: 'Code',
  data() {
    return {
      code: '',
      disabled: true,
      timer: null,
      code_text: '获取验证码',
    };
  },
  props: {
    username: {
      type: String,
      default: '',
    },
  },
  methods: {
    //验证规则
    validator_code(rule, value, callback) {
      if (!this.code || this.code == '') {
        return callback(new Error('请输入验证码'));
      } else {
        return callback();
      }
    },
    engter() {
      if (this.code && this.code !== '') {
        this.$emit('update:value', this.code);
      }
    },
    //倒计时
    handlercode() {
      this.$store
        .dispatch('account/getcode', {
          username: this.username,
          module: 'register',
        })
        .then((res) => {
          this.$message.success(res.message);
          let data = res.message.split('：');
          this.code = data[1];
          console.log(this.code);
          this.$emit('update:value', this.code);
        });
      let count = 10;
      this.code_text = `倒计时${count}秒`;
      this.disabled = true;
      if (this.timer) {
        clearInterval(this.timer);
      }
      this.timer = setInterval(() => {
        count--;
        this.code_text = `倒计时${count}秒`;
        if (count <= 0) {
          this.disabled = false;
          this.code_text = '重新获取验证码';
          clearInterval(this.timer);
        }
      }, 1000);
    },
  },
  watch: {
    username: {
      handler(value) {
        if (value != '') {
          this.disabled = false;
        }
      },
    },
  },
};
</script>

<style lang="" scoped></style>
