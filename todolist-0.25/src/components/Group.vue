<template>
  <div class="group">
    <el-row>
      <el-col :span="curMode == 0 ? 20 : 16">
        <h2>{{ groupData.title }}</h2>
      </el-col>
      <el-col class="del" :span="4" v-if="curMode == 1 && group.id != -1">
        <el-button type="danger" icon="el-icon-minus" @click="del" circle></el-button>
      </el-col>
      <el-col class="toggle" :span="4" :offset="((curMode == 1 && group.id) || curMode == 0) == -1 ? 4 : 0">
        <el-button
          type="danger"
          :icon="showList == false ? 'el-icon-arrow-down' : 'el-icon-arrow-up'"
          @click="toggle"
          circle
        ></el-button>
      </el-col>
    </el-row>
    <transition-group name="slide" tag="ul">
      <Item
        @refresh="refresh"
        v-show="showList"
        v-for="item in groupData.list"
        :key="groupData.id * 10 + item.id"
        :item="item"
      ></Item>
    </transition-group>
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
    //>768px
    sm: {
      title: { span: 0 },
      del: { span: 2 },
      fold: { span: 2, offset: 0 },
    },
    xs: {
      title: { span: 0 },
      del: { span: 3 },
      fold: { span: 3, offset: 0 },
    },
  };
  private showList = true;
  /*
  offset = 2
  curMode=1&&group.id==-1
  curMode=0
*/
  refresh(delay: number) {
    // console.log('rfresh');
    this.$emit('refresh', delay);
  }
  toggle() {
    console.log('toggle');
    this.showList = !this.showList;
    this.$emit('refresh', 600);
  }
  get curMode() {
    const mode = this.$store.getters.getCurMode || 0;

    return mode;
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
.slide-enter-active,
.slide-leave-active {
  transition: all 0.3s;
}
.slide-enter,
.slide-leave-to {
  transform: translate(100%, 0);
  // opacity: 0;
}
.slide-leave,
.slide-enter-to {
  // opacity: 1;
  transform: translate(0, 0);
}
.group {
  .del,
  .toggle {
    text-align: right;
  }
}
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
