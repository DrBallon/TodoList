import { Request, Response, NextFunction } from 'express';
import { ret, retData } from '../api/retData';
import { getSession } from '../api/util';
import { Item } from '../models/Item';
const USER_ID = 0;
export const changeState = (req: Request, res: Response, next: NextFunction) => {
  let { id, done } = req.body;
  console.log(id, done);
  Item.updateOne({ _id: id }, { done }, (err) => {
    if (err) {
      next(err);
    }
    res.send(ret('changeState', !err));
  });
};
export const changGroup = (req: Request, res: Response, next: NextFunction) => {
  let { id, group } = req.body;
  Item.updateOne({ _id: id }, { group }, (err) => {
    if (err) {
      next(err);
    }
    res.send(ret('changGroup', !err));
  });
};
export const editContent = (req: Request, res: Response, next: NextFunction) => {
  let { id, content } = req.body;
  Item.updateOne({ _id: id }, { content }, (err) => {
    if (err) {
      next(err);
    }
    res.send(ret('changGroup', !err));
  });
};

export const clearItem = (req: Request, res: Response, next: NextFunction) => {
  console.log('clear');
  Item.deleteMany({ user_id: USER_ID }, (err) => {
    if (err) {
      next(err);
    }
    res.send(ret('changGroup', !err));
  });
};
export const delItem = (req: Request, res: Response, next: NextFunction) => {
  let id = req.body.id;
  Item.deleteOne({ _id: id }, (err) => {
    if (err) {
      next(err);
    }
    res.send(ret('delItem', !err));
  });
};
export const addItem = (req: Request, res: Response, next: NextFunction) => {
  let user_id = getSession(req).id;
  let content = req.body.content;
  if (!content) {
    res.send(retData(500, '未设置内容', {}));
    return;
  }
  const item = new Item({
    _id: 0,
    user_id,
    done: false,
    content,
    group: -1,
  });
  item.save((err, resItem) => {
    if (err) {
      next(err);
    }
    let { _id, done, content, group } = resItem;
    res.send(
      ret('addItem', !err, {
        id: _id,
        done,
        content,
        group,
      })
    );
  });
};
