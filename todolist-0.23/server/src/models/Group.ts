import mongoose from 'mongoose';

export type GroupDocument = mongoose.Document & {
  id: number;
  title: string;
};

const GroupSchema = new mongoose.Schema(
  {
    id: { type: Number },
    title: { type: String },
  },
  { versionKey: false }
);

export const Group = mongoose.model<GroupDocument>('Group', GroupSchema);
