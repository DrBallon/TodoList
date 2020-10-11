export interface Group {
  id: number;
  title: string;
}
export interface Item {
  id: number;
  done: boolean;
  content: string;
  group: number;
}
export interface State {
  curMode: number;
  groups: Group[];
  list: Item[];
  avatar: string;
  showPanel: boolean;
  panelType: 0 | 1 | 2;
}
//actions payload

export interface TogglePanel {
  showPanel: boolean;
  panelType: 0 | 1 | 2;
}

export interface ChangeGroup {
  itemId: number;
  newGroup: number;
}
export interface EditContent {
  itemId: number;
  newContent: string;
}
export interface ChangeState {
  itemId: number;
  newState: boolean;
}
//getters
export interface List {
  id: number;
  title: string;
  list: Item[];
}
export interface GroupedList {
  [groupId: number]: List;
}
