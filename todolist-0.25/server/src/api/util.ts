import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';
import { Model } from 'sequelize';
export function isLogged(req: Request, res: Response, next: NextFunction) {
  console.log('[method]:', req.method);
  if (getCookie(req, res) == getSession(req).username) {
    console.log('已登录');
    next();
  } else {
    res.send({
      status: 500,
      msg: '未登录',
      data: {},
    });
  }
}

export function getMD5Password(content: string): string {
  const md5 = crypto.createHash('md5'); //定义加密方式:md5不可逆,此处的md5可以换成任意hash加密的方法名称；
  md5.update(content);
  return md5.digest('hex'); //加密后的值d
}
export function getSession(req: Request) {
  return (req.session && req.session[req.cookies.username]) || { username: '', id: -1 };
}
export function getCookie(req: Request, res: Response) {
  return req.cookies['username'];
}
export function toJson(data: Model | Model[]) {
  if (Object.prototype.toString.call(data) === '[object Array]') {
    return (data as Model[]).map((model) => JSON.parse(JSON.stringify(model)));
  } else {
    return JSON.parse(JSON.stringify(data));
  }
}
export function copyFile(srcPath: string, tarPath: string, cb?: Function) {
  if (!fs.existsSync(path.dirname(tarPath)))
    fs.mkdir(path.dirname(tarPath), (err) => {
      if (err) cb && cb(err);
    });
  const rs = fs.createReadStream(srcPath);
  rs.on('error', (err) => {
    if (err) {
      cb && cb(err);
    }
  });
  const ws = fs.createWriteStream(tarPath);
  ws.on('error', (err) => {
    if (err) {
      cb && cb(err);
    }
  });
  ws.on('close', () => cb && cb());
  rs.pipe(ws);
}
const retStatTypes = {
  success: 200,
  error: 500,
};
export function retData(status = 200, msg = '', data = {}) {
  return {
    status,
    msg,
    data,
  };
}
