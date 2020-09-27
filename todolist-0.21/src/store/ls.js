function read() {
  return JSON.parse(window.localStorage.getItem(this.key));
}
function write(data) {
  window.localStorage.setItem(this.key, JSON.stringify(data));
}
function clear() {
  window.localStorage.clear();
}
function LS(key) {
  this.key = key;
  this.read = read;
  this.write = write;
  this.clear = clear;
}
const ls = new LS('data');
export default ls;
