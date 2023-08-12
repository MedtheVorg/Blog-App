import mongoose, { Document, Schema } from 'mongoose';
import { passwordHash } from '../utils/utils';

export interface IUser {
  username: String;
  email: String;
  password: String;
}

export interface iUserModel extends IUser, Document {}

const UserModel: Schema = new Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserModel.pre('save', async function () {
  const hashedPassword = await passwordHash(this.password);
  this.password = hashedPassword;
});
export default mongoose.model<iUserModel>('User', UserModel);
