import mongoose from 'mongoose';
import { ItemDao } from './Item';
import { Counter } from './Counter';

type GroupDocument = mongoose.Document & {
  id: number;
  user_id: number;
  title: string;
};

const GroupSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    user_id: { type: Number },
    title: { type: String },
  },
  { versionKey: false, _id: false }
);
GroupSchema.pre('save', function(next) {
  let group = this;
  Counter.findOneAndUpdate({ _id: 'groupid' }, { $inc: { seq_val: 1 } }, (err, counter, res) => {
    if (err || !counter) {
      console.log(err);
    } else {
      group._id = counter.seq_val;
    }
    next();
  });
});
const Group = mongoose.model<GroupDocument>('Group', GroupSchema);

class GroupDao {
  static add = async (userId: number, title: string) => {
    try {
      let group = new Group({ title, _id: 0, user_id: userId });
      let ret = await group.save();
      if (ret) {
        let { _id: id, title } = ret;
        return ret;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  static del = async (id: number) => {
    try {
      let ret = await Group.remove({ _id: id });
      let ret2 = await ItemDao.resetGroup(id);

      return ret && ret2 ? true : false;
    } catch (error) {
      return false;
    }
  };
  static hasUserId = async (userId: number) => {
    try {
      let groups: Group[] = await Group.aggregate()
        .match({ user_id: userId })
        .project({ id: '$_id', title: 1, _id: 0 })
        .exec();
      return groups ? groups : [];
    } catch (error) {
      return [];
    }
  };
}
export { GroupDao };
