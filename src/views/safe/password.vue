<template>
  <div class="user-warp">
    <Back column="修改密码" />
    <div class="cars-form-ui">
      <el-form ref="form" :model="form">
        <el-form-item>
          <el-input
            v-model="form.oldpassowrd"
            placeholder="原始密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password" placeholder="新密码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-input v-model="form.password2" placeholder="确认密码"></el-input>
        </el-form-item>
        <el-form-item>
          <button type="button" class="ps-button">获取验证码</button>
          <el-input v-model="form.code" placeholder="验证码"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary">立即创建</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>

<script>
export default {
  name: 'password',
  data() {
    return {
      form: {
        oldpassowrd: '',
        password: '',
        password2: '',
        code: '',
      },
    };
  },
};
</script>

<style lang="scss" scoped></style>
