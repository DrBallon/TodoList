interface Group {
  id: number;
  title: string;
}
interface Item {
  id: number;
  done: boolean;
  content: string;
  group: number;
}

interface RetData {
  curMode: number;
  groups: Group[];
  list: Item[];
  avatar: string;
}
interface UserInfo {
  id: number;
  username: string;
  password: string;
  curMode: number;
  groups: Array<Group>;
  avatar: string;
}
