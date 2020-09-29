import { Commit, Action, ActionTree } from 'vuex';
import { State, ChangeGroup, EditContent } from './IFs';
const changeMode: Action<State, State> = (context: { commit: Commit }, newMode: number) =>
  context.commit('CHANGE_MODE', newMode);

const changeState: Action<State, State> = (context: { commit: Commit }, ItemId: number) =>
  context.commit('CHANGE_STATE', ItemId);

const changeGroup: Action<State, State> = (context: { commit: Commit }, payload: ChangeGroup) =>
  context.commit('CHANGE_GROUP', payload);

const editContent: Action<State, State> = (context: { commit: Commit }, payload: EditContent) =>
  context.commit('EDIT_CONTENT', payload);

const delItem: Action<State, State> = (context: { commit: Commit }, itemId: number) =>
  context.commit('DEL_ITEM', itemId);

const addItem: Action<State, State> = (context: { commit: Commit }, content: string) =>
  context.commit('ADD_ITEM', content);

const addGroup: Action<State, State> = (context: { commit: Commit }, groupTitle: string) =>
  context.commit('ADD_GROUP', groupTitle);

const delGroup: Action<State, State> = (context: { commit: Commit }, groupId: number) =>
  context.commit('DEL_GROUP', groupId);

const actions: ActionTree<State, State> = {
  changeMode,
  changeState,
  changeGroup,
  editContent,
  delItem,
  addItem,
  addGroup,
  delGroup,
};
export default actions;
