import { Request, Response, NextFunction } from 'express';
import { User } from '../models/User';
import { ret } from '../api/retData';
import { isLogged } from '../api/util';
export const setMode = async (req: Request, res: Response, next: NextFunction) => {
  let newMode: number = req.body.newMode;
  User.findByIdAndUpdate(0, { curMode: newMode }).exec((err) => {
    if (err) next(err);
    res.send(ret('setMode', !err));
  });
};

export const getAvatar = async (req: Request, res: Response, next: NextFunction) => {
  let user = await User.findOne({ username: req.cookies['username'] });
  const avatar = user && user.avatar != '' ? 'http://localhost:3000/' + user.avatar : '';
  res.send(
    ret('getAvatar', isLogged(req, res), {
      avatar,
    })
  );
};
