import axios from "axios";
import { IRepositoryModel } from "../interface/IRepositoryModel";
import { Ifollower } from "../interface/Ifollower";
import { IUserModel } from "../interface/IuserModel";
import { IgithubService } from "../interface/IgithubService";

export class GitHubService implements IgithubService {
  async fetchUserData(username: string): Promise<IUserModel> {
    try {
      const response = await axios.get<IUserModel>(
        `${process.env.GIT_API}/users/${username}`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );

      return response.data;
    } catch (error: any) {
      console.error("GitHub API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch GitHub user data");
    }
  }

  async fetchUserRepositories(username: string): Promise<IRepositoryModel[]> {
    try {
      const response = await axios.get<IRepositoryModel[]>(
        `${process.env.GIT_API}/users/${username}/repos`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("GitHub API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch user repositories");
    }
  }

  async fetchUserFollowers(username: string): Promise<Ifollower[]> {
    try {
      const response = await axios.get<Ifollower[]>(
        `${process.env.GIT_API}/users/${username}/followers`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("GitHub API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch user followers");
    }
  }

  async fetchUserFollowing(username: string): Promise<Ifollower[]> {
    try {
      const response = await axios.get<Ifollower[]>(
        `${process.env.GIT_API}/users/${username}/following`,
        {
          headers: {
            Authorization: `token ${process.env.GITHUB_TOKEN}`,
          },
        }
      );
      return response.data;
    } catch (error: any) {
      console.error("GitHub API Error:", error.response?.data || error.message);
      throw new Error("Failed to fetch user following");
    }
  }
}
