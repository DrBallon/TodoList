import { Request, Response, NextFunction, Router } from 'express';
import { UserDao } from '../models2/User';
import { ret } from '../api/retData';
import { getSession, isLogged } from '../api/util';

const router = Router();
router.use(isLogged);

router.post('/user/mode', async (req: Request, res: Response, next: NextFunction) => {
  let newMode: number = req.body.newMode;
  let user_id = getSession(req).id;
  let ret1 = await UserDao.setMode(user_id, newMode);
  res.send(ret('setMode', !!ret1));
});
export default router;
