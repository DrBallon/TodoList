/// <reference path="../main.d.ts" />
import { Request, Response, Router } from 'express';
import { UserDao } from '../models2/User';
import { ItemDao } from '../models2/Item';
import { GroupDao } from '../models2/Group';
import { retData } from '../api/util';
const router = Router();
router.get('/user/data', async function getData(req: Request, res: Response) {
  // console.log('==========getData==========');
  let ret: RetData = {
    curMode: 0,
    groups: [],
    list: [],
    avatar: '',
  };

  const user = await UserDao.findOne({ username: req.body.username });

  let userId = req.body.userId;

  const items = await ItemDao.findByUserId(userId);

  let groups = await GroupDao.findByUserId(userId);
  (items as QueryItem[]).forEach((item) => {
    ret.list.push(item);
  });
  (groups as QueryGroup[]).forEach((group) => ret.groups.push(group));
  ret.curMode = user ? user.curMode : 0;
  const avatar = user && user.avatar != '' ? 'http://localhost:3000/' + user.avatar : '';
  ret.avatar = avatar;
  res.send(retData(req, 200, '成功', ret));
  // res.send({
  //   status: 200,
  //   msg: '成功',
  //   data: retData,
  // });
});

export default router;
