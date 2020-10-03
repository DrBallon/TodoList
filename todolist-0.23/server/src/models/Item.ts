import mongoose from 'mongoose';
import { Counter } from './Counter';
export type ItemInterface = {
  _id: number;
  user_id: number;
  done: boolean;
  content: string;
  group: number;
};

export type ItemDocument = mongoose.Document & ItemInterface;

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
    if (err) console.log(err);
    item._id = counter.seq_val;
    next();
  });
});
export const Item = mongoose.model<ItemDocument>('Item', ItemSchema);
