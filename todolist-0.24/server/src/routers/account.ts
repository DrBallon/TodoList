import { User, findOneUser } from './../models/User';
import { Request, Response, NextFunction } from 'express';
import { retData } from '../api/retData';
import { getMD5Password } from '../api/util';
export const logout = (req: Request, res: Response) => {
  req.session && req.session.destroy((err) => {});
  res.send({
    status: 200,
    msg: '退出成功',
    data: {},
  });
};

export const login = async (req: Request, res: Response, next: NextFunction) => {
  console.log('==========login==========');
  let { username, password } = req.body;
  const user = await findOneUser({ username });
  if (user) {
    const user = await findOneUser({ username, password: getMD5Password(password) });
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
};
export const register = async (req: Request, res: Response, next: NextFunction) => {
  let { username, password } = req.body;
  if (!username || !password) {
    res.send(retData(500, '账户或者密码未设置'));
    return;
  }
  const userExist = await findOneUser({ username });

  if (userExist) {
    res.send(retData(500, '用户已存在'));
  } else {
    const user = new User({
      _id: 0,
      username,
      password: getMD5Password(password),
      curMode: 0,
      groups: [],
      list: [],
      avatar: '',
    });
    user.save((err, user) => {
      if (err) {
        res.send(retData(500, '用户信息保存出错'));
        next(err);
      } else {
        res.send(retData(200, '注册成功', user));
      }
    });
  }
};
