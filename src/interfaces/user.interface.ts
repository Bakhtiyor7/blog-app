import mongoose, { Types } from "mongoose";

export interface UserData {
  google_id: string;
  user_name: string;
  email: string;
  password: string;
}

export interface TokenData {
  _id: Types.ObjectId;
  user_name: string;
  email: string;
}

// user schema interface
export interface IUser extends Document {
  id: mongoose.Types.ObjectId;
  google_id?: string;
  email: string;
  user_name: string;
  password: string;
}
