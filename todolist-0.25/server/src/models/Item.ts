import mongoose from 'mongoose';
import { Counter } from './Counter';
type ItemDocument = mongoose.Document & {
  _id: number;
  user_id: number;
  done: boolean;
  content: string;
  group: number;
};

const ItemSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    user_id: { type: Number },
    done: { type: Boolean },
    content: { type: String },
    group: { type: Number },
  },
  { versionKey: false, _id: false }
);
ItemSchema.pre('save', function(next) {
  let item = this;
  Counter.findOneAndUpdate({ _id: 'itemid' }, { $inc: { seq_val: 1 } }, (err, counter) => {
    if (err || !counter) {
      console.log(err);
    } else {
      item._id = counter.seq_val;
    }
    next();
  });
});
const Item = mongoose.model<ItemDocument>('Item', ItemSchema);
class ItemDao {
  static resetGroup = async (groupId: number) => {
    try {
      let ret = Item.updateMany({ group: groupId }, { group: -1 });
      return ret ? ret : null;
    } catch (error) {
      return null;
    }
  };
  static findById = async (id: number) => {
    try {
      let ret = await Item.findById({ _id: id });
      return ret ? ret : null;
    } catch (error) {
      return null;
    }
  };
  static state = async (id: number, state: boolean) => {
    try {
      let ret = await Item.updateOne({ _id: id }, { state });
      return ret.nModified == 1 ? ret : null;
    } catch (error) {
      return null;
    }
  };
  static group = async (id: number, group: number) => {
    try {
      let ret = await Item.updateOne({ _id: id }, { group });
      return ret.nModified == 1 ? ret : null;
    } catch (error) {
      return null;
    }
  };

  static content = async (id: number, content: string) => {
    try {
      let ret = await Item.updateOne({ _id: id }, { content });
      console.log('content:', ret);
      return ret.nModified == 1 ? ret : null;
    } catch (error) {
      return null;
    }
  };
  static del = async (id: number) => {
    try {
      let ret = await Item.deleteOne({ _id: id });
      return ret.ok == 1 ? true : false;
    } catch (error) {
      return false;
    }
  };
  static findByUserId = async (userId: number): Promise<Item[]> => {
    try {
      // let items = await Item.find({ user_id: userId });
      let items = await Item.aggregate()
        .match({ user_id: userId })
        .project({ id: '$_id', done: 1, content: 1, group: 1, date: 1, _id: 0 })
        .exec();
      return items.length ? items : [];
    } catch (error) {
      return [];
    }
  };
  static add = async (userId: number, content: string) => {
    const item = new Item({
      _id: 0,
      user_id: userId,
      done: false,
      content,
      group: -1,
    });
    try {
      let ret = await item.save();
      if (ret) {
        let { _id, done, content, group } = ret;
        return ret;
      } else {
        return null;
      }
    } catch (error) {
      return null;
    }
  };
  static clear = async (userId: number) => {
    try {
      let ret = await Item.deleteMany({ user_id: userId });
      return ret.ok == 1 ? true : false;
    } catch (error) {
      return false;
    }
  };
}
export { ItemDao };
