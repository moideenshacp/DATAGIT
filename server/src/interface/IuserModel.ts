import mongoose from "mongoose";

export interface IUserModel {
  _id?: mongoose.Types.ObjectId;
  username: string;
  login?: string;
  name?: string;
  avatar_url?: string;
  location?: string;
  blog?: string;
  bio?: string;
  public_repos?: number;
  public_gists?: number;
  followers?: number;
  following?: number;
  created_at?: string;
  friends?: mongoose.Types.ObjectId[];
  isDeleted?: boolean;
}
