import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
// import { UserDao } from '../models2/User';
import { retData } from './util';
const priavteKey = 'ABCDEFG';
interface token {
  username: string;
  userId: number;
  iat: string;
  exp: string;
}
class Token {
  static create = (username: string, userId: number): string => {
    let token = jwt.sign({ username, userId }, priavteKey, { expiresIn: '1h', noTimestamp: true });
    return token;
  };
  static vertify = (token: string): token | null => {
    try {
      let decoded = jwt.verify(token, priavteKey);
      return decoded as token;
    } catch (error) {
      console.log('[Token Error]:', error);
      return null;
    }
  };
  static auth = async (req: Request, res: Response, next: NextFunction) => {
    if (req.path == '/login') {
      next();
      return;
    }
    let token = req.headers['token'] as string;
    let decoded = Token.vertify(token);
    if (!token || !decoded) {
      res.send(retData(500, '未登录'));
      return;
    }
    req.body.userId = decoded.userId;
    req.body.username = decoded.username;
    next();
  };
}
export default Token;
