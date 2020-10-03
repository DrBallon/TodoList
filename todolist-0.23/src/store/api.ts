import axios from 'axios';
interface Params {
  id?: number;
  userId?: number;
  newMode?: number;
  content?: string;
  title?: string;
  done?: boolean;
  group?: number;
}

// 添加请求拦截器
axios.interceptors.request.use(
  function(config) {
    console.log(config);
    return config;
  },
  function(error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  }
);

// 添加
class Http {
  private instance = axios.create({
    baseURL: '/api',
  });
  get(url: string, params: Params) {
    return this.instance.get(url, { params });
  }
  post(url: string, params: Params) {
    console.log(params);
    return this.instance.post(url, params);
  }
  async getData() {
    const data = await this.get('/data', {});
    return data ? data.data.data : {};
  }
  async clearItem() {
    const data = await this.post('/item/clear', {});
    return data ? data.data.data : {};
  }
  async setMode(newMode: number) {
    const data = await this.post('mode/set', { newMode });
    return data ? data.data.data : {};
  }
  async addItem(content: string) {
    const data = await this.post('item/add', { content });
    return data ? data.data.data : {};
  }
  async delItem(id: number) {
    const data = await this.post('item/del', { id });
    return data ? data.data.data : {};
  }
  async changeState(id: number, newState: boolean) {
    const data = await this.post('item/state', { id, done: newState });
    console.log('[changeState]:', data);
    return data ? data.data.data : {};
  }
  async changeContent(id: number, content: string) {
    const data = await this.post('item/content', { id, content });
    return data ? data.data.data : {};
  }
  async changeGroup(id: number, newGroup: number) {
    const data = await this.post('item/group', { id, group: newGroup });
    return data ? data.data.data : {};
  }
  async addGroup(title: string) {
    const data = await this.post('group/add', { title });
    return data ? data.data.data : {};
  }
  async delGroup(id: number) {
    const data = await this.post('group/del', { id });
    return data ? data.data.data : {};
  }
}
const http = new Http();
export default http;
