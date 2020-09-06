<template>
  <li class="item" :class="{'done-item':itemData.done}">
    <input
      type="checkbox"
      class="item-state"
      @click="changeState"
      :checked="itemData.done"
    />
    <p v-if="!editable" class="item-content" @click="toggleContent">
      {{ itemData.content }}
    </p>
    <input
      v-else
      type="text"
      ref="editPanel"
      class="item-input"
      v-model="newContent"
      @blur="toggleContent"
    />
    <span class="del-btn" @click="delItem">X</span>
  </li>
</template>

<script>
export default {
  name: 'Item',
  props: ['data'],
  data() {
    //这里存放数据
    return {
      newContent: '',
      itemData: {},
      editable: false,
    }
  },
  methods: {
    delItem() {
      this.$emit('del-item', this.itemData.id)
    },
    changeState() {
      this.$emit('change-state', this.itemData.id)
    },
    toggleContent() {
      this.editable = !this.editable
      if (this.editable) {
        this.newContent = this.itemData.content
        this.$nextTick(() => {
          this.$refs.editPanel.focus()
        })
      } else {
        if (
          this.newContent.trim() != this.itemData.content &&
          this.newContent.trim() != ''
        ) {
          this.itemData.content = this.newContent
          this.$emit('edit-item', this.itemData)
        }
      }
    },
  },
  created() {
    this.itemData = this.data
    this.newContent = this.itemData.content
  },
}
</script>
<style lang="sass" scoped>
.item
  height: 40px
  line-height: 40px
  background-color: #fff
  border-radius: 5px
  vertical-align: middle
  margin: 10px 0

.done-item
  background-color: #dddddd

.item-content
  float: left
  margin-left: 10px
  width: 300px
  font-size: 20px
  user-select: none

.item-input
  display: block
  font-size: 20px
  margin-left: 10px
  margin-top: 5px
  line-height: 40px
  height: 30px
  width: 300px
  box-sizing: border-box
  float: left

.item-input:focus
  border: 1px solid black

.item-state
  width: 30px
  height: 30px
  margin-left: 10px
  margin-top: 5px
  float: left

.del-btn
  float: right
  margin-right: 20px
  font-size: 30px
  user-select: none
</style>
