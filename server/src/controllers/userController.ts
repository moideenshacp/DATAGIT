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
        if (!username || typeof username !== "string") {
          res.status(400).json({ message: "Username is required" });
          return;
        }
        console.log("username in contrller",username);
        
        const user = await this._userService.fetchUser(username as string);        
        res.status(200).json(user);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public fetchUserFollowers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.query;
      console.log("here user",username);
      if (!username || typeof username !== "string") {
        res.status(400).json({ message: "Username is required" });
        return;
      }
  
      
      const followers = await this._userService.fetchUserFollowers(username as string);
      res.status(200).json(followers);
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };

  public searchUsers = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username, location } = req.query;

      if (username && typeof username !== "string") {
        res.status(400).json({ message: "Username must be a string." });
        return;
      }
      if (location && typeof location !== "string") {
        res.status(400).json({ message: "Location must be a string." });
        return;
      }

      const users = await this._userService.searchUsers(username as string, location as string);
      if(users.length === 0){
        res.status(400).json({message:"No data available based on provided details"})
      }else{

        res.status(200).json(users);
      }
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
  public softDeleteUser = async (req: Request, res: Response): Promise<void> => {
    try {
      const { username } = req.body;

      if (!username || typeof username !== "string") {
        res.status(400).json({ message: "Username is required" });
        return;
      }
  
      const isDeleted = await this._userService.softDeleteUser(username);
      if (!isDeleted) {
        res.status(404).json({ message: "User not found" });
        return;
      }

      res.status(200).json({ message: "User soft deleted successfully" });
    } catch (error: any) {
      res.status(500).json({ message: error.message });
    }
  };
  
}
