import { Request, Response, NextFunction, Router } from 'express';
import path from 'path';
import fs from 'fs';
import Token from '../api/token';
import { retData, copyFile, getMD5Password } from '../api/util';
import { UserDao } from '../models2/User';
import { ItemDao } from '../models2/Item';
import chalk from 'chalk';

const router = Router();

router.delete('/token', async (req: Request, res: Response) => {
  const username = req.body.username;
  Token.set(username, '');
  res.send(retData(req, 200, '退出成功'));
});

router.post('/token', async (req: Request, res: Response, next: NextFunction) => {
  console.log('==========login==========');
  let { username, password } = req.body;
  const user = await UserDao.findOne({ username });
  if (user) {
    const user = await UserDao.findOne({ username, password: getMD5Password(password) });
    if (user) {
      // req.session && (req.session[username] = { username, id: user['id'] });
      // res.cookie('username', username, { maxAge: 60 * 60 * 1000, httpOnly: true });

      // res.send(retData(req,200, '登陆成功', { token: await Token.create(username, user['id']) }));

      try {
        const token = Token.create(username, user['id']);

        Token.set(username, token);
        res.send(retData(req, 200, '登录成功', {}, token));
      } catch (error) {
        console.log(error);
      }
    } else {
      res.send(retData(req, 500, '密码不对'));
    }
  } else {
    res.send(retData(req, 500, '用户不存在'));
  }
});

router.delete('/user/items', async (req: Request, res: Response, next: NextFunction) => {
  // let user_id = getSession(req).id;
  let user_id = req.body.userId;
  let ret1 = await ItemDao.clear(user_id);
  res.send(!!ret1 ? retData(req, 200, '修改成功') : retData(req, 500, '修改失败'));
});
router.post('/user', async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.send(retData(req, 500, '账户或者密码未设置'));
    return;
  }
  const userExist = await UserDao.findOne({ username });

  if (userExist) {
    res.send(retData(req, 500, '用户已存在'));
  } else {
    let user = await UserDao.add(username, getMD5Password(password));
    console.log(chalk.red(user));
    if (user) {
      res.send(retData(req, 200, '注册成功', user as QueryUser));
    } else {
      res.send(retData(req, 500, '用户信息保存出错'));
    }
  }
});
router.post('/user/mode', async (req: Request, res: Response, next: NextFunction) => {
  let newMode: number = req.body.newMode;
  let user_id = req.body.userId;
  let ret = await UserDao.setMode(user_id, newMode);
  console.log(ret);
  res.send(ret ? retData(req, 200, '设置成功') : retData(req, 500, '设置失败'));
});
router.post('/user/avatar', async (req: Request, res: Response, next: NextFunction) => {
  let name: string = req.body.name;
  let user_id = req.body.userId;
  let path1 = path.dirname(__dirname);
  let image = path.join(path1, '/temp', name);
  let target = path.join(path1, '/images', name);
  fs.stat(image, (err, stats) => {
    if (err) {
      res.send(retData(req, 500, '图片不存在'));
    } else {
      try {
        copyFile(image, target, () => {
          let ret = UserDao.setAvatar(user_id, name);
          res.send(ret ? retData(req, 200, '设置成功') : retData(req, 500, '设置失败'));
        });
      } catch (error) {
        res.send(retData(req, 500, '设置出错'));
      }
    }
  });
});
// router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
//   console.log('==========login==========');
//   let { username, password } = req.body;
//   const user = await UserDao.findOne({ username });
//   if (user) {
//     const user = await UserDao.findOne({ username, password: getMD5Password(password) });
//     if (user) {
//       // req.session && (req.session[username] = { username, id: user['id'] });
//       // res.cookie('username', username, { maxAge: 60 * 60 * 1000, httpOnly: true });

//       // res.send(retData(req,200, '登陆成功', { token: await Token.create(username, user['id']) }));
//       const token = Token.create(username, user['id']);

//       res.send({
//         status: 200,
//         token: token,
//         msg: '登陆成功',
//         data: {},
//       });
//     } else {
//       res.send(retData(req,500, '密码不对'));
//     }
//   } else {
//     res.send(retData(req,500, '用户不存在'));
//   }
// });
// router.get('/logout', (req: Request, res: Response) => {
//   // req.session && req.session.destroy((err) => {});
//   res.send({
//     status: 200,
//     msg: '退出成功',
//     data: {},
//   });
// });
export default router;
