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
}
//actions payload
export interface ChangeGroup {
  itemId: number;
  newGroup: number;
}
export interface EditContent {
  itemId: number;
  newContent: string;
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
