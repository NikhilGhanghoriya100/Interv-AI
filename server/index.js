import express from "express"
import dotenv from "dotenv"
import connectdb from "./config/connectDB.js"
import cookieParser from "cookie-parser"
import authRouter from "./routes/auth.route.js";
dotenv.config()
import cors from "cors"
import userRouter from "./routes/user.route.js";
import interviewRouter from "./routes/interview.route.js"
import paymentRouter from "./routes/payment.route.js";

import dns from 'dns';
dns.setServers(["1.1.1.1", "8.8.8.8"]);


const app = express()
app.use(cors({
    origin: "https://interv-ai-client.onrender.com",
    credentials:true,
}))


app.use(express.json())
app.use(cookieParser())

app.use("/api/auth", authRouter)
app.use("/api/user", userRouter)
app.use("/api/interview", interviewRouter)
app.use("/api/payment", paymentRouter)

const PORT = process.env.PORT || 8000
app.listen(PORT, ()=>{
    console.log(`Server running on port ${PORT}`)
    connectdb()
})
