<template>
  <div class="title">
    <el-row class="center">
      <el-col :xs="24" :sm="12"><h1>TodoList</h1></el-col>
      <el-col :xs="{ span: 18, offset: 2 }" :sm="10">
        <el-input id="add-todo" v-model="content" placeholder="添加Todo">
          <el-button slot="append" icon="el-icon-plus" @click="add"></el-button>
        </el-input>
      </el-col>
      <el-col :xs="{ span: 2, offset: 1 }" :sm="2">
        <slot>
          <!-- <el-avatar :src="avatar" class="avatar" @click.native="openPanel">
            <img src="@/assets/images/default.png" /> </el-avatar
        > -->
        </slot>
      </el-col>
    </el-row>
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
const TitleProps = Vue.extend({
  props: {
    avatar: String,
  },
});
@Component({
  name: 'Title',
})
export default class Title extends TitleProps {
  private content = '';
  add() {
    if (this.content == '' || this.content.trim() == '') return;
    this.$store.dispatch('addItem', this.content);
    this.content = '';
  }
  openPanel() {
    this.$store.dispatch('togglePanel', true);
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/base';

.title {
  width: 100%;
  height: $title-height;
  background-color: $theme-color-dark;
  .center {
    margin: 0 auto;
    width: $inner-width;
    font-size: 0;
    z-index: 99;
    .avatar {
      width: 4rem;
      height: 4rem;
      font-size: 4rem;
      margin-top: 0.5rem;
    }
    h1 {
      line-height: 5rem;
      font-size: 2.5rem;
      margin-left: 3rem;
      color: #fff;
      user-select: none;
    }
  }
}

@media screen and (max-width: 768px) {
  .title {
    height: $title-height * 2;
    .center {
      width: 100%;
      font-size: 0;
      z-index: 99;
      h1 {
        text-align: center;
        margin: 0;
      }
    }
  }
}
</style>
<style lang="scss">
@import '~assets/styles/base';
.title {
  .el-col {
    height: $title-height;
    .el-input {
      margin-top: 0.5rem;
      input {
        height: 4rem;
        font-size: 2rem;
      }
    }
    .el-avatar {
      img {
        transition: all 0.5s;
      }
      img:hover {
        //用这两行，先横向变大，再纵向变大，效果贼骚
        // width: 110%;
        // height: 110%;
        transform: scale(1.1);
      }
    }
  }
}
</style>
