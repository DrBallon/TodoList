<template>
  <li class="item">
    <!-- <input type="checkbox" class="item-state" :checked="item.done" @click="state()" /> -->

    <el-checkbox class="item-state" v-model="item.done" @click.native="state($event.target.tagName)"></el-checkbox>
    <!-- <input ype="text" class="item-input" @click="startEdit()" @blur="endEdit()" v-model="data.content" /> -->
    <el-input
      v-model="data.content"
      class="item-input"
      :class="{ mode1: curMode == 1 }"
      @click.native="startEdit()"
      @blur="endEdit()"
      placeholder="请输入内容"
    ></el-input>
    <i class="del-btn el-icon-delete" @click="del()"></i>
    <el-select class="select" v-model="curGroup" placeholder="请选择" @change="changeGroup" v-if="curMode == 1">
      <el-option v-for="(group, index) in getGroups" :key="index" :label="group.title" :value="group.id"> </el-option>
    </el-select>
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
  get curMode() {
    return this.$store.getters.getCurMode;
  }
  get getGroups() {
    return this.$store.getters.getGroups;
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
  mounted() {
    console.log(`item ${this.data.id} mounted`);
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
.item {
  min-width: 300px;
  height: 5rem;
  line-height: 5rem;
  background-color: #fff;
  border-radius: 5px;
  vertical-align: middle;
  margin: 1rem;
  user-select: none;
  .item-state {
    width: 4rem;
    height: 4rem;
    margin-left: 1rem;
    float: left;
  }
  .item-input {
    display: block;
    font-size: 2rem;
    line-height: 5rem;
    height: 4rem;
    width: 30rem;
    box-sizing: border-box;
    background-color: transparent;
    border-radius: 0.5rem;
    float: left;
    //超过范围省略号
    &.mode1 {
      width: 25rem;
    }
  }
  .item-input:focus {
    border: 1px solid black;
  }
  .select {
    width: 9rem;
    float: right;
    margin-right: 1rem;
  }
}
.done-item {
  background-color: #dddddd;
}
.del-btn {
  float: right;
  // margin-right: 1rem;
  margin: 1rem 1rem 0 0;
  font-size: 3rem;
  user-select: none;
  width: 3rem;
  height: 3rem;
}

@media screen and (max-width: 600px) {
  .item {
    .item-input {
      width: 20rem;
      &.mode1 {
        width: 12rem;
      }
    }
  }
}
</style>
<style lang="scss">
//checkbox样式覆盖
.item-state {
  .el-checkbox__input {
    .el-checkbox__inner {
      width: 3rem;
      height: 3rem;
    }
    &.is-checked {
      .el-checkbox__inner::after {
        width: 1rem;
        height: 2rem;
        left: 1rem;
        top: 0rem;
      }
    }
  }
}
.item-input {
  input {
    border: none;
    box-sizing: border-box;
    overflow: hidden;
    white-space: nowrap;
    text-overflow: ellipsis;
    &:focus {
      border: 1px solid #dcdfe6;
    }
  }
}
</style>
