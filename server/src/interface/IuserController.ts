import { Request, Response } from "express";

export interface IuserController {
    fetchUser(req: Request, res: Response): Promise<void>
    fetchUserFollowers(req: Request, res: Response): Promise<void>
    searchUsers (req: Request, res: Response): Promise<void> 
    softDeleteUser(req: Request, res: Response): Promise<void>
}