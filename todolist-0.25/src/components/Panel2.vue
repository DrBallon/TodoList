<template>
  <div>
    <transition v-on:before-leave="beforeLeave1" v-on:leave="leave1">
      <el-avatar v-show="!show1" :src="avatar" class="avatar" @click.native="open">
        <img src="@/assets/images/default.png" />
      </el-avatar>
    </transition>
    <!-- <transition v-on:before-enter="beforeEnter2" v-on:enter="enter2"> -->
    <!-- <transition name="slide-fade"> -->
    <div v-show="show2" class="background">
      <div class="panel">
        <i class="close el-icon-close" @click="close" v-if="panelType == 1"></i>
        <LoginPanel v-if="panelType == 0" @success="loginSuccess" />
        <LogoutPanel v-if="panelType == 1" :avatar="avatar" @success="logoutSuccess" />
        <RegPanel v-if="panelType == 2" />
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Form } from 'element-ui';
import http from '@/store/api';
import LoginPanel from './LoginPanel.vue';
import RegPanel from './RegPanel.vue';
import LogoutPanel from './LogoutPanel.vue';
const PanelProps = Vue.extend({
  props: {
    avatar: String,
  },
});
@Component({
  components: {
    LoginPanel,
    RegPanel,
    LogoutPanel,
  },
})
export default class Panel extends PanelProps {
  private show1 = true;
  private show2 = true;
  get panelType() {
    return this.$store.getters.panelConfig.panelType || 0;
  }
  get showPanel() {
    return this.$store.getters.panelConfig.showPanel;
  }
  loginSuccess() {
    this.$emit('close', 0);
  }
  logoutSuccess() {
    this.$emit('close', 1);
  }
  beforeLeave1(el: HTMLElement) {
    function getPos(el: HTMLElement) {
      let offsetTop = el.offsetTop;
      let offsetLeft = el.offsetLeft;
      if (el.offsetParent != null) {
        offsetTop += getPos(el.offsetParent as HTMLElement).top;
        offsetLeft += getPos(el.offsetParent as HTMLElement).left;
      }
      return { top: offsetTop, left: offsetLeft };
    }
    // console.log(getPos(el));
    const pos = getPos(el);
    const targetLeft = window.innerWidth / 2;
    const radius = parseInt(getComputedStyle(document.body, null).fontSize) * 2;
    // console.log('radius:', radius);
    const targetTop = (radius / 2) * (6 + 19.5);
    el.style.top = pos.top + 'px';
    el.style.left = pos.left + 'px';
    el.style.transform = `translate(${targetLeft - pos.left - radius + 'px'},${targetTop -
      pos.top -
      radius +
      'px'}) scale(3,3)`;
    el.style.transition = 'all 0.5s';
    // let opacity = 1;
    // const st = setInterval(() => {
    //   if (Math.abs(opacity) <= 0.1) opacity = 0;
    //   else opacity -= 0.1;
    //   el.style.opacity = opacity + '';
    //   if (opacity == 0) {
    //     el.style.opacity = 1 + '';
    //     clearInterval(st);
    //   }
    // }, 100);
  }
  leave1(el: HTMLElement, done: any) {
    setTimeout(() => {
      this.show2 = true;
      el.style.transform = 'translate(0,0)';
      this.$store.dispatch('togglePanel', false);
      this.$emit('close');
      done();
    }, 500);
  }
  // beforeEnter2(el: HTMLElement) {
  //   console.log('beforeEnter2');
  //   el.style.opacity = '1';
  //   el.style.transition = ' opacity 0.3s';
  // }
  // enter2(el: HTMLElement, done: any) {
  //   setTimeout(() => {
  //     console.log('enter2');
  //     this.show1 = false;
  //     // this.show1 = false;
  //     this.$store.dispatch('togglePanel', false);
  //     this.$emit('close');
  //     done();
  //   }, 300);
  // }

  close() {
    this.show2 = false;
    this.show1 = false;
  }
  open() {
    this.show1 = true;
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
  @Watch('showPanel')
  onShowPanelChange(newVal: boolean) {
    console.log(newVal);
    this.show1 = newVal;
    this.show2 = newVal;
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/base';

// .slide-fade-enter-active {
//   transition: all 0.5s ease-in;
// }
// .slide-fade-enter {
//   opacity: 0;
// }

.avatar {
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  margin-top: 0.5rem;
  z-index: 99;
}
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
    top: 15rem;
    min-height: 10rem;
    width: 600px;
    left: 50%;
    transform: translate(-50%, 0%);
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
}
</style>
