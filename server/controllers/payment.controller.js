import crypto from "crypto";
import { getRazorpayInstance, getRazorpayKeys } from "../config/razorpay.js";
import User from "../models/user.model.js";

// @desc Get Razorpay Public Key
// @route GET /api/payment/get-key
export const getKey = async (req, res) => {
  try {
    const { key_id } = getRazorpayKeys();
    return res.status(200).json({ key: key_id });
  } catch (error) {
    return res.status(500).json({ message: `Failed to fetch payment key: ${error.message || error}` });
  }
};

// @desc Create Razorpay Order
// @route POST /api/payment/create-order
export const createOrder = async (req, res) => {
  try {
    const userId = req.userId;
    const { amount, credits, planName } = req.body;

    const numAmount = Number(amount);
    const numCredits = Number(credits);

    if (!numAmount || numAmount <= 0) {
      return res.status(400).json({ message: "Invalid payment amount" });
    }

    if (!numCredits || numCredits <= 0) {
      return res.status(400).json({ message: "Invalid credit amount" });
    }

    const { key_id, key_secret } = getRazorpayKeys();

    if (!key_id || !key_secret) {
      return res.status(400).json({
        message: "Razorpay credentials not configured in server .env (RAZORPAY_KEY_ID / RAZORPAY_KEY_SECRET missing).",
      });
    }

    const razorpay = getRazorpayInstance();
    const amountInPaise = Math.round(numAmount * 100);

    const options = {
      amount: amountInPaise,
      currency: "INR",
      receipt: `rcpt_${Date.now().toString().slice(-8)}_${userId.toString().slice(-4)}`,
      notes: {
        userId: userId.toString(),
        credits: String(numCredits),
        planName: String(planName || "Credit Topup"),
      },
    };

    const order = await razorpay.orders.create(options);

    return res.status(200).json({
      success: true,
      order,
      key: key_id,
      credits: numCredits,
      planName,
    });
  } catch (error) {
    console.error("Razorpay order creation error:", error);
    return res.status(500).json({
      message: `Failed to create payment order: ${error.message || error}`,
    });
  }
};

// @desc Verify Razorpay Payment Signature and Credit User
// @route POST /api/payment/verify-payment
export const verifyPayment = async (req, res) => {
  try {
    const userId = req.userId;
    const {
      razorpay_order_id,
      razorpay_payment_id,
      razorpay_signature,
      credits,
      planName,
    } = req.body;

    if (!razorpay_order_id || !razorpay_payment_id || !razorpay_signature) {
      return res.status(400).json({
        success: false,
        message: "Incomplete payment verification payload",
      });
    }

    const { key_secret } = getRazorpayKeys();
    if (!key_secret) {
      return res.status(500).json({
        success: false,
        message: "RAZORPAY_KEY_SECRET is not configured on server",
      });
    }

    // Verify HMAC SHA-256 signature
    const body = `${razorpay_order_id}|${razorpay_payment_id}`;
    const expectedSignature = crypto
      .createHmac("sha256", key_secret)
      .update(body)
      .digest("hex");

    const isAuthentic = expectedSignature === razorpay_signature;

    if (!isAuthentic) {
      return res.status(400).json({
        success: false,
        message: "Invalid payment signature. Payment verification failed.",
      });
    }

    // Add credits to user
    const creditAmount = Number(credits) || 100;
    const user = await User.findById(userId);

    if (!user) {
      return res.status(404).json({
        success: false,
        message: "User not found",
      });
    }

    user.credits = (user.credits || 0) + creditAmount;
    await user.save();

    return res.status(200).json({
      success: true,
      message: `Payment verified! Added ${creditAmount} credits successfully.`,
      credits: user.credits,
      user,
      paymentId: razorpay_payment_id,
      orderId: razorpay_order_id,
      planName,
    });
  } catch (error) {
    console.error("Payment verification error:", error);
    return res.status(500).json({
      success: false,
      message: `Payment verification failed: ${error.message || error}`,
    });
  }
};
