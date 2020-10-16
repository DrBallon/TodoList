import axios, { AxiosInstance } from 'axios';
// import store from './index';
interface Params {
  id?: number;
  userId?: number;
  newMode?: number;
  content?: string;
  title?: string;
  done?: boolean;
  group?: number;
  limit?: number;
}
interface From {
  username: string;
  password: string;
}

function setToken(token: string) {
  localStorage.setItem('token', token);
}
function getToken() {
  return localStorage.getItem('token') || '';
}

class Http {
  private instance: AxiosInstance;
  constructor() {
    this.instance = axios.create({
      baseURL: '/api',
      headers: {
        'Content-Type': 'application/json',
      },
    });
    this.instance.interceptors.response.use(
      (response) => {
        // console.log(response.data.token);
        setToken(response.data.token || '');
        const { status, msg, data } = response.data;
        response.data = {
          status,
          msg,
          data,
        };
        return response;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
    this.instance.interceptors.request.use(
      (config) => {
        // console.log(getToken());
        config.headers['token'] = getToken();
        return config;
      },
      (error) => {
        // 对请求错误做些什么
        return Promise.reject(error);
      }
    );
  }
  get(url: string, params?: Params | From) {
    return this.instance.get(url, { params });
  }
  post(url: string, params?: Params | From | File | FormData | { name: string }) {
    return this.instance.post(url, params);
  }
  delete(url: string) {
    return this.instance.delete(url);
  }
  put(url: string, params?: Params | From | File | FormData | { name: string }) {
    return this.instance.put(url, params);
  }
  patch(url: string, params?: Params | From | File | FormData | { name: string }) {
    return this.instance.patch(url, params);
  }

  async getAvatar() {
    const ret = await this.get('/user/avatar');
    return ret ? ret.data : {};
  }
  async register(form: From) {
    const ret = await this.post('/user', form);
    return ret ? ret.data : {};
  }
  async login(form: From) {
    const ret = await this.post('/token', form);
    return ret ? ret.data : {};
  }
  async logout() {
    const ret = await this.delete('/token');
    return ret ? ret.data : {};
  }
  async getData() {
    const data = await this.get('/user/data');
    return data ? data.data : {};
  }
  async clearItem() {
    const data = await this.delete('/user/item');
    return data ? data.data.data : {};
  }
  async setMode(newMode: number) {
    const data = await this.post('/user/mode', { newMode });
    return data ? data.data.data : {};
  }
  async addItem(content: string) {
    const data = await this.post('item', { content });
    return data ? data.data.data : {};
  }
  async delItem(id: number) {
    const data = await this.delete('item/' + id);
    return data ? data.data.data : {};
  }
  async modifyItem(id: number, updateData: { done?: boolean; content?: string; group?: number }) {
    if (JSON.stringify(updateData) == '{}') {
      return { msg: '参数设置出错，全都是空' };
    }
    const data = await this.instance.patch(`/item/${id}`, JSON.parse(JSON.stringify(updateData)));
    return data ? data.data.data : {};
  }
  async addGroup(title: string) {
    const data = await this.post('/group', { title });
    return data ? data.data.data : {};
  }
  async delGroup(id: number) {
    const data = await this.delete('/group/' + id);
    return data ? data.data.data : {};
  }
  async setAvatar(tempFileName: string) {
    const data = await this.post('user/avatar', { name: tempFileName });
    return data ? data.data : {};
  }
}
const http = new Http();
export default http;
