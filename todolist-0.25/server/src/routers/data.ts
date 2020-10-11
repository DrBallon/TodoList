/// <reference path="../main.d.ts" />
import { Request, Response, Router } from 'express';
import { UserDao } from '../models2/User';
import { isLogged } from '../api/util';
import { ItemDao } from '../models2/Item';
import { GroupDao } from '../models2/Group';
const router = Router();
router.use(isLogged);
router.get('/data', async function getData(req: Request, res: Response) {
  console.log('==========getData==========');
  let retData: RetData = {
    curMode: 0,
    groups: [],
    list: [],
    avatar: '',
  };
  const user = await UserDao.findOne({ username: req.cookies['username'] });
  // console.log('user:', user);
  // console.log(chalk.red('user:', JSON.stringify(user)));
  let userId = (user && user.id) || false;

  const items = userId == false ? [] : await ItemDao.findByUserId(userId);
  // console.log(chalk.red('items:', JSON.stringify(items)));

  let groups = userId == false ? [] : await GroupDao.findByUserId(userId);
  (items as QueryItem[]).forEach((item) => {
    retData.list.push(item);
  });
  (groups as QueryGroup[]).forEach((group) => retData.groups.push(group));
  retData.curMode = user ? user.curMode : 0;
  const avatar = user && user.avatar != '' ? 'http://localhost:3000/' + user.avatar : '';
  retData.avatar = avatar;
  res.send({
    status: 200,
    msg: '成功',
    data: retData,
  });
});

export default router;
