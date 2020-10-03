import axios, { AxiosResponse, AxiosError } from 'axios';
interface Params {
  id?: string;
  userId?: string;
  newMode?: number;
  content?: string;
  title?: string;
}
class Http {
  private instance = axios.create({
    baseURL: 'http://localhost:3000/',
  });
  get(url: string, params: Params, cb: (res: AxiosResponse) => void) {
    this.instance
      .get(url, { params })
      .then((res) => cb(res))
      .catch((err) => {
        if (err) cb(err);
      });
  }
  post(url: string, params: Params, cb: (res: AxiosResponse) => void) {
    this.instance
      .post(url, { params })
      .then((res) => cb(res))
      .catch((err) => {
        if (err) cb(err);
      });
  }
  getData() {
    this.get('data/get', {}, (res) => {
      console.log('getData:', res);
    });
  }
  setMode(userId: string, newMode: number) {
    if (/^[0-9a-fA-F]{24}$/.test(userId) == false) {
      console.log('[setMode]id不符合');
      return;
    }
    this.post('mode/set', { userId, newMode }, (res) => {
      console.log('setMode:', res);
    });
  }
  addItem(content: string) {
    this.post('/item/add', { content }, (res) => {
      console.log('addItem:', res);
    });
  }
  delItem(id: string) {
    if (/^[0-9a-fA-F]{24}$/.test(id) == false) {
      console.log('[delItem]id不符合');
      return;
    }
    this.post('/item/del', { id }, (res) => {
      console.log('delitem:', res);
    });
  }
  changeState(id: string) {
    if (/^[0-9a-fA-F]{24}$/.test(id) == false) {
      console.log('[changeState]id不符合');
      return;
    }
    this.post('/item/state', { id }, (res) => {
      console.log('changeState:', res);
    });
  }
  changeGroup(id: string) {
    if (/^[0-9a-fA-F]{24}$/.test(id) == false) {
      console.log('[changeGroup]id不符合');
      return;
    }
    this.post('/item/group', { id }, (res) => {
      console.log('changeGroup:', res);
    });
  }
  addGroup(title: string) {
    this.post('/group/add', { title }, (res) => {
      console.log('addGroup', res);
    });
  }
  delGrop(id: string) {
    if (/^[0-9a-fA-F]{24}$/.test(id) == false) {
      console.log('[delGroup]id不符合');
      return;
    }
    this.post('/group/del', { id }, (res) => {
      console.log('delGroup:', res);
    });
  }
}
const http = new Http();
export default http;
