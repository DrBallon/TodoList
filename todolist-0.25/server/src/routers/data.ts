/// <reference path="../main.d.ts" />
import { Request, Response, Router } from 'express';
import { UserDao } from '../models2/User';
import { isLogged } from '../api/util';
import { ItemDao } from '../models2/Item';
import { GroupDao } from '../models2/Group';
import chalk from 'chalk';
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

  // console.log(chalk.red('user:', JSON.stringify(user)));
  let userId = user && user.id;

  const items = await ItemDao.findByUserId(userId);
  // console.log(chalk.red('items:', JSON.stringify(items)));

  let groups = await GroupDao.findByUserId(userId);
  // console.log(chalk.red('groups:', JSON.stringify(groups)));

  (items as Item[]).forEach((item) => {
    retData.list.push(item);
  });
  (groups as Group[]).forEach((group) => retData.groups.push(group));
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
