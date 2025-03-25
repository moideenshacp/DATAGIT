import mongoose from "mongoose";

export interface IRepositoryModel {
  _id?: mongoose.Types.ObjectId;
  name: string;
  full_name: string;
  description?: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  language?: string;
  owner: mongoose.Types.ObjectId; 
  created_at: string; 
  updated_at: string;
}
