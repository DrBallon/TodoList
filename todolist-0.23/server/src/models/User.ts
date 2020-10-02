import mongoose from 'mongoose';
import { Group } from '../routers/data';
export type UserDocument = mongoose.Document & {
  username: string;
  password: string;
  mode: number;
  groups: Group[];
};
const UserSchema = new mongoose.Schema(
  {
    // id: { type: Number },
    username: { type: String },
    password: { type: String },
    mode: { type: Number },
    groups: { type: Array },
  },
  { versionKey: false }
);
export const User = mongoose.model<UserDocument>('User', UserSchema);
