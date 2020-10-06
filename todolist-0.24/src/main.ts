import Vue from 'vue';
import App from './App.vue';
import store from './store';
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
import './store/Mock';
import { dispatchChangeGroup, dispatchEditContent } from './store';
import './assets/icon/iconfont.css';
import './assets/styles/reset.scss';
import './assets/styles/base.scss';

Vue.use(ElementUI);
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
