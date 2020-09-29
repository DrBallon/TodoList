<template>
  <div id="app">
    <Title></Title>
    <Content></Content>
    <Tools></Tools>
  </div>
</template>
<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import Title from '@/components/Title.vue';
import Content from '@/components/Content.vue';
import Tools from '@/components/Tools.vue';
@Component({
  components: {
    Tools,
    Title,
    Content,
  },
})
export default class App extends Vue {
  testItem = {
    id: 0,
    group: 0,
    content: 0,
    done: false,
  };
}
</script>

<style lang="scss">
* {
  margin: 0;
  padding: 0;
}
html {
  overflow: hidden;
  font-size: 12px;
  height: 100%;
}
body {
  background-color: #cdcdcd;
  position: relative;
  height: 100%;
}
input,
button {
  border: none;
  outline: none;
}

select {
  border: none;
  outline: none;
  appearance: none;
  -webkit-appearance: none;
  -moz-appearance: none;
}

li {
  list-style: none;
}
.clearfix::after {
  content: '';
  display: block;
  height: 0px;
  clear: both;
}
@media screen and (max-width: 600px) {
  html {
    overflow: hidden;
    font-size: 10px;
    height: 100%;
  }
}
</style>
