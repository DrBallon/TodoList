import mongoose from 'mongoose';
import { NextFunction } from 'express';
import { Request, Response } from 'express';
import { Group, GroupDocument } from '../models/Group';

export const addGroup = (req: Request, res: Response, next: NextFunction) => {
  let title = req.body.data.title;
  let group = new Group({ title });
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
    let { _id, title } = resGroup;
    retData.data = {
      id: _id,
      title,
    };
    res.send(retData);
  });
};
export const delGroup = (req: Request, res: Response, next: NextFunction) => {
  // res.send('delGroup');
  let retData = {
    status: 200,
    msg: '完成',
    data: {},
  };
  let groupId: string = req.body.data.groupId;
  Group.remove({ _id: mongoose.Types.ObjectId(groupId) }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = 'failed';
      next(err);
    }
    res.send(retData);
  });
};
