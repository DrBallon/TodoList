import { Request, Response, Router } from 'express';
import { AccountDao } from '../models/User';
import { isLogged } from '../api/util';
import { ItemDao } from '../models/Item';
import { GroupDao } from '../models/Group';
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
  const user = await AccountDao.findOne({ username: req.cookies['username'] });
  let userId = user && user._id;

  const items = await ItemDao.findByUserId(userId);

  let groups: Group[] = await GroupDao.hasUserId(userId);
  items.forEach((item) => retData.list.push(item));
  groups.forEach((group) => retData.groups.push(group));
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
