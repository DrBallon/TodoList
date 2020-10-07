import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import { User } from '../models/User';
import { Item as ModelItem, ItemDocument } from '../models/Item';
import { Group as ModelGroup, GroupDocument } from '../models/Group';
// import mongoose from 'mongoose';

const testUserId = 0;
export interface Group {
  id: ObjectID;
  title: string;
}
interface Item {
  id: ObjectID;
  done: boolean;
  content: string;
  group: number;
}
interface RetData {
  curMode: number;
  groups: Group[];
  list: Item[];
}

async function getData(req: Request, res: Response) {
  let retData: RetData = {
    curMode: 0,
    groups: [],
    list: [],
  };
  const user = await User.findOne({ username: req.cookies['username'] });
  let userId = user && user._id;

  const items: Item[] = await ModelItem.aggregate()
    .match({ user_id: userId })
    .project({ id: '$_id', done: 1, content: 1, group: 1, date: 1, _id: 0 })
    .exec();

  let groups: Group[] = [];
  try {
    groups = await ModelGroup.aggregate()
      .match({ user_id: userId })
      .project({ id: '$_id', title: 1, _id: 0 })
      .exec();
  } catch (error) {
    console.log(error);
  }

  items.forEach((item) => retData.list.push(item));
  groups.forEach((group) => retData.groups.push(group));
  retData.curMode = user ? user.curMode : 0;

  //session存在，且请求头带cookies，且session和cookie相等
  res.send({
    status: 200,
    msg: '成功',
    data: retData,
  });
}

export { getData };
