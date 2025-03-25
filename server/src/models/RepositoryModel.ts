import mongoose, { Schema } from "mongoose";
import { IRepositoryModel } from "../interface/IRepositoryModel";

const RepositorySchema: Schema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    full_name: { type: String, required: true, unique: true },
    description: String,
    html_url: { type: String, required: true },
    stargazers_count: { type: Number, default: 0 },
    forks_count: { type: Number, default: 0 },
    language: String,
    owner: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
    created_at: { type: Date, required: true },
    updated_at: { type: Date, required: true },
  },
  { timestamps: true }
);

const Repository = mongoose.model<IRepositoryModel>("Repository", RepositorySchema);

export default Repository;
