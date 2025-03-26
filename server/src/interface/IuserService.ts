import { IRepositoryModel } from "./IRepositoryModel";
import { IUserModel } from "./IuserModel";

export interface IuserService{
    fetchUser(username: string): Promise<{ user: IUserModel; repositories: IRepositoryModel[] }>
}