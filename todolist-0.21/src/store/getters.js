export default {
  getGroups(state) {
    let groups = [{ id: -1, title: '默认' }];
    state.groups.forEach((group) => {
      groups.push({
        id: group.id,
        title: group.title,
      });
    });
    return groups;
  },
  getCurMode(state) {
    return state.curMode;
  },
  groups(state) {
    if (state.curMode == 0) {
      let group1 = { title: '正在进行', id: -1, list: [] };
      let group2 = { title: '已完成', id: -1, list: [] };
      state.list.forEach((item) => {
        if (item.done) {
          group2.list.push(item);
        } else {
          group1.list.push(item);
        }
      });
      return [group1, group2];
    }
    let temp = {};
    let groupArr = [];
    state.groups.forEach((group) => {
      temp[group.id] = { id: group.id, title: group.title, list: [] };
    });
    temp['-1'] = { id: -1, title: '未分组', list: [] };
    state.list.forEach((item) => {
      temp[item.group].list.push(item);
    });
    for (let key in temp) {
      groupArr.push(temp[key]);
    }
    return groupArr;
  },
};
