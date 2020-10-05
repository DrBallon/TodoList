import mongoose from 'mongoose';
import { Counter } from '../models/Counter';

export type GroupDocument = mongoose.Document & {
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
export const Group = mongoose.model<GroupDocument>('Group', GroupSchema);
