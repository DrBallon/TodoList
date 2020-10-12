<template>
  <el-form class="login" ref="loginForm" label-position="top" :model="loginForm" :rules="loginRules" label-width="80px">
    <div class="close"></div>
    <el-form-item label="用户名" prop="username">
      <el-input v-model="loginForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="loginForm.password"></el-input>
    </el-form-item>
    <el-form-item>
      <el-button type="primary" @click="onSubmit">登录</el-button>
      <el-button type="primary" @click="toRegPanel">注册</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';
import http from '@/store/api';

@Component({
  name: 'LoginPanel',
})
export default class LoginPanel extends Vue {
  private loginForm = {
    username: '',
    password: '',
  };
  private loginRules = {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
  };
  toRegPanel() {
    this.$store.dispatch('changePanelType', 2);
  }
  async onSubmit() {
    (this.$refs['loginForm'] as Form).validate(async (valid) => {
      if (valid) {
        const submitRet = await http.login(this.loginForm);
        if (submitRet.status == 200) {
          this.$store.dispatch('togglePanel', false);
          console.log('登陆成功');
          this.$emit('success');
          // this.$emit('close', 0);
          // this.$emit('success');
        } else {
          alert('登录失败');
        }
      } else {
        this.$message.error('表单校验未通过');
        return false;
      }
    });
  }
}
</script>
<style lang="scss">
.login {
  .el-form-item {
    margin-bottom: 2rem;
    .el-form-item__label {
      line-height: 3rem;
      font-size: 1.5rem;
      padding: 0;
    }
    button {
      width: 48%;
      &:nth-child(2) {
        margin-left: 4%;
      }
    }
  }
}
</style>
