<template>
  <li class="item">
    <el-row class="row" type="flex" justify="space-around">
      <el-col :span="3" class="col hidden-xs-only">
        <el-checkbox class="item-state" v-model="item.done" @click.native="state($event.target.tagName)" />
      </el-col>
      <el-col :sm="curMode == 0 ? 18 : 13" :xs="24" class="col">
        <el-input
          v-model="data.content"
          class="item-input"
          :class="{ mode1: curMode == 1 }"
          @click.native="startEdit()"
          @blur="endEdit()"
          placeholder="请输入内容"
        />
      </el-col>
      <el-col v-if="curMode == 1" :span="5" class="col hidden-xs-only">
        <el-select class="select" v-model="curGroup" placeholder="请选择" @change="changeGroup">
          <el-option v-for="(group, index) in getGroups" :key="index" :label="group.title" :value="group.id" />
        </el-select>
      </el-col>
      <el-col :span="2" class="col  hidden-xs-only">
        <i class="del el-icon-delete" @click="del()" />
      </el-col>
      <!-- 切换 -->
      <el-col v-if="!showOpts" :xs="4" class="col hidden-sm-and-up">
        <i class="del el-icon-caret-bottom" @click="toggleOpts(true)" />
      </el-col>
    </el-row>
    <!-- 操作栏 768px以上隐藏 -->
    <transition name="slide-fade" v-on:after-enter="afterEnter" v-on:after-leave="afterLeave">
      <el-row v-if="showOpts" class="row hidden-sm-only" type="flex" justify="space-around">
        <!-- 状态 -->
        <el-col :xs="curMode == 0 ? 12 : 5" class="col hidden-sm-only">
          <el-checkbox class="item-state" v-model="item.done" @click.native="state($event.target.tagName)" />
        </el-col>
        <!-- 分组 -->
        <el-col :xs="14" v-if="curMode == 1" class="col hidden-sm-only">
          <el-select class="select" v-model="curGroup" placeholder="请选择" @change="changeGroup">
            <el-option v-for="(group, index) in getGroups" :key="index" :label="group.title" :value="group.id" />
          </el-select>
        </el-col>
        <!-- 删除 -->
        <el-col :xs="curMode == 0 ? 12 : 5" class="col  hidden-sm-only">
          <i class="del el-icon-delete" @click="del()" />
        </el-col>
        <!-- 切换 -->
        <el-col :xs="4" class="col hidden-sm-only">
          <i class="del el-icon-caret-top" @click="toggleOpts(false)" />
        </el-col>
      </el-row>
    </transition>
  </li>
</template>

<script lang="ts">
import { Component, Vue, Watch } from 'vue-property-decorator';
import { Item as ItemInterface } from '@/store/IFs';
import { PropType } from 'vue';
import { dispatchChangeGroup, dispatchEditContent } from '@/store';
const ItemProps = Vue.extend({
  props: {
    item: Object as PropType<ItemInterface>,
  },
});
@Component({
  name: 'Item',
})
export default class Item extends ItemProps {
  private data: ItemInterface = {
    id: 0,
    group: 0,
    content: '',
    done: false,
  };
  private tempContent = '';
  private curGroup = -1;
  private showOpts = false;
  get curMode() {
    return this.$store.getters.getCurMode;
  }
  get getGroups() {
    return this.$store.getters.getGroups;
  }
  afterEnter() {
    console.log('afterEnter');
  }
  afterLeave() {
    console.log('afterLeave');
  }
  toggleOpts(flag: boolean) {
    this.$emit('refresh', 0);
    this.showOpts = flag;
  }
  changeGroup() {
    // this.$store.dispatch('changeGroup', { itemId: this.data.id, newGroup: this.curGroup });
    dispatchChangeGroup({
      itemId: this.data.id,
      newGroup: this.curGroup,
    });
  }
  state(tagName: string) {
    if (tagName != 'INPUT') return;
    this.$store.dispatch('changeState', { itemId: this.data.id, newState: !this.data.done });
  }
  del() {
    this.$store.dispatch('delItem', this.data.id);
  }
  startEdit() {
    this.tempContent = this.data.content;
  }
  endEdit() {
    if (
      this.data.content == '' ||
      this.data.content.trim() == '' ||
      this.data.content == this.tempContent ||
      this.data.content.trim() == this.tempContent
    ) {
      this.data.content = this.tempContent;
    } else {
      // this.$store.dispatch('editContent', this.data);
      dispatchEditContent({
        itemId: this.data.id,
        newContent: this.data.content,
      });
    }
  }
  created() {
    this.data = this.item;
    this.curGroup = this.item.group;
  }
  @Watch('group')
  onGroupChange(newValue: ItemInterface) {
    // console.log('watch item');
    this.data = newValue;
  }
}
</script>
<style lang="scss" scoped>
.slide-fade-enter-active,
.slide-fade-leave-active {
  transition: all 0.3s ease;
}
.slide-fade-enter, .slide-fade-leave-to
/* .slide-fade-leave-active for below version 2.1.8 */ {
  transform: translateX(2rem);
  opacity: 0;
}
.item {
  background-color: #fff;
  border-radius: 5px;
  margin: 1rem;
  user-select: none;
  z-index: 10;
  &.done-item {
    background-color: #dddddd;
  }
  .row {
    height: 5rem;
    .col {
      height: 5rem;
      text-align: center;
      .item-input {
        margin-top: 0.5rem;
        &:focus {
          border: 1px solid black;
        }
      }
      .select {
        margin-top: 0.5rem;
        width: 100%;
      }
      .del {
        margin-top: 1rem;
        font-size: 3rem;
      }
    }
  }
  @media screen and (max-width: 768px) {
    .row {
      height: 5rem;
    }
  }
}
</style>
<style lang="scss">
.item {
  input {
    height: 4rem;
  }
  .select {
    .el-input {
      font-size: 1rem;
    }
  }
  .el-checkbox__inner {
    margin-top: 1rem;
    width: 3rem;
    height: 3rem;
    &::after {
      height: 2rem;
      width: 1rem;
      left: 0.8rem;
      top: 0;
    }
  }
}
</style>
