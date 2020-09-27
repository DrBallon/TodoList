<template>
  <div id="app">
    <Title></Title>
    <Content></Content>
    <Tools></Tools>
  </div>
</template>

<script>
import Title from '@/components/Title';
import Content from '@/components/Content';
import Tools from '@/components/Tools';
export default {
  name: 'App',
  components: {
    Title,
    Content,
    Tools,
  },
};
</script>

<style>
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
