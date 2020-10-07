import { Request, Response, NextFunction } from 'express';
import { ret } from '../api/retData';
import { getSession } from '../api/util';
import { Group } from '../models/Group';
export const addGroup = (req: Request, res: Response, next: NextFunction) => {
  let title = req.body.title;
  let user_id = getSession(req).id;
  let group = new Group({ title, _id: 0, user_id });
  group.save((err, resGroup) => {
    if (err) {
      next(err);
    }
    // console.log('resGroup', resGroup);
    let { _id: id, title } = resGroup;
    res.send(
      ret('addGroup', !err, {
        id,
        title,
      })
    );
  });
};
export const delGroup = (req: Request, res: Response, next: NextFunction) => {
  let id: number = req.body.id;
  Group.remove({ _id: id }, (err) => {
    if (err) {
      next(err);
    }
    res.send(ret('delGroup', !err));
  });
};
