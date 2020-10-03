import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { Group } from '../models/Group';
export const addGroup = (req: Request, res: Response, next: NextFunction) => {
  let title = req.body.data.title;
  let group = new Group({ title, _id: 0 });
  let retData = {
    status: 200,
    msg: '',
    data: {},
  };
  group.save((err, resGroup) => {
    if (err) {
      next(err);
      retData.status = 500;
      retData.msg = '添加失败';
    }
    // console.log('resGroup', resGroup);
    let { _id: id, title } = resGroup;
    retData.data = {
      id,
      title,
    };
    res.send(retData);
  });
};
export const delGroup = (req: Request, res: Response, next: NextFunction) => {
  let retData = {
    status: 200,
    msg: '完成',
    data: {},
  };
  let groupId: number = req.body.data.groupId;
  Group.remove({ _id: groupId }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = 'failed';
      next(err);
    }
    res.send(retData);
  });
};
