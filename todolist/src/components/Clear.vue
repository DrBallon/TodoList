<template>
<div class="inner">
  <input type="button" @click="clear" class="clear inner" value="清空" />
</div>
</template>

<script>
export default {
  name: 'Clear',
  methods: {
    clear() {
      this.$emit('clear')
    },
  },
}
</script>
<style lang="sass" scoped>
.inner
  margin: 0 auto
  width: 600px
  .clear
    font-size: 20px
    height: 40px
    border-radius: 5px
    background-color: #333
    color: #fff
</style>
