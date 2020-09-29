import ls from './ls';
import { State } from './IFs';
// const state: State = (ls.read() as State) || { curMode: 0, groups: [], list: [] };
const state: State = ls.read() as State;

export default state;
