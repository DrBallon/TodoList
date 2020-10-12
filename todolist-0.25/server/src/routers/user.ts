import { Request, Response, NextFunction, Router } from 'express';
import path from 'path';
import fs from 'fs';
import { UserDao } from '../models2/User';
import { retData, copyFile } from '../api/util';
import { getSession, isLogged } from '../api/util';

const router = Router();
router.use(isLogged);

router.post('/user/mode', async (req: Request, res: Response, next: NextFunction) => {
  let newMode: number = req.body.newMode;
  let user_id = getSession(req).id;
  let ret = await UserDao.setMode(user_id, newMode);
  res.send(ret ? retData(200, '设置成功') : retData(500, '设置失败'));
});
router.post('/user/avatar', async (req: Request, res: Response, next: NextFunction) => {
  let name: string = req.body.name;
  let user_id = getSession(req).id;
  console.log(name, user_id);
  console.log('__dirname:', __dirname);
  console.log('path.dirname(__dirname):', path.dirname(__dirname));
  let path1 = path.dirname(__dirname);
  let image = path.join(path1, '/temp', name);
  let target = path.join(path1, '/images', name);
  console.log(image);
  console.log(target);
  fs.stat(image, (err, stats) => {
    if (err) {
      res.send(retData(500, '图片不存在'));
    } else {
      try {
        copyFile(image, target, () => {
          let ret = UserDao.setAvatar(user_id, name);
          res.send(ret ? retData(200, '设置成功') : retData(500, '设置失败'));
        });
      } catch (error) {
        res.send(retData(500, '设置出错'));
      }
    }
  });
  // res.send(ret ? retData(200, '设置成功') : retData(500, '设置失败'));
});
export default router;
