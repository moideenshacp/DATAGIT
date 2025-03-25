import User from "../models/UserModel";
import { IUserModel } from "../interface/IuserModel";
import { IgithubService } from "../interface/IgithubService";
import { IuserService } from "../interface/IuserService";

export class UserService implements IuserService {
  private _githubService: IgithubService;
  constructor(_githubService: IgithubService) {
    this._githubService = _githubService;
  }

  async fetchUser(username: string): Promise<IUserModel> {
    let existingUser = await User.findOne({ username });

    console.log(existingUser,"existing--------------------");
    
    if (existingUser) return existingUser;

    // Fetch user data from GitHub
    const githubUserData = await this._githubService.fetchUserData(username);

    // Save user to MongoDB
    return await User.create({
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
  }
}
