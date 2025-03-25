import { Request, Response } from "express";

export interface IuserController {
    fetchUser(req: Request, res: Response): Promise<void>
}