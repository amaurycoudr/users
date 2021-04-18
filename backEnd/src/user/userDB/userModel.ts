import { Document, model, Model, Schema } from "mongoose";

export interface UserType {
  name: string;
  email: string;
  password: string;
  salt: string;
  token: string;
}

export interface UserDocument extends UserType, Document {}
interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  name: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true, unique: true },
  password: { type: String, required: true, unique: true },
  token: { type: String, required: true, unique: true },
});
const User = model<UserDocument, UserModel>("User", userSchema);

export default User;
