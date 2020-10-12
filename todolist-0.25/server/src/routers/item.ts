import { Request, Response, NextFunction, Router } from 'express';
import { retData } from '../api/util';
// import { getSession } from '../api/util';
import { ItemDao } from '../models2/Item';
const router = Router();

router.post('/item/state', async (req: Request, res: Response, next: NextFunction) => {
  let { id, done } = req.body;
  console.log(id, done);
  let ret1 = await ItemDao.state(id, done);
  res.send(!!ret1 ? retData(200, '修改成功') : retData(500, '修改失败'));
});
router.post('/item/group', async (req: Request, res: Response, next: NextFunction) => {
  let { id, group } = req.body;
  let ret1 = await ItemDao.group(id, group);
  res.send(ret1 ? retData(200, '修改成功') : retData(500, '修改失败'));
});
router.post('/item/content', async (req: Request, res: Response, next: NextFunction) => {
  let { id, content } = req.body;
  let ret1 = await ItemDao.content(id, content);
  res.send(!!ret1 ? retData(200, '修改成功') : retData(500, '修改失败'));
});
router.post('/item/clear', async (req: Request, res: Response, next: NextFunction) => {
  // let user_id = getSession(req).id;
  let user_id = req.body.userId;
  let ret1 = await ItemDao.clear(user_id);
  res.send(!!ret1 ? retData(200, '修改成功') : retData(500, '修改失败'));
});
router.post('/item/del', async (req: Request, res: Response, next: NextFunction) => {
  let id = req.body.id;
  let ret1 = await ItemDao.del(id);
  res.send(!!ret1 ? retData(200, '修改成功') : retData(500, '修改失败'));
});
router.post('/item/add', async (req: Request, res: Response, next: NextFunction) => {
  let user_id = req.body.userId;
  let content = req.body.content;
  if (!content) {
    res.send(retData(500, '未设置内容', {}));
    return;
  }
  let ret = await ItemDao.add(user_id, content);

  res.send(retData(200, '添加成功', ret));
});
export default router;
