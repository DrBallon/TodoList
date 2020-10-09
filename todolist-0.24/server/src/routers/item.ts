import { Request, Response, NextFunction, Router } from 'express';
import { ret, retData } from '../api/retData';
import { getSession, isLogged } from '../api/util';
import { ItemDao } from '../models/Item';
const router = Router();

router.use(isLogged);

router.post('/item/state', async (req: Request, res: Response, next: NextFunction) => {
  let { id, done } = req.body;
  console.log(id, done);
  let ret1 = await ItemDao.state(id, done);
  res.send(ret('changeState', ret1));
});
router.post('/item/group', async (req: Request, res: Response, next: NextFunction) => {
  let { id, group } = req.body;
  let ret1 = await ItemDao.group(id, group);
  res.send(ret('changGroup', ret1));
});
router.post('/item/content', async (req: Request, res: Response, next: NextFunction) => {
  let { id, content } = req.body;
  let ret1 = await ItemDao.content(id, content);
  res.send(ret('editContent', ret1));
});
router.post('/item/clear', async (req: Request, res: Response, next: NextFunction) => {
  let { id } = req.body;
  let ret1 = await ItemDao.clear(id);
  res.send(ret('editContent', ret1));
});
router.post('/item/del', async (req: Request, res: Response, next: NextFunction) => {
  let id = req.body.id;
  let ret1 = await ItemDao.del(id);
  res.send(ret('delItem', ret1));
});
router.post('/item/add', async (req: Request, res: Response, next: NextFunction) => {
  let user_id = getSession(req).id;
  let content = req.body.content;
  if (!content) {
    res.send(retData(500, '未设置内容', {}));
    return;
  }
  let ret1 = await ItemDao.add(user_id, content);

  if (ret1) {
    res.send(retData(200, '添加成功', ret1));
  } else {
    res.send(retData(500, '添加失败'));
  }
});
export default router;
