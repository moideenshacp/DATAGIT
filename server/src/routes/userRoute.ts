import express from 'express'
import { UserController } from '../controllers/userController'
import { IuserController } from '../interface/IuserController'
import { IuserService } from '../interface/IuserService'
import { UserService } from '../services/userService'
import { IgithubService } from '../interface/IgithubService'
import { GitHubService } from '../services/githubService'

const router = express.Router()

const gitHubService:IgithubService = new GitHubService()
const userService:IuserService = new UserService(gitHubService)
const userController :IuserController = new UserController(userService)

router.get('/fetchUser',userController.fetchUser)
router.get("/followers", userController.fetchUserFollowers);
router.get("/search", userController.searchUsers); 
router.delete("/delete", userController.softDeleteUser); 
router.put("/update/:username", userController.updateUser);
router.get("/users", userController.getAllUsersSorted);
router.get('/mutual-friends', userController.findMutualFriends);





export default router