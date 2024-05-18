import mongoose, { Document, Schema } from "mongoose";

interface IUser extends Document {
  userName: string;
  email: string;
  password: string;
}

const UserSchema: Schema = new Schema(
  {
    userName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true },
  },
  { collection: "RegisteredUsers", timestamps: true }
);

const User = mongoose.model<IUser>("RegisteredUsers", UserSchema);
export default User;
