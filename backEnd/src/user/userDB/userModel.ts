import { Document, model, Model, Schema } from "mongoose";

export interface UserType {
  name: string;
  isSignUp: boolean;
  email: string;
  password: string;
  salt: string;
  token: string;
}

interface UserDocument extends UserType, Document {}
interface UserModel extends Model<UserDocument> {}

const userSchema = new Schema<UserDocument, UserModel>({
  name: { type: String, required: true, unique: true },
  isSignUp: { type: Boolean, required: true },
  email: { type: String, required: true, unique: true },
  salt: { type: String, required: true },
  password: { type: String, required: true },
  token: { type: String, required: true },
});
const userModel = model<UserDocument, UserModel>("User", userSchema);

export default userModel;
