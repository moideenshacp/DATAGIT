import mongoose, { Schema } from "mongoose";
import { Ifollower } from "../interface/Ifollower";

const FollowerSchema: Schema = new mongoose.Schema({
  username: { type: String, required: true },
  login: { type: String, required: true },
  avatar_url: { type: String, required: true },
  html_url: { type: String, required: true },
});

export default mongoose.model<Ifollower>("Follower", FollowerSchema);
