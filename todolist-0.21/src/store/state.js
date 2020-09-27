import ls from './ls';

let state = ls.read() || {
  curMode: 0,
  groups: [],
  list: [],
};
export default state;
