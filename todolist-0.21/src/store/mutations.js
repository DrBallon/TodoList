import * as type from './mutation_types';
import ls from './ls';

export default {
  [type.CHANGE_MODE](state, payload) {
    state.curMode = payload.mode;
    ls.write(state);
  },
  [type.CHANGE_STATE](state, payload) {
    state.list.forEach((item) => {
      if (item.id != payload.id) return;
      item.done = !item.done;
    });
    ls.write(state);
  },
  [type.CHANGE_GROUP](state, payload) {
    console.log(payload);
    state.list.forEach((item) => {
      if (item.id != payload.id) return;
      item.group = payload.groupId;
    });
    ls.write(state);
  },
  [type.EDIT_CONTENT](state, payload) {
    state.list.forEach((item) => {
      if (item.id != payload.id) return;
      item = payload.data;
    });
    ls.write(state);
  },
  [type.DEL_ITEM](state, payload) {
    state.list.forEach((item, index) => {
      if (item.id != payload.id) return;
      state.list.splice(index, 1);
    });
    ls.write(state);
  },
  [type.ADD_ITEM](state, payload) {
    let item = {
      id: 0,
      group: -1,
      content: '',
    };
    item.id = state.list.length == 0 ? 0 : state.list[state.list.length - 1].id + 1;
    item.content = payload.content;
    state.list.push(item);
    ls.write(state);
  },
  [type.ADD_GROUP](state, payload) {
    let index = state.groups.findIndex((group) => group.title == payload.title);
    if (index != -1) return;
    let group = { id: 0, title: payload.title };
    group.id = state.groups.length == 0 ? 0 : state.groups[state.groups.length - 1].id + 1;
    state.groups.push(group);
    ls.write(state);
  },
  [type.DEL_GROUP](state, payload) {
    let index = state.groups.findIndex((group) => group.id == payload.id);
    if (index == -1) return;
    console.log(index);
    state.groups.splice(index, 1);
    ls.write(state);
  },
};
