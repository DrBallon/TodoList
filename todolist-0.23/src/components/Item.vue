<template>
  <li class="item">
    <input type="checkbox" class="item-state" :checked="item.done" @click="state()" />
    <input type="text" class="item-input" @click="startEdit()" @blur="endEdit()" v-model="data.content" />
    <span class="del-btn" @click="del()">X</span>
    <div class="select" v-if="curMode == 1">
      <select v-model="curGroup" @change="changeGroup">
        <option v-for="(group, index) in getGroups" :key="index" :value="group.id" :checked="group.id == data.group">
          {{ group.title }}
        </option>
        <!-- <option value="0" selected>分组1</option>
        <option value="1">分组2</option>
        <option value="2">分组3</option>
        <option value="3">分组4</option> -->
      </select>
    </div>
  </li>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
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
  state() {
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
}
</script>
<style lang="scss" scoped>
.item {
  height: 5rem;
  line-height: 5rem;
  background-color: #fff;
  border-radius: 5px;
  vertical-align: middle;
  margin: 1rem 0;
  user-select: none;
  .item-state {
    width: 4rem;
    height: 4rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
    float: left;
  }
  .item-input {
    display: block;
    font-size: 3rem;
    line-height: 5rem;
    margin-left: 1rem;
    margin-top: 0.5rem;
    height: 4rem;
    width: 10rem;
    box-sizing: border-box;
    background-color: transparent;
    border-radius: 0.5rem;
    float: left;
  }
  .item-input:focus {
    border: 1px solid black;
  }
  .select {
    position: relative;
    width: 7rem;
    height: 4rem;
    margin: 0.5rem 0.5rem;
    border: 0.1rem solid black;
    float: right;
    border-radius: 0.5rem;
    box-sizing: border-box;
    overflow: hidden;
    &::after {
      position: absolute;
      content: '';
      width: 2rem;
      height: 2rem;
      display: block;
      top: 1rem;
      right: 0.5rem;
      background: url('../assets/drop-down.png') no-repeat center;
      background-size: 100% 100%;
    }
    select {
      display: block;
      font-size: 2rem;
      font-weight: bold;
      padding-left: 5px;
      height: 4rem;
      line-height: 1.8rem;
      width: 100%;
      border-radius: 0.5rem;
    }
  }
}
.done-item {
  background-color: #dddddd;
}
.del-btn {
  float: right;
  margin-right: 1rem;
  font-size: 3rem;
  user-select: none;
}
</style>
