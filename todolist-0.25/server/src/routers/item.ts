import { Request, Response, NextFunction, Router } from 'express';
import { retData } from '../api/util';
// import { getSession } from '../api/util';
import { ItemDao } from '../models2/Item';
const router = Router();

router.patch('/item/:id', async (req: Request, res: Response, next: NextFunction) => {
  console.log('XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX');
  const id = req.params.id;
  if (!id) {
    return res.send(retData(req, 500, '未设置id', {}));
  }
  const { done, group, content } = req.body;
  const values = JSON.parse(JSON.stringify({ done, group, content }));
  if (JSON.stringify(values) == '{}') {
    return res.send(retData(req, 500, '未设置任何更新数据', {}));
  }
  let ret = await ItemDao.update(parseInt(id), values);
  res.send(!!ret ? retData(req, 200, '修改成功', ret as QueryItem) : retData(req, 500, '修改失败'));
});

router.post('/item', async (req: Request, res: Response, next: NextFunction) => {
  let user_id = req.body.userId;
  let content = req.body.content;
  if (!content || !user_id) {
    res.send(retData(req, 500, '未设置内容'));
    return;
  }
  let ret = await ItemDao.add(user_id, content);

  res.send(retData(req, 200, '添加成功xxx', ret as QueryItem));
});
router.delete('/item/:id', async (req: Request, res: Response, next: NextFunction) => {
  if (!req.params.id) {
    return res.send(retData(req, 500, '未配置id'));
  }
  let id = parseInt(req.params.id);
  let ret = await ItemDao.del(id);
  res.send(!!ret ? retData(req, 200, '修改成功') : retData(req, 500, '修改失败'));
});

// router.post('/item/state', async (req: Request, res: Response, next: NextFunction) => {
//   let { id, done } = req.body;
//   console.log(id, done);
//   let ret1 = await ItemDao.state(id, done);
//   res.send(!!ret1 ? retData(req,200, '修改成功') : retData(req,500, '修改失败'));
// });
// router.post('/item/group', async (req: Request, res: Response, next: NextFunction) => {
//   let { id, group } = req.body;
//   let ret1 = await ItemDao.group(id, group);
//   res.send(ret1 ? retData(req,200, '修改成功') : retData(req,500, '修改失败'));
// });
// router.post('/item/content', async (req: Request, res: Response, next: NextFunction) => {
//   let { id, content } = req.body;
//   let ret1 = await ItemDao.content(id, content);
//   res.send(!!ret1 ? retData(req,200, '修改成功') : retData(req,500, '修改失败'));
// });
// router.post('/item/clear', async (req: Request, res: Response, next: NextFunction) => {
//   // let user_id = getSession(req).id;
//   let user_id = req.body.userId;
//   let ret1 = await ItemDao.clear(user_id);
//   res.send(!!ret1 ? retData(req,200, '修改成功') : retData(req,500, '修改失败'));
// });
// router.post('/item/del', async (req: Request, res: Response, next: NextFunction) => {
//   let id = req.body.id;
//   let ret1 = await ItemDao.del(id);
//   res.send(!!ret1 ? retData(req,200, '修改成功') : retData(req,500, '修改失败'));
// });
// router.post('/item/add', async (req: Request, res: Response, next: NextFunction) => {
//   let user_id = req.body.userId;
//   let content = req.body.content;
//   if (!content) {
//     res.send(retData(req,500, '未设置内容', {}));
//     return;
//   }
//   let ret = await ItemDao.add(user_id, content);

//   res.send(retData(req,200, '添加成功', ret));
// });

export default router;
