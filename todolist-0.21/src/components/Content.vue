<template>
  <div class="content">
    <div class="clearfix">
      <button class="switch-mode" :class="{ 'current-mode': getCurMode == 0 }" @click="changeMode(0)">
        完成状态分组
      </button>
      <button class="switch-mode" :class="{ 'current-mode': getCurMode == 1 }" @click="changeMode(1)">
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

<script>
import Group from '@/components/Group';
import { mapGetters, mapActions } from 'vuex';
import MiniScroll from '@/assets/js/MiniScroll';
export default {
  name: 'Content',
  components: { Group },
  methods: {
    ...mapActions({ changeMode_Store: 'changeMode' }),
    changeMode(mode) {
      this.changeMode_Store({ mode });
    },
    setContentHeight() {
      function getHeight(ele) {
        let height = window.getComputedStyle(ele).height;
        return parseInt(height);
      }
      let tools = document.querySelector('.tools');
      let title = document.querySelector('.title');
      let switch_mode = document.querySelector('.switch-mode');
      let height = window.innerHeight - getHeight(tools) - getHeight(title) - getHeight(switch_mode);
      // console.log(window.innerHeight, getHeight(title), getHeight(switch_mode), getHeight(tools), height);
      console.log('inner:', getHeight(this.$refs.inner));
      this.$refs.outer.style.height = height + 'px';
    },
  },
  computed: {
    ...mapGetters(['getCurMode']),
    ...mapGetters(['groups']),
  },
  mounted() {
    this.setContentHeight();
    this.$scroll = new MiniScroll(this.$refs.inner, this.$refs.outer);
    this.$scroll.addScroll();
  },
  watch: {
    groups() {
      this.$nextTick(() => {
        this.setContentHeight();
        this.$scroll.removeScroll();
        this.$scroll.addScroll();
        this.$scroll.scrollTo(0);
      });
    },
  },
};
</script>
<style scoped>
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
}
.switch-mode:active {
  background-color: #000;
}
.current-mode {
  background-color: #cdcdcd;
  color: #000;
}
.current-mode:active {
  background-color: #cdcdcd;
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
  }
  .switch-mode:active {
    background-color: #000;
  }
  .current-mode {
    background-color: #cdcdcd;
    color: #000;
  }
  .current-mode:active {
    background-color: #cdcdcd;
  }
}
</style>
