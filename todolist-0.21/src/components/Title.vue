<template>
  <div class="title">
    <div class="center">
      <h1>TodoList</h1>
      <input type="text" id="add-todo" placeholder="添加Todo" v-model="content" @blur="blur" />
    </div>
  </div>
</template>

<script>
import { mapActions } from 'vuex';
export default {
  name: 'Title',
  components: {},
  data() {
    //这里存放数据
    return {
      content: '',
    };
  },
  methods: {
    ...mapActions(['addItem']),
    blur: function() {
      if (this.content == '' || this.content.trim() == '') return;
      this.addItem({ content: this.content });
      this.content = '';
    },
  },
};
</script>
<style scoped>
.title {
  width: 100%;
  height: 5rem;
  background-color: #333;
  line-height: 5rem;
}
.center {
  margin: 0 auto;
  width: 600px;
  font-size: 0;
}

.title h1 {
  font-size: 2.5rem;
  margin-left: 0.5rem;
  float: left;
  color: #fff;
  user-select: none;
}
.title input {
  float: right;
  width: 50%;
  height: 3rem;
  margin-top: 1rem;
  margin-right: 0.5rem;
  font-size: 2rem;

  border-radius: 0.5rem;
  padding-left: 1rem;
  box-sizing: border-box;
}
@media screen and (max-width: 600px) {
  .center {
    width: 100%;
    font-size: 0;
  }
}
</style>
