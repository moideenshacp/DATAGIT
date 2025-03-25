import mongoose, { Schema } from "mongoose";
import { IUserModel } from "../interface/IuserModel";

const UserSchema:Schema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true },
    name: String,
    avatar_url: String,
    location: String,
    blog: String,
    bio: String,
    public_repos: Number,
    public_gists: Number,
    followers: Number,
    following: Number,
    created_at: Date,
    friends: [{ type: mongoose.Schema.Types.ObjectId, ref: "User" }],
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: true }
);

const User = mongoose.model<IUserModel>("User", UserSchema);

export default User;
