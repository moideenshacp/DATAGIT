import { IUserModel } from "./IuserModel";

export interface IuserService{
    fetchUser(username: string): Promise<IUserModel>
}