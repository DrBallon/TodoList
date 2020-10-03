import { Commit, ActionTree } from 'vuex';
import { State, ChangeGroup, EditContent, ChangeState } from './IFs';
import http from './api';
// const async changeMode: Action<State, State> = (context: { commit: Commit }, newMode: number) => {
//   const ret =await http.setMode(USER_ID,newMode)
//   context.commit('CHANGE_MODE', newMode);
// };
async function setData(context: { commit: Commit }) {
  try {
    const data = await http.getData();
    console.log('data:', data);
    context.commit('SET_DATA', data);
  } catch (error) {
    console.log(error);
  }
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
  context.commit('ADD_GROUP', groupTitle);
  try {
    await http.addGroup(groupTitle);
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
};
export default actions;
