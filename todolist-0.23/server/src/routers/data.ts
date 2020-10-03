import { Request, Response } from 'express';
import { ObjectID } from 'mongodb';
import { User, UserDocument } from '../models/User';
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
  let { id = testUserId } = req.body.data;
  let retData: RetData = {
    curMode: 0,
    groups: [],
    list: [],
  };
  const items: Item[] = await ModelItem.aggregate()
    .match({ user_id: testUserId })
    .project({ id: '$_id', done: 1, content: 1, group: 1, date: 1, _id: 0 })
    .exec();

  const user = await await User.findOne({ _id: id });
  const groupIds: Group[] = user.groups;
  const groups: Group[] = await ModelGroup.aggregate()
    .match({
      _id: {
        $in: groupIds,
      },
    })
    .project({ id: '$_id', title: 1, _id: 0 })
    .exec();

  items.forEach((item) => retData.list.push(item));
  groups.forEach((group) => retData.groups.push(group));
  retData.curMode = user.curMode;
  console.log(retData);
  res.send({
    status: 200,
    msg: 'success',
    data: retData,
  });
}

export { getData };
