<template>
  <div id="app" v-loading="loading">
    <transition name="el-fade-in-linear">
      <div v-if="!loading">
        <Title>
          <Panel @close="closePanel" />
        </Title>
        <Content />
        <Tools />
      </div>
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
  // private panelType = 0;
  // private avatar = '';
  private loading = true;
  closePanel(type: number) {
    //type=0时，说明登录成功，此时重新获取getData
    //type=1时，说明退出成功，此时清空数据
    if (type == 0) {
      this.getData();
    } else if (type == 1) {
      this.$store.dispatch('setData');
      // this.avatar = '';
    }
  }
  get getAvatar() {
    return this.$store.getters.getAvatar;
  }
  // get showPanel() {
  //   return this.$store.getters.panelConfig.showPanel;
  // }
  getData() {
    http.getData().then((res) => {
      if (res.status == 200) {
        const { curMode, groups, list, avatar } = res.data;
        this.$store.dispatch('setData', { avatar, curMode, groups, list, showPanel: false, panelType: 1 });
        this.loading = false;
      } else {
        // this.avatar = '';
        this.loading = false;
        this.$message.error(res.msg);
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
*:not(input) {
  user-select: none !important;
}
html {
  overflow: hidden;
  font-size: 14px;
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
@media screen and (max-width: 768px) {
  html {
    overflow: hidden;
    font-size: 12px;
    height: 100%;
  }
}
</style>
