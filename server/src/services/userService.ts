import User from "../models/UserModel";
import Repository from "../models/RepositoryModel";
import { IUserModel } from "../interface/IuserModel";
import { IRepositoryModel } from "../interface/IRepositoryModel";
import { IgithubService } from "../interface/IgithubService";
import { IuserService } from "../interface/IuserService";
import { Ifollower } from "../interface/Ifollower";
import FollowerModel from "../models/FollowerModel";

export class UserService implements IuserService {
  private _githubService: IgithubService;
  constructor(_githubService: IgithubService) {
    this._githubService = _githubService;
  }

  async fetchUser(
    username: string
  ): Promise<{ user: IUserModel; repositories: IRepositoryModel[] }> {
    let existingUser = await User.findOne({ username });

    if (existingUser) {
      // Fetch associated repositories from MongoDB
      console.log("checking for existeing data");

      if (existingUser.isDeleted) {
        // Restore soft-deleted user
        existingUser.isDeleted = false;
        await existingUser.save();
        console.log("User restored from soft delete.");
      }

      const existingRepositories = await Repository.find({
        owner: existingUser._id,
      });
      return { user: existingUser, repositories: existingRepositories };
    }

    // Fetch user data from GitHub
    const githubUserData = await this._githubService.fetchUserData(username);

    // Save user to MongoDB
    const newUser = await User.create({
      username: githubUserData.login,
      name: githubUserData.name,
      avatar_url: githubUserData.avatar_url,
      location: githubUserData.location,
      blog: githubUserData.blog,
      bio: githubUserData.bio,
      public_repos: githubUserData.public_repos,
      public_gists: githubUserData.public_gists,
      followers: githubUserData.followers,
      following: githubUserData.following,
      created_at: githubUserData.created_at,
      isDeleted:false
    });

    // Fetch and save repositories
    const githubRepositories = await this._githubService.fetchUserRepositories(
      username
    );

    const repositories = await Repository.insertMany(
      githubRepositories.map((repo) => ({
        name: repo.name,
        full_name: repo.full_name,
        description: repo.description,
        html_url: repo.html_url,
        stargazers_count: repo.stargazers_count,
        forks_count: repo.forks_count,
        language: repo.language,
        owner: newUser._id, // Associate repo with user
        created_at: repo.created_at,
        updated_at: repo.updated_at,
      }))
    );

    return { user: newUser, repositories };
  }

  async fetchUserFollowers(username: string): Promise<Ifollower[]> {
    // Check if followers already exist in the database
    let existingFollowers = await FollowerModel.find({ username });

    console.log("njananaaaauser", username);

    if (existingFollowers.length > 0) {
      console.log("Returning cached followers from DB");
      return existingFollowers;
    }

    // Fetch followers from GitHub API
    const githubFollowers = await this._githubService.fetchUserFollowers(
      username
    );

    // Save to MongoDB
    await FollowerModel.insertMany(
      githubFollowers.map((follower) => ({
        username,
        login: follower.login,
        avatar_url: follower.avatar_url,
        html_url: follower.html_url,
      }))
    );

    return githubFollowers;
  }

  async searchUsers(
    username?: string,
    location?: string
  ): Promise<IUserModel[]> {
    const query: any = { isDeleted: false };

    if (username) query.username = username;
    if (location) query.location = location;

    return User.find(query);
  }
  async softDeleteUser(username: string): Promise<boolean> {
    const user = await User.findOneAndUpdate(
      { username },
      { isDeleted: true },
      { new: true }
    );

    return !!user;
  }
  async updateUser(username: string, updates: Partial<IUserModel>): Promise<IUserModel | null> {
    const updatedUser = await User.findOneAndUpdate(
      { username, isDeleted: false }, 
      { $set: updates },
      { new: true } 
    );
  
    return updatedUser;
  }
  async getAllUsersSorted(sortBy: string): Promise<IUserModel[]> {
    const validSortFields = ["public_repos", "public_gists", "followers", "following", "created_at"];
  
    if (!validSortFields.includes(sortBy)) {
      throw new Error("Invalid sort field");
    }
  
    return User.find({ isDeleted: false }).sort({ [sortBy]: 1 }); 
  }
  
  
}
