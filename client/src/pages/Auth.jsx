import React from "react";
import { RiRobot2Fill } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";
import { motion } from "framer-motion";
import { FcGoogle } from "react-icons/fc";
import { HiOutlineLightningBolt } from "react-icons/hi";
import { signInWithPopup } from "firebase/auth";
import { auth, provider } from "../utils/firebase";
import axios from "axios";
import { useDispatch } from "react-redux";
import { setUserData } from "../redux/userSlice";

function Auth({ isModel = false, onClose }) {
  const ServerUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

  const dispatch = useDispatch();

  const handleGoogleAuth = async () => {
    try {
      const response = await signInWithPopup(auth, provider);

      const user = response.user;

      const name = user.displayName;
      const email = user.email;

      const result = await axios.post(
        ServerUrl + "/api/auth/google",
        {
          name,
          email,
        },
        {
          withCredentials: true,
        }
      );

      console.log("Backend response:", result.data);

      dispatch(setUserData(result.data));

      // Close modal after successful login
      if (isModel && onClose) {
        onClose();
      }

    } catch (error) {
      console.log("Google authentication error:", error);

      dispatch(setUserData(null));
    }
  };

  return (
     <div
    className={
      isModel
        ? "fixed inset-0 z-[100] bg-black/40 backdrop-blur-sm flex items-center justify-center px-4 py-6 overflow-y-auto"
        : "relative w-full min-h-screen bg-[#f8fafc] flex items-center justify-center p-4 overflow-hidden selection:bg-emerald-500 selection:text-white"
    }
  >

    {/* Background only for normal Auth page */}
    {!isModel && (
      <>
        <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_top,_var(--tw-gradient-stops))] from-slate-100 via-slate-50 to-slate-200 opacity-80 pointer-events-none" />

        <div className="absolute inset-0 bg-[radial-gradient(#cbd5e1_1px,transparent_1px)] [background-size:20px_20px] [mask-image:radial-gradient(ellipse_50%_50%_at_50%_50%,#000_70%,transparent_100%)] pointer-events-none" />
      </>
    )}

    {/* Auth Card */}
    <motion.div
      initial={{ opacity: 0, y: -30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.4 }}
      className="relative w-full max-w-md max-h-[90vh] overflow-y-auto p-6 sm:p-10 rounded-3xl bg-white/95 backdrop-blur-xl border border-slate-200/80 shadow-[0_20px_50px_rgba(0,0,0,0.15)]"
    >

        {/* Top Line */}
        <div className="absolute top-0 left-0 right-0 h-[2px] bg-gradient-to-r from-transparent via-emerald-500/60 to-transparent" />

        {/* Close Button */}
        {isModel && (
          <button
            onClick={onClose}
            className="absolute top-4 right-4 w-8 h-8 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-600 flex items-center justify-center text-lg transition"
          >
            ×
          </button>
        )}

        {/* Logo */}
        <div className="flex items-center justify-center gap-3 mb-8">

          <div className="bg-emerald-300 text-black p-2.5 rounded-2xl shadow-md shadow-emerald-500/20 font-bold">
            <RiRobot2Fill size={22} />
          </div>

          <span className="font-bold text-2xl tracking-tight text-slate-800">
            Interv.<span className="text-emerald-600">AI</span>
          </span>

        </div>

        {/* Heading */}
        <div className="text-center mb-6">

          <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200/60 text-emerald-700 text-xs font-semibold mb-4">

            <HiOutlineLightningBolt
              size={14}
              className="text-emerald-600"
            />

            your personal AI interviewer

          </div>

          <h1 className="text-xl sm:text-2xl font-bold text-slate-800 tracking-tight leading-snug">
            Practice
            <br />

            <span className="mt-2 inline-flex items-center gap-2 text-emerald-600 text-2xl sm:text-3xl font-extrabold tracking-normal">

              <IoSparkles
                className="text-emerald-500"
                size={22}
              />

              AI Mock Interviews

            </span>
          </h1>

        </div>

        {/* Description */}
        <p className="text-slate-600 text-center text-sm leading-relaxed mb-8 px-2 font-normal">
          Sign in to practice AI-powered mock interviews and receive
          real-time, actionable feedback.
        </p>

        {/* Google Button */}
        <motion.button
          onClick={handleGoogleAuth}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="w-full flex items-center justify-center gap-3 py-3.5 bg-slate-900 hover:bg-slate-800 text-white font-semibold text-sm rounded-2xl transition-all duration-200 cursor-pointer shadow-md"
        >
          <FcGoogle size={22} />

          <span>Continue with Google</span>
        </motion.button>

      </motion.div>
    </div>
  );
}

export default Auth;

