import { State, Group, List, GroupedList } from './IFs';

export default {
  getGroups(state: State) {
    const groups = [{ id: -1, title: '默认' }];
    state.groups.forEach((group) => {
      groups.push({
        id: group.id,
        title: group.title,
      });
    });
    return groups;
  },
  getCurMode(state: State) {
    return state.curMode;
  },
  groups(state: State) {
    if (state.curMode == 0) {
      const group1: List = { title: '正在进行', id: -1, list: [] };
      const group2: List = { title: '已完成', id: -1, list: [] };
      state.list.forEach((item) => {
        if (item.done) {
          group2.list.push(item);
        } else {
          group1.list.push(item);
        }
      });
      return [group1, group2];
    }
    const temp: GroupedList = {
      '-1': { id: -1, title: '未分组', list: [] },
    };
    const groupArr: Group[] = [];
    state.groups.forEach((group) => {
      temp[group.id] = { id: group.id, title: group.title, list: [] };
    });
    state.list.forEach((item) => {
      temp[item.group].list.push(item);
    });
    for (const key in temp) {
      groupArr.push(temp[key]);
    }
    return groupArr;
  },
};
