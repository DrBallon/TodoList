import * as type from './mutation_types';
import ls from './ls';
import { State, Item, ChangeGroup, EditContent } from './IFs';
const logFlag = true;
export default {
  [type.CHANGE_MODE](state: State, newMode: number) {
    state.curMode = newMode;
    ls.write(state);
  },
  [type.CHANGE_STATE](state: State, ItemId: number) {
    state.list.forEach((item) => {
      if (item.id != ItemId) return;
      item.done = !item.done;
    });
    ls.write(state);
  },
  [type.CHANGE_GROUP](state: State, payload: ChangeGroup) {
    state.list.forEach((item) => {
      if (item.id != payload.itemId) return;
      item.group = payload.newGroup;
    });
    ls.write(state);
  },
  [type.EDIT_CONTENT](state: State, payload: EditContent) {
    state.list.forEach((item) => {
      if (item.id != payload.itemId) return;
      item.content = payload.newContent;
    });
    ls.write(state);
  },
  [type.DEL_ITEM](state: State, itemId: number) {
    if (logFlag) console.log('[mutations:delItem]:', itemId);
    state.list.forEach((item, index) => {
      if (item.id != itemId) return;
      state.list.splice(index, 1);
    });
    ls.write(state);
  },
  [type.ADD_ITEM](state: State, content: string) {
    const item: Item = {
      id: 0,
      done: false,
      group: -1,
      content: '',
    };
    item.id = state.list.length == 0 ? 0 : state.list[state.list.length - 1].id + 1;
    item.content = content;
    state.list.push(item);
    ls.write(state);
  },
  [type.ADD_GROUP](state: State, groupTitle: string) {
    const index = state.groups.findIndex((group) => group.title == groupTitle);
    if (index != -1) return;
    const group = { id: 0, title: groupTitle };
    group.id = state.groups.length == 0 ? 0 : state.groups[state.groups.length - 1].id + 1;
    state.groups.push(group);
    ls.write(state);
  },
  [type.DEL_GROUP](state: State, groupId: number) {
    const index = state.groups.findIndex((group) => group.id == groupId);
    if (index == -1) return;
    console.log(index);
    state.groups.splice(index, 1);
    ls.write(state);
  },
};
