<template>
  <div class="background">
    <div class="panel">
      <i class="close el-icon-close" @click="close" v-if="panelType != 0"></i>
      <!-- 登录 -->
      <el-form
        class="login"
        v-if="panelType == 0"
        ref="loginForm"
        label-position="top"
        :model="loginForm"
        :rules="loginRules"
        label-width="80px"
      >
        <div class="close"></div>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="loginForm.username"></el-input>
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input type="password" v-model="loginForm.password"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit">登录</el-button>
          <el-button type="primary" @click="changePanelType(2)">注册</el-button>
        </el-form-item>
      </el-form>
      <!-- 登出框 -->
      <el-row v-if="panelType == 1" class="logout">
        <el-col :span="8" :offset="8">
          <el-button type="primary" @click.native="logout">退出</el-button>
        </el-col>
      </el-row>
      <el-form
        class="register"
        v-if="panelType == 2"
        ref="regForm"
        label-position="top"
        :model="regForm"
        :rules="regRules"
        label-width="80px"
      >
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
          <el-button type="primary" @click="changePanelType(0)">返回登录</el-button>
        </el-form-item>
      </el-form>
    </div>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { Form } from 'element-ui';
import http from '@/store/api';
@Component
export default class Panel extends Vue {
  private loginForm = {
    username: '',
    password: '',
  };
  private regForm = {
    username: '',
    password: '',
    password2: '',
  };
  private validatePass2 = (rule: any, value: string, callback: (err?: Error) => void) => {
    console.log(value);
    if (value === '') {
      callback(new Error('请再次输入密码'));
    } else if (value !== this.regForm.password) {
      callback(new Error('两次输入密码不一致!'));
    } else {
      callback();
    }
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
  get panelType() {
    return this.$store.getters.panelConfig.panelType || 0;
  }
  close() {
    this.$store.dispatch('togglePanel', false);
    this.$emit('close');
  }
  //0登录，1退出，2注册
  changePanelType(type: number) {
    this.$store.dispatch('changePanelType', type);
    if (type == 0) {
      this.$nextTick(() => {
        // (this.$refs['loginForm'] as Form).clearValidate();
        (this.$refs['loginForm'] as Form).resetFields();
      });
    } else if (type == 2) {
      this.$nextTick(() => {
        // (this.$refs['regForm'] as Form).clearValidate();
        (this.$refs['regForm'] as Form).resetFields();
      });
    }
  }

  async logout() {
    console.log('logout');
    http.logout().then((res) => {
      if (res.status == 200) {
        this.$emit('close', 1);
      }
    });
  }
  async onRegister() {
    (this.$refs['regForm'] as Form).validate(async (valid) => {
      if (valid) {
        const submitRet = await http.register(this.regForm);
        if (submitRet.status == 200) {
          // alert('登录')
          this.$message.success('注册成功');
          this.changePanelType(0);
        } else {
          this.$message.success('注册失败');
        }
      } else {
        this.$message.error('表单校验未通过');
        return false;
      }
    });
  }
  async onSubmit() {
    (this.$refs['loginForm'] as Form).validate(async (valid) => {
      if (valid) {
        const submitRet = await http.login(this.loginForm);
        if (submitRet.status == 200) {
          this.$store.dispatch('togglePanel', false);
          this.$emit('close', 0);
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
<style lang="scss" scoped>
@import '~assets/styles/base';
.background {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
  .panel {
    position: absolute;
    top: 50%;
    width: 600px;
    left: 50%;
    transform: translate(-50%, -50%);
    padding: 3rem;
    padding-top: 4rem;
    background-color: $theme-color-gray;
    border: 0.5rem solid $theme-color-dark;
    box-sizing: border-box;
    border-radius: 1rem;
    .close {
      font-size: 3rem;
      position: absolute;
      top: 1rem;
      right: 1rem;
    }
  }
}
@media screen and (max-width: 768px) {
  .background {
    .panel {
      width: 100%;
    }
  }
}
</style>
<style lang="scss">
.panel {
  .login,
  .register {
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
  .logout {
    .el-col {
      button {
        width: 100%;
      }
    }
  }
}
</style>
