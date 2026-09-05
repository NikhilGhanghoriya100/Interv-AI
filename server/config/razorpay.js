import Razorpay from "razorpay";
import dotenv from "dotenv";

dotenv.config();

export const getRazorpayKeys = () => {
  const key_id = (process.env.RAZORPAY_KEY_ID || "").replace(/['"]/g, "").trim();
  const key_secret = (process.env.RAZORPAY_KEY_SECRET || "").replace(/['"]/g, "").trim();
  return { key_id, key_secret };
};

export const getRazorpayInstance = () => {
  const { key_id, key_secret } = getRazorpayKeys();

  if (!key_id || !key_secret) {
    console.warn("⚠️ RAZORPAY_KEY_ID or RAZORPAY_KEY_SECRET is missing in .env.");
  }

  return new Razorpay({
    key_id: key_id || "rzp_test_placeholder",
    key_secret: key_secret || "placeholder_secret",
  });
};

export const razorpayInstance = getRazorpayInstance();

