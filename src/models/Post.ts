import mongoose, { Schema, Document, Types } from "mongoose";

export interface IPost extends Document {
  title: string;
  content: string;
  slug: string;
  createdAt: Date;
  updatedAt: Date;
  user: Types.ObjectId; // reference to User
}

const PostSchema = new Schema<IPost>(
  {
    title: { type: String, required: true },
    content: { type: String, required: true },
    slug: { type: String, required: true, unique: true },
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
  },
  { timestamps: true }
);

export default mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
