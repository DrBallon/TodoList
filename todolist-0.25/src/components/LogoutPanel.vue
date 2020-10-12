<template>
  <div class="logout">
    <el-row>
      <el-col :span="24">
        <el-upload class="avatar-uploader" action="/api/avatar" :show-file-list="false" :http-request="upload">
          <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        </el-upload>
      </el-col>
    </el-row>
    <el-row>
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
import { HttpRequestOptions, ElUploadInternalFileDetail } from 'element-ui/types/upload';
import http from '@/store/api';
const LogoutPanelProps = Vue.extend({
  props: {
    avatar: String,
  },
});
@Component({
  name: 'LogoutPanel',
})
export default class LogoutPanel extends LogoutPanelProps {
  private imageUrl = this.avatar;
  private tempName = '';
  logout() {
    http.logout().then((res) => {
      if (res.status == 200) {
        this.$emit('success');
      }
    });
  }
  resetAvatar() {
    // console.log('resetAvatar');
    this.imageUrl = this.avatar;
  }
  appyleAvatar() {
    if (this.tempName == '') return;
    console.log(this.tempName);
    http
      .setAvatar(this.tempName)
      .then((ret) => {
        console.log(ret);
        if (ret.status == 200) {
          //
        }
      })
      .catch((err) => {
        console.log(err);
      });
  }
  upload(req: HttpRequestOptions) {
    const formData = new FormData();
    formData.append('file', req.file);
    http
      .post('/upload', formData)
      .then((ret) => {
        console.log(ret.data.data);
        this.imageUrl = ret.data.data.src;
        this.tempName = ret.data.data.filename;
      })
      .catch((err) => {
        console.log('err:', err);
      });
  }
}
</script>
<style lang="scss">
.logout {
  .el-row {
    padding: 0 10rem;
    &:nth-child(1) {
      height: 12rem;
    }
    .el-col {
      text-align: center;
      button {
        width: 100%;
        &:nth-child(1) {
          margin-top: 1rem;
        }
      }
      .avatar-uploader {
        height: 12rem;
        .el-upload {
          border-radius: 50%;
          cursor: pointer;
          position: relative;
          overflow: hidden;
        }
        .avatar {
          width: 12rem;
          height: 12rem;
          display: block;
          transition: all 0.2s;
          &:hover {
            transform: scale(1.1);
          }
        }
      }
    }
  }
}
</style>
