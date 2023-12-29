import { Types } from "mongoose";

export interface UserData {
  user_id: string;
  user_name: string;
  email: string;
  password: string;
}

export interface TokenData {
  _id: Types.ObjectId;
  user_id: string;
  user_name: string;
  email: string;
}
