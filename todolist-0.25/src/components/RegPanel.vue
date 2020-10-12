<template>
  <el-form class="register" ref="regForm" label-position="top" :model="regForm" :rules="regRules" label-width="80px">
    <div class="close" />
    <el-form-item label="用户名" prop="username">
      <el-input v-model="regForm.username"></el-input>
    </el-form-item>
    <el-form-item label="密码" prop="password">
      <el-input type="password" v-model="regForm.password"></el-input>
    </el-form-item>
    <div>
      <el-form-item label="确认密码" prop="password2">
        <el-input type="password" v-model="regForm.password2"></el-input>
      </el-form-item>
    </div>
    <el-form-item>
      <el-button type="primary" @click="onRegister">注册</el-button>
      <el-button type="primary" @click="toLoginPanel">返回登录</el-button>
    </el-form-item>
  </el-form>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';
import http from '@/store/api';

@Component({
  name: 'RegPanel',
})
export default class RegPanel extends Vue {
  private regForm = {
    username: '',
    password: '',
    password2: '',
  };
  private validatePass2 = (rule: {}, value: string, callback: (err?: Error) => void) => {
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.regForm.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
  };
  private regRules = {
    username: [
      { required: true, message: '请输入账号', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    password: [
      { required: true, message: '请输入密码', trigger: 'blur' },
      { min: 3, max: 5, message: '长度在 3 到 5 个字符', trigger: 'blur' },
    ],
    password2: [
      {
        validator: this.validatePass2,
        trigger: 'blur',
      },
    ],
  };
  toLoginPanel() {
    this.$store.dispatch('changePanelType', 0);
  }
  async onRegister() {
    (this.$refs['regForm'] as Form).validate(async (valid) => {
      if (valid) {
        const submitRet = await http.register(this.regForm);
        if (submitRet.status == 200) {
          this.$message.success('注册成功');
          this.toLoginPanel();
        } else {
          this.$message.success('注册失败');
        }
      } else {
        this.$message.error('表单校验未通过');
        return false;
      }
    });
  }
}
</script>
<style lang="scss" scoped></style>
<style lang="scss"></style>
