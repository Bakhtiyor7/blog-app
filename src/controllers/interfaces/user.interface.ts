import { Types } from "mongoose";

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
