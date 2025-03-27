import { Ifollower } from "./Ifollower";
import { IRepositoryModel } from "./IRepositoryModel";
import { IUserModel } from "./IuserModel";

export interface IuserService{
    fetchUser(username: string): Promise<{ user: IUserModel; repositories: IRepositoryModel[] }>
    fetchUserFollowers(username: string): Promise<Ifollower[]>
    searchUsers(username?: string, location?: string): Promise<IUserModel[]>
    softDeleteUser(username: string): Promise<boolean>
}