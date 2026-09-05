import express from "express"
import { googleauth, logout } from "../controllers/auth.controller.js"

const authRouter = express.Router()

authRouter.post("/google", googleauth)
authRouter.get("/logout", logout)

export default authRouter;