import { Request, Response } from "express";
import { IuserController } from "../interface/IuserController";
import { IuserService } from "../interface/IuserService";

export class UserController implements IuserController {
  private _userService: IuserService;
  constructor(_userService: IuserService) {
    this._userService = _userService;
  }

  public fetchUser = async (req: Request, res: Response): Promise<void> => {
    try {
        const { username } = req.query;
        console.log("username in contrller",username);
        
        const user = await this._userService.fetchUser(username as string);        
        res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
}
