import { Request, Response, NextFunction, Router } from 'express';
import { retData } from '../api/util';
// import { getSession } from '../api/util';
import { GroupDao } from '../models2/Group';
const router = Router();

router.post('/group/add', async (req: Request, res: Response, next: NextFunction) => {
  console.log('==================================================');
  console.log('/group/add');
  let title = req.body.title;
  // let user_id = getSession(req).id;
  let user_id = req.body.userId;
  console.log('user_id', user_id);
  let group = await GroupDao.add(user_id, title);
  if (group) {
    res.send(retData(200, '添加成功', group));
  } else {
    res.send(retData(500, '添加失败'));
  }
});
router.post('/group/del', async (req: Request, res: Response, next: NextFunction) => {
  let id: number = req.body.id;
  let user_id = req.body.userId;
  // let user_id = getSession(req).id;
  let ret1 = await GroupDao.del(user_id, id);
  if (ret1) {
    res.send(retData(200, '删除成功'));
  } else {
    res.send(retData(500, '删除失败'));
  }
});
export default router;
