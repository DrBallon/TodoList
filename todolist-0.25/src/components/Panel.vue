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
      <!-- <div class="panel"> -->
      <!-- <i class="close el-icon-close" @click="close" v-if="panelType == 1"></i> -->
      <LoginPanel v-if="panelType == 0" @success="loginSuccess" />
      <LogoutPanel v-if="panelType == 1" @success="logoutSuccess" />
      <RegPanel v-if="panelType == 2" />
      <!-- </div> -->
    </div>
    <!-- </transition> -->
  </div>
</template>
<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
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
    const fontSize = parseInt(getComputedStyle(document.documentElement, null).fontSize);
    console.log('fontSize:', fontSize);
    const middleX = window.innerWidth / 2;
    const targetTop = (15 + 4 + 0.5) * fontSize;

    const smRadius = 2 * fontSize;
    const bgRadius = 6 * fontSize;
    console.log('smRadius:', smRadius);
    console.log('bgRadius:', bgRadius);
    const x = pos.left - middleX + smRadius;
    const y = targetTop - pos.top + bgRadius - smRadius;

    el.style.left = pos.left + 'px';
    el.style.transform = `translate(${-x + 'px'},${y + 'px'}) scale(3,3)`;
    el.style.transition = 'all 0.5s';
  }
  leave1(el: HTMLElement, done: Function) {
    setTimeout(() => {
      this.showPanel = true;
      el.style.transform = 'translate(0,0)';
      this.$store.dispatch('togglePanel', true);
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
  @Watch('show')
  onShowChange() {
    // console.log('show change:', newValue);
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
}
.background {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  background-color: rgba(0, 0, 0, 0.5);
  z-index: 10;
}
</style>
<style lang="scss">
.el-avatar {
  img {
    width: 100%;
    height: 100%;
  }
}
</style>
