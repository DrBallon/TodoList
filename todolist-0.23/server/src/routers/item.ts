import { Request, Response, NextFunction } from 'express';
import { Item, ItemInterface } from '../models/Item';
import { ObjectID } from 'mongodb';
import mongoose from 'mongoose';

export const changeState = (req: Request, res: Response, next: NextFunction) => {
  let targetId = req.body.data.id;
  let done = req.body.data.done;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.updateOne({ _id: mongoose.Types.ObjectId(targetId) }, { done }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const changGroup = (req: Request, res: Response, next: NextFunction) => {
  let targetId = req.body.data.id;
  let group = req.body.data.group;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.updateOne({ _id: mongoose.Types.ObjectId(targetId) }, { group }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const editContent = (req: Request, res: Response, next: NextFunction) => {
  let targetId = req.body.data.id;
  let content = req.body.data.content;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.updateOne({ _id: mongoose.Types.ObjectId(targetId) }, { content }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const delItem = (req: Request, res: Response, next: NextFunction) => {
  let targetId = req.body.data.id;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.deleteOne({ _id: mongoose.Types.ObjectId(targetId) }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const addItem = (req: Request, res: Response, next: NextFunction) => {
  // res.send('addItem');
  const obj: ItemInterface = {
    user_id: new ObjectID(),
    done: true,
    content: 'abc',
    group: 0,
    date: new Date(),
  };
  const item = new Item(obj);
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  item.save((err, resItem) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    let { _id, done, content, group, date } = resItem;
    retData.data = {
      id: _id,
      done,
      content,
      group,
      date,
    };
    res.send(retData);
  });
};
