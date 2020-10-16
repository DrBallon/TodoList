import { Commit, ActionTree } from 'vuex';
import { State, ChangeGroup, EditContent, ChangeState } from './IFs';
import http from './api';
import { Message } from 'element-ui';
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
async function setAvatar(context: { commit: Commit }, name: string) {
  http
    .setAvatar(name)
    .then((ret) => {
      if (ret.status == 200) {
        // console.log('avatar设置成功');
        Message.success('avatar设置成功');
        context.commit('SET_AVATAR', name);
      }
    })
    .catch((err) => {
      Message.error('avatar设置失败');
      console.log(err);
    });
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
    await http.modifyItem(payload.itemId, { done: payload.newState });
  } catch (error) {
    console.log(error);
  }
}
async function changeGroup(context: { commit: Commit }, payload: ChangeGroup) {
  context.commit('CHANGE_GROUP', payload);
  try {
    await http.modifyItem(payload.itemId, { group: payload.newGroup });
  } catch (error) {
    console.log(error);
  }
}
async function editContent(context: { commit: Commit }, payload: EditContent) {
  context.commit('EDIT_CONTENT', payload);
  try {
    await http.modifyItem(payload.itemId, { content: payload.newContent });
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
  setAvatar,
};
export default actions;
