<template>
  <div id="app">
    <top @addItem="addItem" />
    <list
      :list="todoList"
      :title="listTitles['todo']"
      @change-state="changeState"
      @edit-item="editItem"
      @del-item="delItem"
    />
    <list
      :list="doneList"
      :title="listTitles['done']"
      @change-state="changeState"
      @editItem="editItem"
      @del-item="delItem"
    />
    <clear @clear="clearData" />
  </div>
</template>

<script>
import Top from './components/Top'
import List from './components/List'
import Clear from './components/Clear'

export default {
  name: 'App',
  components: {
    Top,
    List,
    Clear,
  },
  data() {
    return {
      list: [],
      listTitles: {
        todo: '正在进行',
        done: '已完成',
      },
    }
  },
  methods: {
    getData() {
      return JSON.parse(window.localStorage.getItem('data'))
    },
    saveData() {
      window.localStorage.setItem('data', JSON.stringify(this.list))
    },
    clearData() {
      console.log("1");
      window.localStorage.clear()
      this.list=[]
      this.saveData()
    },
    delItem(id) {
      this.list = this.list.filter((item) => item.id != id)
      this.saveData()
    },
    addItem(content) {
      let newItem = { id: 0, done: false, content }
      if (this.list.length > 0)
        newItem.id = this.list[this.list.length - 1].id + 1
      this.list.push(newItem)
      this.saveData()
    },
    changeState(id) {
      this.list.forEach((item) => {
        if (item.id == id) {
          item.done = !item.done
          this.saveData()
          return
        }
      })
    },
    editItem(newItem) {
      this.list.forEach((item) => {
        if (item.id == newItem.id) {
          item.content = newItem.content
          this.saveData()
          return
        }
      })
    },
  },
  computed: {
    todoList() {
      return this.list.filter((item) => !item.done)
    },
    doneList() {
      return this.list.filter((item) => item.done)
    },
  },
  created() {
    this.list = this.getData()
  },
}
</script>

<style scope>
body {
  background-color: #cdcdcd;
}
</style>
