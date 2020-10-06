<template>
  <div class="tools center">
    <input type="button" class="clear center " :class="{ 'half-btn': curMode == 1 }" value="清空" @click="clear" />
    <input type="button" class="add-group center half-btn" v-if="curMode == 1" value="新增分组" @click="add" />
  </div>
</template>

<script lang="ts">
import { Vue, Component } from 'vue-property-decorator';
@Component({
  name: 'Tools',
})
export default class Tools extends Vue {
  add() {
    const title = prompt('新分组标题', '');
    if (title != '') {
      // console.log(title);
      this.$store.dispatch('addGroup', title);
    }
  }
  clear() {
    this.$store.dispatch('clearItem');
  }
  get curMode() {
    return this.$store.getters.getCurMode || 0;
  }
}
</script>
<style lang="scss" scoped>
@import '~assets/styles/base';
.tools {
  position: absolute;
  left: 50%;
  bottom: 0rem;
  transform: translateX(-50%);
}
.center {
  margin: 0 auto;
  width: $inner-width;
  font-size: 0;
}
.add-group,
.clear {
  font-size: 2rem;
  height: $tools-height;
  border-radius: 0.5rem;
  background-color: $theme-color-dark;
  color: #fff;
  &:active {
    background-color: #000;
  }
}
.full-btn {
  width: 100%;
}
.half-btn {
  width: 48%;
  &:nth-child(1) {
    margin-right: 2%;
  }
}
@media screen and (max-width: 600px) {
  .center {
    width: 100%;
  }
  .full-btn {
    width: 100%;
  }
  .half-btn {
    width: 48%;
  }
  .half-btn:nth-child(1) {
    margin-right: 2%;
  }
}
</style>
