import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { motion, AnimatePresence } from "motion/react";
import { RiRobot2Fill } from "react-icons/ri";
import { BsCoin } from "react-icons/bs";
import { FaUserAstronaut } from "react-icons/fa";
import { IoMdLogOut } from "react-icons/io";
import { HiOutlineClock } from "react-icons/hi2";
import { HiMenu, HiX } from "react-icons/hi";
import { useNavigate, useLocation } from "react-router-dom";
import axios from "axios";

import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";
import Auth from "../pages/Auth";

function Navbar() {
  const { userData } = useSelector((state) => state.user);

  const [showCreditPopup, setShowCreditPopup] = useState(false);
  const [showUserPopup, setShowUserPopup] = useState(false);
  const [showAuth, setShowAuth] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);

  const navigate = useNavigate();
  const location = useLocation();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      await axios.get(ServerUrl + "/api/auth/logout", {
        withCredentials: true,
      });

      dispatch(setUserData(null));
      setShowCreditPopup(false);
      setShowUserPopup(false);
      setShowMobileMenu(false);

      navigate("/");
    } catch (error) {
      console.log("Logout error:", error);
    }
  };

  const handleAuthRequired = () => {
    setShowAuth(true);
    setShowCreditPopup(false);
    setShowUserPopup(false);
    setShowMobileMenu(false);
  };

  const handleNavigate = (path) => {
    navigate(path);
    setShowMobileMenu(false);
  };

  const navLinks = [
    { name: "Home", path: "/" },
    { name: "Interview", path: "/interview" },
    { name: "Dashboard", path: "/history" },
    { name: "Pricing", path: "/pricing" },
  ];

  return (
    <div>
      <div className="bg-[#f3f3f3] flex justify-center px-3 sm:px-4 pt-4 sm:pt-6">
        <motion.nav
          initial={{ opacity: 0, y: -30 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.35 }}
          className="w-full max-w-6xl bg-slate-950 rounded-[22px] sm:rounded-[24px] shadow-lg px-4 sm:px-7 py-3.5 sm:py-4 relative"
        >
          <div className="flex items-center justify-between">
            {/* Logo */}
            <button
              onClick={() => handleNavigate("/")}
              className="flex items-center gap-2.5 cursor-pointer"
            >
              <div className="bg-emerald-400 text-slate-950 p-2 sm:p-2.5 rounded-xl sm:rounded-2xl shadow-md shadow-emerald-400/20">
                <RiRobot2Fill size={20} className="sm:hidden" />
                <RiRobot2Fill size={22} className="hidden sm:block" />
              </div>

              <span className="font-bold text-xl sm:text-2xl tracking-tight text-white">
                Interv.
                <span className="text-emerald-400">AI</span>
              </span>
            </button>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center gap-2 lg:gap-4 ml-6 lg:ml-8">
              {navLinks.map((link) => {
                const isActive = location.pathname === link.path;
                return (
                  <button
                    key={link.name}
                    onClick={() => handleNavigate(link.path)}
                    className={`text-sm px-3 py-1.5 rounded-xl font-medium transition-all cursor-pointer ${
                      isActive
                        ? "bg-white/10 text-emerald-400 font-semibold shadow-inner"
                        : "text-slate-300 hover:text-emerald-400 hover:bg-white/5"
                    }`}
                  >
                    {link.name}
                  </button>
                );
              })}
            </div>

            {/* Right Side */}
            <div className="flex items-center gap-2.5 sm:gap-5">
              {/* Credits */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!userData) {
                      handleAuthRequired();
                      return;
                    }

                    setShowCreditPopup(!showCreditPopup);
                    setShowUserPopup(false);
                  }}
                  className="flex items-center gap-1.5 sm:gap-2 bg-white/10 border border-white/10 text-white px-3 sm:px-4 py-2 rounded-full text-sm sm:text-md hover:bg-white/15 transition"
                >
                  <BsCoin size={17} className="text-emerald-400" />
                  <span>{userData?.credits || 0}</span>
                </button>

                <AnimatePresence>
                  {showCreditPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.97 }}
                      className="absolute right-0 sm:right-[-35px] mt-3 w-[230px] sm:w-64 bg-white shadow-2xl border border-gray-200 rounded-2xl p-5 z-50"
                    >
                      <div className="flex items-center gap-2 mb-2">
                        <BsCoin className="text-emerald-500" />
                        <p className="font-semibold text-slate-800">
                          Interview Credits
                        </p>
                      </div>

                      <p className="text-sm text-gray-500 mb-4 leading-relaxed">
                        You have{" "}
                        <span className="font-semibold text-slate-800">
                          {userData?.credits || 0}
                        </span>{" "}
                        credits available.
                      </p>

                      <button
                        onClick={() => {
                          setShowCreditPopup(false);
                          navigate("/pricing");
                        }}
                        className="w-full bg-slate-950 text-white py-2.5 rounded-xl text-sm font-medium hover:bg-slate-800 transition"
                      >
                        Buy more credits
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Profile */}
              <div className="relative">
                <button
                  onClick={() => {
                    if (!userData) {
                      handleAuthRequired();
                      return;
                    }

                    setShowUserPopup(!showUserPopup);
                    setShowCreditPopup(false);
                  }}
                  className="w-9 h-9 sm:w-10 sm:h-10 bg-emerald-400 text-slate-950 rounded-full flex items-center justify-center font-bold hover:bg-emerald-300 transition"
                >
                  {userData?.name ? (
                    userData.name.slice(0, 1).toUpperCase()
                  ) : (
                    <FaUserAstronaut size={16} />
                  )}
                </button>

                <AnimatePresence>
                  {showUserPopup && (
                    <motion.div
                      initial={{ opacity: 0, y: -5, scale: 0.97 }}
                      animate={{ opacity: 1, y: 0, scale: 1 }}
                      exit={{ opacity: 0, y: -5, scale: 0.97 }}
                      className="absolute right-0 mt-3 w-[220px] bg-white shadow-2xl border border-gray-200 rounded-2xl p-4 z-50"
                    >
                      <div className="pb-3 border-b border-gray-100">
                        <p className="text-sm font-semibold text-slate-800 truncate">
                          {userData?.name}
                        </p>
                        <p className="text-xs text-slate-400 truncate mt-1">
                          {userData?.email}
                        </p>
                      </div>

                      <button
                        onClick={() => {
                          setShowUserPopup(false);
                          navigate("/history");
                        }}
                        className="w-full flex items-center gap-2.5 text-left text-sm py-3 text-slate-600 hover:text-slate-950 transition"
                      >
                        <HiOutlineClock size={18} />
                        Interview History
                      </button>

                      <button
                        onClick={handleLogout}
                        className="w-full flex items-center gap-2.5 text-left text-sm py-2.5 text-red-500 hover:text-red-600 transition"
                      >
                        <IoMdLogOut size={18} />
                        Logout
                      </button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>

              {/* Mobile Menu Toggle Button */}
              <button
                onClick={() => {
                  setShowMobileMenu((prev) => !prev);
                  setShowCreditPopup(false);
                  setShowUserPopup(false);
                }}
                className="lg:hidden w-9 h-9 rounded-xl bg-white/5 border border-slate-800 flex items-center justify-center text-slate-300 hover:text-emerald-400 transition"
              >
                {showMobileMenu ? <HiX size={20} /> : <HiMenu size={20} />}
              </button>
            </div>
          </div>

          {/* Mobile Menu Dropdown */}
          <AnimatePresence>
            {showMobileMenu && (
              <motion.div
                initial={{ opacity: 0, height: 0 }}
                animate={{ opacity: 1, height: "auto" }}
                exit={{ opacity: 0, height: 0 }}
                className="lg:hidden overflow-hidden"
              >
                <div className="mt-4 pt-4 border-t border-slate-800">
                  <div className="flex flex-col gap-1">
                    {navLinks.map((link) => {
                      const isActive = location.pathname === link.path;
                      return (
                        <button
                          key={link.name}
                          onClick={() => handleNavigate(link.path)}
                          className={`w-full text-left px-3.5 py-2.5 rounded-xl text-sm font-medium transition cursor-pointer ${
                            isActive
                              ? "bg-white/10 text-emerald-400 font-semibold"
                              : "text-slate-300 hover:text-emerald-400 hover:bg-white/5"
                          }`}
                        >
                          {link.name}
                        </button>
                      );
                    })}
                  </div>

                  {!userData && (
                    <div className="flex gap-2 mt-3 pt-3 border-t border-slate-800">
                      <button
                        onClick={handleAuthRequired}
                        className="flex-1 py-2.5 rounded-xl border border-slate-700 text-sm text-slate-300 hover:bg-white/5 transition"
                      >
                        Login
                      </button>

                      <button
                        onClick={handleAuthRequired}
                        className="flex-1 py-2.5 rounded-xl bg-emerald-400 text-slate-950 font-semibold text-sm hover:bg-emerald-300 transition"
                      >
                        Get Started
                      </button>
                    </div>
                  )}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.nav>
      </div>

      {/* Auth Modal */}
      {showAuth && <Auth isModel={true} onClose={() => setShowAuth(false)} />}
    </div>
  );
}

export default Navbar;