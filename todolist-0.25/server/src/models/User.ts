/// <reference path="../main.d.ts" />
/// <reference path="../condition.d.ts" />
import { Counter } from './Counter';
import mongoose from 'mongoose';
export type UserDocument = mongoose.Document & {
  _id: number;
  username: string;
  password: string;
  curMode: number;
  groups: Group[];
  avatar: string;
};
const UserSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    username: { type: String },
    password: { type: String },
    curMode: { type: Number },
    groups: { type: Array },
    avatar: { type: String },
  },
  { versionKey: false, _id: false }
);

UserSchema.pre('save', function(next) {
  let user = this;
  Counter.findOneAndUpdate({ _id: 'userid' }, { $inc: { seq_val: 1 } }, (err, counter) => {
    if (err || !counter) {
      console.log(err);
    } else {
      user._id = counter.seq_val;
      console.log(user);
    }
    next();
  });
});
export const User = mongoose.model<UserDocument>('User', UserSchema);

class AccountDao {
  static add = async (username: string, password: string) => {
    const user = new User({
      _id: 0,
      username,
      password,
      curMode: 0,
      groups: [],
      list: [],
      avatar: '',
    });
    try {
      let retUser = await user.save();
      return retUser ? retUser : null;
    } catch (error) {
      return null;
    }
  };

  static find = async (condition: number | FindOneUser) => {
    try {
      const user = await User.aggregate()
        .match(condition)
        .project({ id: '$_id', username: 1, password: 1, avatar: 1, groups: 1, curMode: 1 })
        .exec();
      if (user.length < 1) {
        return null;
      } else {
        return user[0];
      }
    } catch (error) {
      return null;
    }
  };
  static findById = async (id: number) => {
    try {
      const user = User.aggregate()
        .match({ _id: id })
        .project({ id: '$_id', username: 1, password: 1, avatar: 1, groups: 1, curMode: 1 })
        .exec();
      if (user.length < 1) {
        return null;
      } else {
        return user[0];
      }
    } catch (error) {
      return null;
    }
  };
  static findOne = async (condition: FindOneUser) => {
    return await User.findOne(condition);
  };
}
export { AccountDao };
