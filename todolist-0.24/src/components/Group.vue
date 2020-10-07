<template>
  <div class="group clearfix">
    <div class="title clearfix">
      <h2>{{ groupData.title }}</h2>
      <div class="toolbar clearfix">
        <i
          class="fold"
          :class="showList ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
          @click="toggle"
          @touch-up="toggle"
        ></i>
        <span class="circle percent" style="display: none">50%</span>
        <span class="circle del-group" v-if="curMode == 1 && group.id != -1" @click="del">删除分组</span>
      </div>
    </div>
    <el-collapse-transition>
      <ul v-show="showList">
        <Item v-for="item in groupData.list" :key="item.id" :item="item"></Item>
      </ul>
    </el-collapse-transition>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Watch } from 'vue-property-decorator';
import { PropType } from 'vue';
import Item from '@/components/Item.vue';
import { List } from '@/store/IFs';

const GroupProps = Vue.extend({
  props: {
    group: Object as PropType<List>,
  },
});
@Component({
  name: 'Group',
  components: {
    Item,
  },
})
export default class Group extends GroupProps {
  private groupData: List = { id: -1, title: '', list: [] };
  private showList = true;
  get curMode() {
    return this.$store.getters.getCurMode || 0;
  }
  del() {
    this.$store.dispatch('delGroup', this.groupData.id);
  }
  toggle() {
    this.showList = !this.showList;
  }
  created() {
    this.groupData = this.group;
  }
  @Watch('group')
  onGroupChange(newValue: List) {
    this.groupData = newValue;
  }
}
</script>
<style lang="scss" scoped>
.inner {
  position: absolute;
  width: 600px;
  left: 50%;
  transform: translateX(-50%);
}
.group {
  width: 600px;
  /* width: 100%; */
  margin: 0 auto;
  .title {
    /* margin: 1rem 0; */
    height: 5rem;
    user-select: none;
    h2 {
      /* padding-top: 1rem; */
      margin-top: 1rem;
      line-height: 3rem;
      font-size: 2rem;
      display: block;
      float: left;
    }
    .toolbar {
      position: relative;
      float: right;
      .fold {
        position: relative;
        width: 5rem;
        height: 5rem;
        &::before {
          position: absolute;
          font-size: 3rem;
          top: 1rem;
          left: 1rem;
        }
      }
      .circle {
        display: block;
        min-width: 6rem;
        margin-right: 5rem;
        height: 3rem;
        margin-top: 1rem;
        line-height: 2.6rem;
        font-size: 2rem;
        padding: 0 1rem;
        border-radius: 2rem;

        border: #333 solid 0.2rem;
        box-sizing: border-box;
        color: #000;
        text-align: center;
        float: right;
        user-select: none;
        &:hover {
          background-color: #333;
          color: white;
        }
      }
    }
  }
}

@media screen and (max-width: 600px) {
  .group {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
