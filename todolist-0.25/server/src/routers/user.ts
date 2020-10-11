import { Request, Response, NextFunction, Router } from 'express';
import { UserDao } from '../models2/User';
import { retData } from '../api/util';
import { getSession, isLogged } from '../api/util';

const router = Router();
router.use(isLogged);

router.post('/user/mode', async (req: Request, res: Response, next: NextFunction) => {
  let newMode: number = req.body.newMode;
  let user_id = getSession(req).id;
  let ret = await UserDao.setMode(user_id, newMode);
  res.send(ret ? retData(200, '设置成功') : retData(500, '设置失败'));
});
export default router;
