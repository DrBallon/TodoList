<template>
  <div class="content">
    <div class="clearfix">
      <button class="switch-mode" :class="{ 'current-mode': curMode == 0 }" @click="changeMode(0)">
        完成状态分组
      </button>
      <button class="switch-mode" :class="{ 'current-mode': curMode == 1 }" @click="changeMode(1)">
        自定义分组
      </button>
    </div>
    <div class="outer" ref="outer">
      <div class="inner" ref="inner">
        <Group v-for="(group, index) in groups" :key="index" :group="group"></Group>
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import Group from '@/components/Group.vue';
import MiniScroll from '@/assets/lib/MiniScroll';
@Component({
  name: 'Content',
  components: {
    Group,
  },
})
export default class Content extends Vue {
  private scroll: MiniScroll | null = null;
  changeMode(mode: number) {
    this.$store.dispatch('changeMode', mode);
  }
  setContentHeight() {
    function getHeight(ele: Element | null) {
      if (ele == null) return 0;
      const height = window.getComputedStyle(ele).height;
      return parseInt(height);
    }
    const tools: Element | null = document.querySelector('.tools');
    const title: Element | null = document.querySelector('.title');
    const switchMode: Element | null = document.querySelector('.switch-mode');
    const height: number = window.innerHeight - getHeight(tools) - getHeight(title) - getHeight(switchMode);
    (this.$refs.outer as HTMLElement).style.height = height + 'px';
  }
  get curMode() {
    return this.$store.getters.getCurMode;
  }
  get groups() {
    return this.$store.getters.groups;
  }
  mounted() {
    this.setContentHeight();
    this.scroll = new MiniScroll(this.$refs.inner as HTMLElement, this.$refs.outer as HTMLElement);
    this.scroll.addScroll();
  }
  @Watch('groups')
  onGroupsChangeds() {
    this.$nextTick(() => {
      this.setContentHeight();
      if (!this.scroll) return;
      this.scroll.removeScroll();
      this.scroll.addScroll();
      this.scroll.scrollTo(0);
    });
  }
}
</script>
<style lang="scss" scoped>
.content {
  width: 600px;
  margin: 0 auto;
  font-size: 0;
}
.outer {
  position: relative;
  overflow: hidden;
}
.inner {
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
}
.switch-mode {
  width: 50%;
  height: 4rem;
  background-color: #333;
  color: #fff;
  font-size: 2rem;
  &:active {
    background-color: #000;
  }
}
.current-mode {
  background-color: #cdcdcd;
  color: #000;
  &:active {
    background-color: #cdcdcd;
  }
}
@media screen and (max-width: 600px) {
  .content {
    width: 100%;
    font-size: 0;
  }
  .switch-mode {
    display: block;
    float: left;
    width: 50%;
    height: 4rem;
    background-color: #333;
    color: #fff;
    font-size: 2rem;
    &:active {
      background-color: #000;
    }
  }
  .current-mode {
    background-color: #cdcdcd;
    color: #000;
    &:active {
      background-color: #cdcdcd;
    }
  }
}
</style>
