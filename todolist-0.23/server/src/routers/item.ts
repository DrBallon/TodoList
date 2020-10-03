import { Request, Response, NextFunction } from 'express';
import { Item, ItemInterface } from '../models/Item';

export const changeState = (req: Request, res: Response, next: NextFunction) => {
  let { id, done } = req.body.data;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.updateOne({ _id: id }, { done }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const changGroup = (req: Request, res: Response, next: NextFunction) => {
  let { id, group } = req.body.data;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.updateOne({ _id: id }, { group }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const editContent = (req: Request, res: Response, next: NextFunction) => {
  let { id, content } = req.body.data;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.updateOne({ _id: id }, { content }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const delItem = (req: Request, res: Response, next: NextFunction) => {
  let id = req.body.data.id;
  const retData = {
    status: 200,
    msg: '成功',
    data: {},
  };
  Item.deleteOne({ _id: id }, (err) => {
    if (err) {
      retData.status = 500;
      retData.msg = '失败';
      next(err);
    }
    res.send(retData);
  });
};
export const addItem = (req: Request, res: Response, next: NextFunction) => {
  let { userId = 0, content } = req.body.data;
  // res.send('addItem');
  const obj: ItemInterface = {
    _id: 0,
    user_id: userId,
    done: true,
    content: content,
    group: 0,
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
    let { _id, done, content, group } = resItem;
    retData.data = {
      id: _id,
      done,
      content,
      group,
    };
    res.send(retData);
  });
};
