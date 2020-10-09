import { Request, Response, NextFunction, Router } from 'express';
import { retData } from '../api/retData';
import { getMD5Password } from '../api/util';
import { AccountDao } from '../models/User';
const router = Router();

router.get('/logout', (req: Request, res: Response) => {
  req.session && req.session.destroy((err) => {});
  res.send({
    status: 200,
    msg: '退出成功',
    data: {},
  });
});

router.post('/login', async (req: Request, res: Response, next: NextFunction) => {
  console.log('==========login==========');
  let { username, password } = req.body;
  const user = await AccountDao.findOne({ username });
  if (user) {
    const user = await AccountDao.findOne({ username, password: getMD5Password(password) });
    if (user) {
      req.session && (req.session[username] = { username, id: user._id });
      res.cookie('username', username, { maxAge: 60 * 1000, httpOnly: true });
      res.send(retData(200, '登陆成功'));
    } else {
      res.send(retData(500, '密码不对'));
    }
  } else {
    res.send(retData(500, '用户不存在'));
  }
});
router.post('/register', async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.send(retData(500, '账户或者密码未设置'));
    return;
  }
  const userExist = await AccountDao.findOne({ username });

  if (userExist) {
    res.send(retData(500, '用户已存在'));
  } else {
    let user = await AccountDao.add(username, getMD5Password(password));
    if (user) {
      res.send(retData(200, '注册成功', user));
    } else {
      res.send(retData(500, '用户信息保存出错'));
    }
  }
});

export default router;
