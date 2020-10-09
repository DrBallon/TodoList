import { Request, Response, NextFunction, Router } from 'express';
import { User } from '../models/User';
import { ret } from '../api/retData';
import { isLogged } from '../api/util';

const router = Router();
router.use(isLogged);

router.post('/user/mode', async (req: Request, res: Response, next: NextFunction) => {
  let newMode: number = req.body.newMode;
  User.findByIdAndUpdate(0, { curMode: newMode }).exec((err) => {
    if (err) next(err);
    res.send(ret('setMode', !err));
  });
});
export default router;
