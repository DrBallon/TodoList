import * as type from './mutation_types';
import { State, Item, ChangeGroup, EditContent, Group } from './IFs';
const logFlag = true;
export default {
  [type.CHANGE_PANELTYPE](state: State, type: 0 | 1 | 2) {
    state.panelType = type;
  },
  [type.TOGGLE_PANEL](state: State, show: boolean) {
    state.showPanel = show;
  },
  [type.SET_DATA](state: State, data: State) {
    state.curMode = data.curMode;
    state.groups = data.groups;
    state.list = data.list;
    state.avatar = data.avatar;
    state.showPanel = data.showPanel;
    state.panelType = data.panelType;
  },
  [type.SET_AVATAR](state: State, name: string) {
    state.avatar = 'http://localhost:3000/' + name;
  },
  [type.CLEAR_ITEM](state: State) {
    console.log('clear_item');
    state.list = [];
  },
  [type.CHANGE_MODE](state: State, newMode: number) {
    state.curMode = newMode;
  },
  [type.CHANGE_STATE](state: State, ItemId: number) {
    state.list.forEach((item) => {
      if (item.id != ItemId) return;
      item.done = !item.done;
    });
  },
  [type.CHANGE_GROUP](state: State, payload: ChangeGroup) {
    state.list.forEach((item) => {
      if (item.id != payload.itemId) return;
      item.group = payload.newGroup;
    });
  },
  [type.EDIT_CONTENT](state: State, payload: EditContent) {
    state.list.forEach((item) => {
      if (item.id != payload.itemId) return;
      item.content = payload.newContent;
    });
  },
  [type.DEL_ITEM](state: State, itemId: number) {
    if (logFlag) console.log('[mutations:delItem]:', itemId);
    state.list.forEach((item, index) => {
      if (item.id != itemId) return;
      state.list.splice(index, 1);
    });
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
  },
  [type.ADD_GROUP](state: State, group: Group) {
    state.groups.push(group);
  },
  [type.DEL_GROUP](state: State, groupId: number) {
    const index = state.groups.findIndex((group) => group.id == groupId);
    let i = 0;
    console.log(i++);
    if (index == -1) return;
    state.groups.splice(index, 1);
    console.log(i++);
    state.list.forEach((item) => {
      if (item.group == groupId) {
        item.group = -1;
      }
    });
    console.log(i++);
  },
};
