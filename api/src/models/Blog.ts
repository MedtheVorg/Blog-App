import mongoose, { Document, Schema } from 'mongoose';

export interface IBlog {
  title: String;
  summary: String;
  blogImage: String;
  content: String;
  author: String;
}

export interface IBlogModel extends IBlog, Document {}

const BlogModel: Schema = new Schema(
  {
    title: {
      type: String,
      required: true,
    },
    summary: {
      type: String,
      required: true,
    },
    blogImage: {
      type: String,
      required: true,
    },
    content: {
      type: String,
      required: true,
    },
    author: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  { timestamps: true }
);

export default mongoose.model<IBlogModel>('Blog', BlogModel);
