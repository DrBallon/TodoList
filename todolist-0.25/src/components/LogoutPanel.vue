<template>
  <div class="logout">
    <i class="close el-icon-close" @click="close"></i>
    <el-row type="flex" justify="center">
      <el-tooltip class="tip" effect="dark" content="点击修改头像" placement="top">
        <el-upload class="avatar-uploader" action="/api/avatar" :show-file-list="false" :http-request="upload">
          <img :src="tempPath || getAvatar" class="avatar" />
        </el-upload>
      </el-tooltip>
    </el-row>
    <el-row v-if="tempName">
      <el-col :span="10">
        <el-button type="primary" @click="resetAvatar">还原</el-button>
      </el-col>
      <el-col :span="10" :offset="4">
        <el-button type="primary" @click="appyleAvatar">修改</el-button>
      </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-button type="primary" @click.native="logout">退出</el-button>
      </el-col>
    </el-row>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { HttpRequestOptions /* ElUploadInternalFileDetail */ } from 'element-ui/types/upload';
import http from '@/store/api';
@Component({
  name: 'LogoutPanel',
})
export default class LogoutPanel extends Vue {
  private tempName = '';
  private tempPath = '';
  get getAvatar() {
    return this.$store.getters.getAvatar;
  }
  close() {
    this.$store.dispatch('togglePanel', false);
  }
  logout() {
    http.logout().then((res) => {
      if (res.status == 200) {
        this.$emit('success');
      }
    });
  }
  resetAvatar() {
    this.tempName = '';
    this.tempPath = '';
  }
  appyleAvatar() {
    if (this.tempName == '') return;
    this.$store.dispatch('setAvatar', this.tempName);
    this.tempName = '';
  }
  upload(req: HttpRequestOptions) {
    const formData = new FormData();
    formData.append('file', req.file);
    http
      .post('/upload', formData)
      .then((ret) => {
        console.log(ret.data.data);
        // this.imageUrl = ret.data.data.src;
        this.tempPath = ret.data.data.src;
        this.tempName = ret.data.data.filename;
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/base';
.logout {
  @extend .panel;
  top: 15rem;
  .close {
    font-size: 3rem;
    position: absolute;
    top: 1rem;
    right: 1rem;
  }
  .avatar {
    height: 12rem;
    width: 12rem;
    border-radius: 50%;
    text-align: center;
    .tip {
      width: 12rem;
    }
  }
}
</style>
<style lang="scss">
.logout {
  .el-row {
    padding: 0 10rem;
    .el-col {
      button {
        width: 100%;
        &:nth-child(1) {
          margin-top: 1rem;
        }
      }
    }
  }
}
</style>
