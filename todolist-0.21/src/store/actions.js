export default {
  changeMode: ({ commit }, payload) => commit('CHANGE_MODE', payload),
  changeState: ({ commit }, payload) => commit('CHANGE_STATE', payload),
  changeGroup: ({ commit }, payload) => commit('CHANGE_GROUP', payload),
  editContent: ({ commit }, payload) => commit('EDIT_CONTENT', payload),
  delItem: ({ commit }, payload) => commit('DEL_ITEM', payload),
  addItem: ({ commit }, payload) => commit('ADD_ITEM', payload),
  addGroup: ({ commit }, payload) => commit('ADD_GROUP', payload),
  delGroup: ({ commit }, payload) => commit('DEL_GROUP', payload),
};
