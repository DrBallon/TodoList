import mongoose from 'mongoose';
import { ObjectID } from 'mongodb';

export type ItemInterface = {
  user_id: ObjectID;
  done: boolean;
  content: string;
  group: number;
  date: Date;
};

export type ItemDocument = mongoose.Document & ItemInterface;

const ItemSchema = new mongoose.Schema(
  {
    //   id: { type: Number },
    user_id: { type: ObjectID },
    done: { type: Boolean },
    content: { type: String },
    group: { type: Number },
    date: { type: Date },
  },
  { versionKey: false }
);
// ItemSchema.virtual('id').get(function () {
//   return this._id;
// });
export const Item = mongoose.model<ItemDocument>('Item', ItemSchema);
