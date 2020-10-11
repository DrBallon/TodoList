import Vue from 'vue';
import Vuex from 'vuex';
import actions from './actions';
import state from './state';
import mutations from './mutations';
import getters from './getters';
import { ChangeGroup, EditContent } from './IFs';
Vue.use(Vuex);

const store = new Vuex.Store({
  state,
  actions,
  mutations,
  getters,
});
export default store;

export const dispatchEditContent = (payload: EditContent) => {
  store.dispatch('editContent', payload);
};
export const dispatchChangeGroup = (payload: ChangeGroup) => {
  store.dispatch('changeGroup', payload);
};
