<template>
  <div class="list">
    <h2>
      {{ listTitle }}
      <span class="count">{{ listCount }}</span>
    </h2>
    <ul>
      <item
        v-for="item in list"
        :key="item.id"
        :data="item"
        @change-state="changeState"
        @edit-item="editItem"
        @del-item="delItem"
      ></item>
    </ul>
  </div>
</template>

<script>
import Item from './Item'
export default {
  name: 'List',
  props: ['list', 'title'],
  components: { Item },
  data() {
    //这里存放数据
    return {
      listData: [],
      listTitle: '',
    }
  },
  methods: {
    changeState(id) {
      this.$emit('change-state', id)
    },
    editItem(item) {
      this.$emit('edit-item', item)
    },
    delItem(id) {
      console.log("1");
      this.$emit('del-item', id)
    },
  },
  computed: {
    listCount() {
      return this.listData.length
    },
  },
  watch:{
    list(){
      this.listData=this.list
    }
  },
  created() {
    this.listData=this.list
    this.listTitle = this.title
  },
}
</script>
<style lang="sass" scoped>
.list
  margin: 0 auto
  width: 600px
  height: 100%
  h2
    margin: 20px 0
  .count
    display: block
    width: 50px
    height: 30px
    border-radius: 15px
    background-color: #e6e6fa
    color: #000
    font-size: 20px
    line-height: 30px
    text-align: center
    float: right
</style>
