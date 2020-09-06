<template>
  <div id="header">
    <div class="inner">
      <h1>TodoList</h1>
      <input
        id="add-todo"
        placeholder="添加Todo"
        v-model="newContent"
        @keyup.enter="addItem"
      />
    </div>
  </div>
</template>

<script>
export default {
  name: 'Top',
  data() {
    return {
      newContent: '',
    }
  },
  methods: {
    addItem() {
      if (this.newContent.trim() == '') return
      this.$emit('addItem', this.newContent)
      this.newContent = ''
    },
  },
}
</script>
<style lang="sass" scoped>
#header
  width: 100%
  height: 60px
  background-color: #333
  line-height: 60px
.inner
  margin: 0 auto
  width: 600px
  height: 100%
  h1
    float: left
    color: #fff
  input
    float: right
    height: 30px
    margin-top: 15px
    width: 400px
    border-radius: 5px
    padding-left: 10px
    box-sizing: border-box
</style>
