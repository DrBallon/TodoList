const retStatTypes = {
  success: 200,
  error: 500,
};
const retMsg = {
  setMode: ['成功', '没有找到用户'],
  getAvatar: ['成功', '未登录'],
  login: ['登录成功', '登录失败'],
  addGroup: ['添加成功', '添加失败'],
  delGroup: ['删除成功', '删除失败'],
  changeState: ['修改成功', '修改失败'],
  changGroup: ['修改成功', '修改失败'],
  editContent: ['修改成功', '修改失败'],
  delItem: ['删除成功', '删除失败'],
  addItem: ['添加成功', '添加失败'],
  register: ['注册成功', '注册失败'],
};
export function retData(status = 200, msg = '', data = {}) {
  return {
    status,
    msg,
    data,
  };
}
export function ret(type: string, condtion: boolean, data?: Object) {
  let status = condtion ? retStatTypes.success : retStatTypes.error;
  let msg = '';
  let index = condtion ? 0 : 1;
  if (
    type == 'setMode' ||
    type == 'getAvatar' ||
    type == 'login' ||
    type == 'addGroup' ||
    type == 'delGroup' ||
    type == 'changeState' ||
    type == 'delGroup' ||
    type == 'delItem' ||
    type == 'changGroup' ||
    type == 'addItem'
  ) {
    msg = retMsg[type][index];
  } else {
    msg = '';
  }
  return {
    status,
    msg,
    data: data || {},
  };
}
