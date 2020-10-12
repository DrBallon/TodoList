<template>
  <el-row class="logout">
    <el-col :span="24">
      <el-avatar :src="avatar">
        <img src="@/assets/images/default.png" />
      </el-avatar>
      <!-- <el-upload
        class="avatar-uploader"
        action="https://jsonplaceholder.typicode.com/posts/"
        :show-file-list="false"
        :on-success="handleAvatarSuccess"
        :before-upload="beforeAvatarUpload"
      >
        <img v-if="imageUrl" :src="imageUrl" class="avatar" />
        <i v-else class="el-icon-plus avatar-uploader-icon"></i>
      </el-upload> -->
    </el-col>
    <el-col :span="24">
      <el-button type="primary">修改</el-button>
    </el-col>
    <el-col :span="24">
      <el-button type="primary" @click.native="logout">退出</el-button>
    </el-col>
  </el-row>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Form } from 'element-ui';
import { ElUploadInternalFileDetail } from 'element-ui/types/upload';
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
  private imageUrl = '';
  logout() {
    http.logout().then((res) => {
      if (res.status == 200) {
        this.$emit('success');
      }
    });
  }
  handleAvatarSuccess(res: void, file: ElUploadInternalFileDetail) {
    this.imageUrl = URL.createObjectURL(file.raw);
  }
  beforeAvatarUpload(file: File) {
    const isJPG = file.type === 'image/jpeg';
    const isLt2M = file.size / 1024 / 1024 < 2;

    if (!isJPG) {
      this.$message.error('上传头像图片只能是 JPG 格式!');
    }
    if (!isLt2M) {
      this.$message.error('上传头像图片大小不能超过 2MB!');
    }
    return isJPG && isLt2M;
  }
}
</script>
<style lang="scss">
.logout {
  .el-col {
    text-align: center;
    padding: 0 10rem;
    button {
      width: 100%;
      &:nth-child(1) {
        margin-top: 1rem;
      }
    }
    .el-avatar {
      width: 12rem;
      height: 12rem;
    }
    &:nth-child(1) {
      height: 12rem;
    }
  }
}
</style>
