import express from "express"
import isAuth from "../middlewares/isAuth.js";
import { getCurrentuser, buyCredits } from "../controllers/user.contoller.js";


const userRouter = express.Router()

userRouter.get("/current-user", isAuth, getCurrentuser)
userRouter.post("/buy-credits", isAuth, buyCredits)

export default userRouter;