import { Counter } from './Counter';
import mongoose from 'mongoose';
import { Group } from '../routers/data';
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

export const findOneUser = async function(condition: Object) {
  let user = await User.findOne(condition);
  return user;
};
