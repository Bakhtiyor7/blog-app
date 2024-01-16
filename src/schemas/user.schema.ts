import mongoose from "mongoose";
import { IUser } from "../interfaces/user.interface";

const userSchema = new mongoose.Schema(
  {
    google_id: {
      type: String,
      required: false,
      index: { unique: true, sparse: true },
    },
    email: {
      type: String,
      email: true,
      required: true,
      index: { unique: true, sparse: true },
    },
    user_name: {
      type: String,
      required: false,
      index: { unique: true, sparse: true },
    },
    password: {
      type: String,
      required: false,
      select: false,
    },
  },
  { timestamps: true },
);

const User = mongoose.model<IUser>("User", userSchema);

export default User;
