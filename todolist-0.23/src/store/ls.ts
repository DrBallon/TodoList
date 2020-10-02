import { State } from './IFs';
class LS {
  private key: string;
  constructor(key: string) {
    this.key = key;
  }
  read(): State {
    const data = {
      curMode: 0,
      groups: [],
      list: [],
    };
    const lsData: string | null = window.localStorage.getItem(this.key);
    if (lsData == null) {
      return data;
    } else {
      return JSON.parse(lsData.trim());
    }
  }
  write(data: State) {
    console.log('ls write');
    window.localStorage.setItem(this.key, JSON.stringify(data));
  }
  clear() {
    window.localStorage.clear();
  }
}

const ls = new LS('data');
export default ls;
