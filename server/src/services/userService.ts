import User from "../models/UserModel";
import Repository from "../models/RepositoryModel";
import { IUserModel } from "../interface/IuserModel";
import { IRepositoryModel } from "../interface/IRepositoryModel";
import { IgithubService } from "../interface/IgithubService";
import { IuserService } from "../interface/IuserService";

export class UserService implements IuserService {
  private _githubService: IgithubService;
  constructor(_githubService: IgithubService) {
    this._githubService = _githubService;
  }

  async fetchUser(username: string): Promise<{ user: IUserModel; repositories: IRepositoryModel[] }> {
    let existingUser = await User.findOne({ username });

    if (existingUser) {
      // Fetch associated repositories from MongoDB
      console.log("checking for existeing data");
      
      const existingRepositories = await Repository.find({ owner: existingUser._id });
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
    });

    // Fetch and save repositories
    const githubRepositories = await this._githubService.fetchUserRepositories(username);
    
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
}
