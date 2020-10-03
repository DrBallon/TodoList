import Vue from 'vue';
import App from './App.vue';
import store from './store';
// import './store/Mock';
// import axios from 'axios';

import { dispatchChangeGroup, dispatchEditContent } from './store';
import './assets/icon/iconfont.css';
Vue.config.productionTip = false;
const mixin = Vue.extend({
  methods: {
    dispatchChangeGroup,
    dispatchEditContent,
  },
});

Vue.mixin(mixin);
new Vue({
  store,
  render: (h) => h(App),
}).$mount('#app');
