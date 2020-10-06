import Mock from 'mockjs';
const ItemTemp = {
  'id|0-100': 0,
  'done|1-1': true,
  'content|5-10': '',
  group: -1,
};
// const GroupTemp = {
//   'id|0-100': 0,
//   'title|5-10': '',
// };
Mock.mock(/^[http://localhost:3000/data]/, 'get', {
  status: 200,
  msg: 'success',
  data: Mock.mock({
    curMode: 1,
    groups: [
      {
        id: 0,
        title: '正在进行',
      },
      {
        id: 1,
        title: '已完成',
      },
      {
        id: 2,
        title: '测试分组',
      },
    ],
    'list|10-20': [ItemTemp],
  }),
});
// /*
//     additem
// */
// Mock.mock(/^[http://localhost:3000/item/add]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: Mock.mock(ItemTemp),
// });
// /*
//     delitem
// */
// Mock.mock(/^[http://localhost:3000/item/dele]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: Mock.mock(ItemTemp),
// });
// /*
//     setMode
// */
// Mock.mock(/^[http://localhost:3000/mode/set]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: Mock.mock({}),
// });
// /*
//     changeState
// */
// Mock.mock(/^[http://localhost:3000/item/state]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: {},
// });
// /*
//     changeState
// */
// Mock.mock(/^[http://localhost:3000/item/content]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: {},
// });
// /*
//     changeGroup
// */
// Mock.mock(/^[http://localhost:3000/item/group]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: {},
// });
// /*
//     addGroup
// */
// Mock.mock(/^[http://localhost:3000/group/add]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: {},
// });
// /*
//     delGrop
// */
// Mock.mock(/^[http://localhost:3000/group/del]/, 'post', {
//   status: 200,
//   msg: 'success',
//   data: {},
// });
