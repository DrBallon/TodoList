//数据库查询结果
type ModelType = QueryGroup | QueryItem | QueryUser;

interface QueryGroup {
  id: number;
  user_id: number;
  title: string;
}
interface QueryItem {
  id: number;
  done: boolean;
  content: string;
  group: number;
}

interface RetData {
  curMode: number;
  groups: QueryGroup[];
  list: QueryItem[];
  avatar: string;
}
interface QueryUser {
  id: number;
  username: string;
  password: string;
  curMode: number;
  groups: Array<QueryGroup>;
  avatar: string;
}

//查询参数
interface FindOneUser {
  username: string;
  password?: string;
}
