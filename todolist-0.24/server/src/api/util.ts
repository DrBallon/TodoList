import crypto from 'crypto';
import { Request, Response, NextFunction } from 'express';
export function isLogged(req: Request, res: Response): boolean {
  console.log(getCookie(req, res), getSession(req));
  return getCookie(req, res) == getSession(req).username;
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
