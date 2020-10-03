import mongoose from 'mongoose';
import { Group } from '../routers/data';
export type UserDocument = mongoose.Document & {
  username: string;
  password: string;
  curMode: number;
  groups: Group[];
};
const UserSchema = new mongoose.Schema(
  {
    _id: { type: Number, required: true },
    username: { type: String },
    password: { type: String },
    curMode: { type: Number },
    groups: { type: Array },
  },
  { versionKey: false, _id: false }
);
export const User = mongoose.model<UserDocument>('User', UserSchema);
