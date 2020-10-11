import { Request, Response, NextFunction, Router } from 'express';
import { ret, retData } from '../api/retData';
import { getSession, isLogged } from '../api/util';
import { GroupDao } from '../models2/Group';
const router = Router();

router.use(isLogged);

router.post('/group/add', async (req: Request, res: Response, next: NextFunction) => {
  let title = req.body.title;
  let user_id = getSession(req).id;
  let group = await GroupDao.add(user_id, title);
  if (group) {
    res.send(retData(200, '添加成功', group));
  } else {
    res.send(retData(500, '添加失败'));
  }
});
router.post('/group/del', async (req: Request, res: Response, next: NextFunction) => {
  let id: number = req.body.id;
  let ret1 = await GroupDao.del(id);
  res.send(ret('delGroup', !!ret1));
});
export default router;
