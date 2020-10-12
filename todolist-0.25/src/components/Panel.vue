<template>
  <div>
    <transition v-on:before-leave="beforeLeave1" v-on:leave="leave1">
      <el-avatar v-show="showAvatar" :src="getAvatar" class="avatar" @click.native="open">
        <img src="@/assets/images/default.png" />
      </el-avatar>
    </transition>
    <!-- <transition v-on:before-enter="beforeEnter2" v-on:enter="enter2"> -->
    <!-- <transition name="slide-fade"> -->
    <div v-show="showPanel" class="background">
      <div class="panel">
        <i class="close el-icon-close" @click="close" v-if="panelType == 1"></i>
        <LoginPanel v-if="panelType == 0" @success="loginSuccess" />
        <LogoutPanel v-if="panelType == 1" @success="logoutSuccess" />
        <RegPanel v-if="panelType == 2" />
      </div>
    </div>
    <!-- </transition> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import LoginPanel from './LoginPanel.vue';
import RegPanel from './RegPanel.vue';
import LogoutPanel from './LogoutPanel.vue';
@Component({
  components: {
    LoginPanel,
    RegPanel,
    LogoutPanel,
  },
})
export default class Panel extends Vue {
  private showAvatar = true;
  private showPanel = false;
  get panelType() {
    return this.$store.getters.panelConfig.panelType;
  }
  get show() {
    this.showAvatar = !this.$store.getters.panelConfig.showPanel;
    this.showPanel = this.$store.getters.panelConfig.showPanel;

    return this.$store.getters.panelConfig.showPanel;
  }
  get getAvatar() {
    return this.$store.getters.getAvatar;
  }
  created() {
    this.show;
  }
  loginSuccess() {
    //关闭login时，重新设置数据，否则login关闭后，logout还在显示
    this.show;
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
    console.log(pos);
    const targetLeft = window.innerWidth / 2;
    const radius = parseInt(getComputedStyle(document.body, null).fontSize) * 2;
    // console.log('radius:', radius);
    const targetTop = (radius / 2) * (6 + 19.5);
    console.log(targetTop, targetLeft);
    el.style.top = pos.top + 'px';
    el.style.left = pos.left + 'px';
    el.style.transform = `translate(${targetLeft - pos.left - radius + 'px'},${targetTop -
      pos.top -
      radius +
      'px'}) scale(3,3)`;
    el.style.transition = 'all 0.5s';
  }
  leave1(el: HTMLElement, done: Function) {
    setTimeout(() => {
      this.showPanel = true;
      el.style.transform = 'translate(0,0)';
      this.$store.dispatch('togglePanel', false);
      this.$emit('close');
      done();
    }, 500);
  }
  close() {
    this.showPanel = false;
    this.showAvatar = true;
  }
  open() {
    this.showAvatar = false;
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/base';

.avatar {
  width: 4rem;
  height: 4rem;
  font-size: 4rem;
  margin-top: 0.5rem;
  z-index: 99;
  img {
    width: 100%;
    height: 100%;
  }
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
