import express from "express";
import isAuth from "../middlewares/isAuth.js";
import {
  getKey,
  createOrder,
  verifyPayment,
} from "../controllers/payment.controller.js";

const paymentRouter = express.Router();

paymentRouter.get("/get-key", isAuth, getKey);
paymentRouter.post("/create-order", isAuth, createOrder);
paymentRouter.post("/verify-payment", isAuth, verifyPayment);

export default paymentRouter;
