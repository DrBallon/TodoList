import { Commit, ActionTree } from 'vuex';
import { State, ChangeGroup, EditContent, ChangeState } from './IFs';
import http from './api';
async function togglePanel(context: { commit: Commit }, show: boolean) {
  context.commit('TOGGLE_PANEL', show);
}
async function changePanelType(context: { commit: Commit }, type: 0 | 1 | 2) {
  context.commit('CHANGE_PANELTYPE', type);
}
async function setData(context: { commit: Commit }, payload: State) {
  payload = payload || {
    curMode: 0,
    groups: [],
    list: [],
    avatar: '',
    showPanel: true,
    panelType: 0,
  };
  context.commit('SET_DATA', payload);
}
async function clearItem(context: { commit: Commit }) {
  context.commit('CLEAR_ITEM');
  try {
    await http.clearItem();
  } catch (error) {
    console.log(error);
  }
}
async function changeMode(context: { commit: Commit }, newMode: number) {
  context.commit('CHANGE_MODE', newMode);
  try {
    await http.setMode(newMode);
  } catch (error) {
    console.log(error);
  }
}
async function changeState(context: { commit: Commit }, payload: ChangeState) {
  context.commit('CHANGE_STATE', payload.itemId);
  try {
    console.log(payload);
    await http.changeState(payload.itemId, payload.newState);
  } catch (error) {
    console.log(error);
  }
}
async function changeGroup(context: { commit: Commit }, payload: ChangeGroup) {
  context.commit('CHANGE_GROUP', payload);
  try {
    await http.changeGroup(payload.itemId, payload.newGroup);
  } catch (error) {
    console.log(error);
  }
}
async function editContent(context: { commit: Commit }, payload: EditContent) {
  context.commit('EDIT_CONTENT', payload);
  try {
    await http.changeContent(payload.itemId, payload.newContent);
  } catch (error) {
    console.log(error);
  }
}
async function delItem(context: { commit: Commit }, itemId: number) {
  context.commit('DEL_ITEM', itemId);
  try {
    await http.delItem(itemId);
  } catch (error) {
    console.log(error);
  }
}
async function addItem(context: { commit: Commit }, content: string) {
  context.commit('ADD_ITEM', content);
  try {
    await http.addItem(content);
  } catch (error) {
    console.log(error);
  }
}
async function addGroup(context: { commit: Commit }, groupTitle: string) {
  try {
    const newGroup = await http.addGroup(groupTitle);
    if (newGroup) context.commit('ADD_GROUP', newGroup);
  } catch (error) {
    console.log(error);
  }
}
async function delGroup(context: { commit: Commit }, groupId: number) {
  context.commit('DEL_GROUP', groupId);
  try {
    await http.delGroup(groupId);
  } catch (error) {
    console.log(error);
  }
}

const actions: ActionTree<State, State> = {
  changeMode,
  changeState,
  changeGroup,
  editContent,
  delItem,
  addItem,
  addGroup,
  delGroup,
  setData,
  clearItem,
  togglePanel,
  changePanelType,
};
export default actions;
