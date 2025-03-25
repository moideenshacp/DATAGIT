import { Ifollower } from "./Ifollower";
import { IRepositoryModel } from "./IRepositoryModel";
import { IUserModel } from "./IuserModel";

export interface IgithubService {
  fetchUserData(username: string): Promise<IUserModel>;
  fetchUserRepositories(username: string): Promise<IRepositoryModel[]>;
  fetchUserFollowers(username: string): Promise<Ifollower[]>;
  fetchUserFollowing(username: string): Promise<Ifollower[]>;
}
