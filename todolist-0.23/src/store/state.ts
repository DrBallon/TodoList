import ls from './ls';
import http from './api';
import { State } from './IFs';
// const state: State = (ls.read() as State) || { curMode: 0, groups: [], list: [] };
const state: State = ls.read() as State;
// http.getData();
// http.addItem('xxx');
// http.delItem('5f292662b963b049a035165b');
// http.setMode('5f292662b963b049a035165b', 1);
// http.changeState('5f292662b963b049a035165b');
// http.changeGroup('5f292662b963b049a035165b');
// http.addGroup('5f292662b963b049a035165b');
http.delGrop('5f292662b963b049a035165b');

export default state;
