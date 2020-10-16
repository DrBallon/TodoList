import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { retData } from './util';
import chalk from 'chalk';
const priavteKey = 'ABCDEFG';
import jsonfile from 'jsonfile';
//过期时间 单位：秒
const EXPIRE_TIME = 5;
const DYING_TIME = (EXPIRE_TIME / 3) * 1;
const DIED_TIME = 0;

interface TokenType {
  username: string;
  userId: number;
  iat: string;
  exp: string;
}

class Token {
  static create = (username: string, userId: number): string => {
    let token = jwt.sign({ username, userId }, priavteKey, { expiresIn: EXPIRE_TIME, noTimestamp: true });
    return token;
  };
  static vertify = (token: string): TokenType | null => {
    try {
      let decoded = jwt.verify(token, priavteKey);
      return decoded as TokenType;
    } catch (error) {
      console.log('[Token Error]');
      return null;
    }
  };
  static decode = (token: string): TokenType => {
    return jwt.decode(token) as TokenType;
  };
  static tokenStatus(token: string) {
    if (!token) {
      console.log(chalk.red('token为空:', token));
      return '';
    }
    let decoded = jwt.decode(token) as { exp: string; username: string; userId: number };
    if (!decoded) {
      console.log(chalk.red('decode为空:', decoded));
      return '';
    }
    const exp = decoded.exp as string;
    const username = decoded.username as string;
    const userId = decoded.userId as number;
    const time = parseInt(decoded.exp as string) - new Date().getTime() / 1000;
    if (time > DYING_TIME) {
      console.log(chalk.green('token很健康，不修改token'));
      return token;
    } else if (time > DIED_TIME && time < DYING_TIME) {
      console.log(chalk.green('token濒死，重新设置并返回新的token'));
      // console.log(chalk.red(token));
      const newToken = Token.create(username, userId);
      // console.log(chalk.red(newToken));
      Token.set(username, newToken);
      return newToken;
    } else {
      console.log(chalk.green('token没救了'));
      let getToken = Token.get(username);
      console.log(token);
      console.log(getToken);

      if (token != getToken) {
        console.log(chalk.green('token不在数据库，返回空'));
        return '';
      }
      // console.log(chalk.red(token));
      const newToken = Token.create(username, userId);
      console.log(chalk.green('token保存在数据库，自然过期，重新设置返回token'));
      // console.log(chalk.red(newToken));
      Token.set(username, newToken);
      return newToken;
    }
  }
  static set = (username: string, token: string) => {
    let obj = jsonfile.readFileSync('./src/api/tokens.json');
    (obj as any)[username] = token;
    jsonfile.writeFileSync('./src/api/tokens.json', obj);
  };
  static get = (username: string) => {
    let obj = jsonfile.readFileSync('./src/api/tokens.json');
    return obj[username];
  };
  static auth = async (req: Request, res: Response, next: NextFunction) => {
    console.log(req.path, req.method);
    console.log('token:', req.headers['token']);
    if (req.path == '/token') return next();

    let token = req.headers['token'] as string;
    if (!token) {
      return res.send(retData(req, 500, 'token为空，请登录'));
    }
    const tokenRet = Token.tokenStatus(token);
    if (!tokenRet) {
      return res.send(retData(req, 500, 'token不在数据库内，无效'));
    }
    // if (!token) return res.send(retData(req,500, '未登录'));

    // let decoded = Token.vertify(token);
    // if (!decoded) return res.send(retData(req,500, '未登录'));

    let decoded = Token.decode(token);

    req.body.userId = decoded.userId;
    req.body.username = decoded.username;
    req.body.token = tokenRet;
    // console.log(chalk.green(Token.get(decoded.username)));

    next();
  };
}

export default Token;
