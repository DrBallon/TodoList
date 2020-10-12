<template>
  <div class="group">
    <el-row>
      <el-col :span="curMode == 0 ? 22 : 20">
        <h2>{{ groupData.title }}</h2>
      </el-col>
      <el-col :span="2" v-if="curMode == 1 && group.id != -1">
        <el-button type="danger" icon="el-icon-minus" @click="del" circle></el-button>
      </el-col>
      <el-col :span="2" :offset="group.id == -1 && curMode == 1 ? 2 : 0">
        <el-button type="danger" v-if="showList" icon="el-icon-arrow-down" @click="showList = false" circle></el-button>
        <el-button type="danger" v-else icon="el-icon-arrow-up" @click="showList = true" circle></el-button>
      </el-col>
    </el-row>
    <el-collapse-transition>
      <ul v-show="showList">
        <Item v-for="item in groupData.list" :key="groupData.id * 10 + item.id" :item="item"></Item>
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
  private layout = {
    xs: {
      title: { span: this.curMode == 0 ? 22 : 20 },
      del: { span: 2 },
      fold: { span: 2 },
    },
    sm: {
      title: { span: this.curMode == 0 ? 20 : 18 },
      del: { span: 4 },
      fold: { span: 4 },
    },
  };
  private showList = true;
  get curMode() {
    return this.$store.getters.getCurMode || 0;
  }
  del() {
    this.$store.dispatch('delGroup', this.groupData.id);
  }
  created() {
    this.groupData = this.group;
  }
  @Watch('group')
  onGroupChange(newValue: List) {
    // console.log(`watch group ${this.groupData.id} mounted`);
    this.groupData = newValue;
  }
}
</script>
<style lang="scss" scoped>
/*
.group {
  width: 600px;
  margin: 0 auto;
  .title {
    height: 5rem;
    user-select: none;
    h2 {
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
*/
@media screen and (max-width: 600px) {
  .group {
    width: 100%;
    margin: 0 auto;
  }
}
</style>
<style lang="scss">
@import '~assets/styles/base';
.group {
  .el-row {
    margin-top: 0.5rem;
    height: 4rem;
    font-size: 2rem;
    .el-col {
      .el-button {
        position: relative;
        height: 4rem;
        width: 4rem;
        background-color: $theme-color-dark;
        border: 0.2rem solid $theme-color-dark;
        box-sizing: border-box;
        font-size: 2rem;
        &:active {
          background-color: $theme-color-gray;
          color: $theme-color-dark;
          border: 0.2rem solid $theme-color-dark;
        }
        i {
          position: absolute;
          height: 2rem;
          width: 2rem;
          top: 0.8rem;
          left: 0.8rem;
        }
      }
    }
  }
}
</style>
