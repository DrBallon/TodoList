// import ls from './ls';
// import http from './api';
import { State } from './IFs';
// const state: State = (ls.read() as State) || { curMode: 0, groups: [], list: [] };
// const state: State = ls.read() as State;

const state: State = {
  curMode: 0,
  groups: [],
  list: [],
};
export default state;
