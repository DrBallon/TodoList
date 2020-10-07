<template>
  <div id="app">
    <Title @open="openPanel" :avatar="avatar"></Title>
    <Content></Content>
    <Tools></Tools>
    <transition name="fade">
      <Panel v-if="showPanel" @close="closePanel" :type="panelType"></Panel>
    </transition>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import Content from '@/components/Content.vue';
import Tools from '@/components/Tools.vue';
import Panel from '@/components/Panel.vue';
import http from '@/store/api';
@Component({
  components: {
    Tools,
    Title,
    Content,
    Panel,
  },
})
export default class App extends Vue {
  private showPanel = false;
  private panelType = 0;
  private avatar = '';
  testItem = {
    id: 0,
    group: 0,
    content: 0,
    done: false,
  };
  closePanel(type?: number) {
    //panel关闭时，根据panel的类型决定功能
    //不设置type时，说明是单纯的关闭版面，只需要设置
    //type=0时，说明登录成功，此时重新获取getData
    //type=1时，说明退出成功，此时重新设置类型
    this.showPanel = false;
    if (type == 0) {
      this.getData();
    } else if (type == 1) {
      this.$store.dispatch('setData');
      this.panelType = 0;
      this.showPanel = true;
      this.avatar = '';
    }
  }
  openPanel() {
    this.showPanel = true;
  }
  getData() {
    // this.$store.dispatch('setData');
    http.getData().then((res) => {
      if (res.status == 200) {
        const { curMode, groups, list, avatar } = res.data;
        this.$store.dispatch('setData', { curMode, groups, list });
        this.avatar = res.data.avatar;
        this.showPanel = false;
        this.panelType = 1;
      } else {
        this.showPanel = true;
        this.avatar = '';
      }
    });
  }
  created() {
    this.getData();
  }
}
</script>

<style lang="scss">
.fade-enter-active,
.fade-leave-active {
  transition: opacity 0.2s;
}
.fade-enter, .fade-leave-to /* .fade-leave-active below version 2.1.8 */ {
  opacity: 0;
}

* {
  margin: 0;
  padding: 0;
}
html {
  overflow: hidden;
  font-size: 12px;
  height: 100%;
}
body {
  background-color: #cdcdcd;
  position: relative;
  height: 100%;
}
input,
button {
  border: none;
  outline: none;
}

select {
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

li {
  list-style: none;
}
.clearfix::after {
  content: '';
  display: block;
  height: 0px;
  clear: both;
}
#app {
  position: relative;
  height: 100%;
}
@media screen and (max-width: 600px) {
  html {
    overflow: hidden;
    font-size: 10px;
    height: 100%;
  }
}
</style>
