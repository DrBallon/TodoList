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

<script>
import { mapActions, mapGetters } from 'vuex';
export default {
  props: ['item'],
  components: {},
  data() {
    //这里存放数据
    return {
      data: {
        id: 0,
        group: 0,
        content: 0,
        done: false,
      },
      tempContent: '',
      curGroup: -1,
    };
  },
  //监听属性 类似于data概念
  computed: {
    // ...mapState(['groups']),
    ...mapGetters(['getGroups']),
    curMode: function() {
      return this.$store.state.curMode;
    },
  },
  //方法集合
  methods: {
    ...mapActions(['changeState', 'delItem', 'editContent']),
    ...mapActions({ changeGroup_vuex: 'changeGroup' }),
    changeGroup() {
      this.changeGroup_vuex({ id: this.data.id, groupId: this.curGroup });
    },
    state() {
      this.changeState({ id: this.data.id, done: this.data.done });
    },
    del() {
      this.delItem({ id: this.data.id });
    },
    startEdit() {
      this.tempContent = this.data.content;
    },
    endEdit() {
      if (
        this.data.content == '' ||
        this.data.content.trim() == '' ||
        this.data.content == this.tempContent ||
        this.data.content.trim() == this.tempContent
      ) {
        this.data.content = this.tempContent;
      } else {
        this.editContent({ data: this.data });
      }
    },
  },
  //生命周期 - 创建完成（可以访问当前this实例）
  created() {
    this.data = this.item;
    this.curGroup = this.item.group;
  },
};
</script>
<style scoped>
.item {
  height: 5rem;
  line-height: 5rem;

  background-color: #fff;
  border-radius: 5px;
  vertical-align: middle;
  margin: 1rem 0;
  user-select: none;
}
.done-item {
  background-color: #dddddd;
}
.item .item-state {
  width: 4rem;
  height: 4rem;
  margin-left: 1rem;
  margin-top: 0.5rem;
  float: left;
}

.item .item-input {
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
.item .item-input:focus {
  border: 1px solid black;
}

.item .select {
  position: relative;
  width: 7rem;
  height: 4rem;
  margin: 0.5rem 0.5rem;
  border: 0.1rem solid black;
  float: right;
  border-radius: 0.5rem;
  box-sizing: border-box;
  overflow: hidden;
}
.item .select::after {
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
.select select {
  display: block;
  font-size: 2rem;
  padding-left: 5px;
  height: 4rem;
  line-height: 1.8rem;
  width: 100%;
  border-radius: 0.5rem;
}
.select select {
  font-size: 2rem;
  font-weight: bold;
}
.del-btn {
  float: right;
  margin-right: 1rem;
  font-size: 3rem;
  user-select: none;
}
</style>
