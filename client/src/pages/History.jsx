import React, { useState, useEffect } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";
import axios from "axios";
import {
  FaBriefcase,
  FaCalendarAlt,
  FaTrashAlt,
  FaEye,
  FaSearch,
  FaAward,
} from "react-icons/fa";
import {
  BsBarChartFill,
  BsCheckCircleFill,
  BsShieldCheck,
  BsFileEarmarkText,
} from "react-icons/bs";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Auth from "./Auth";
import { ServerUrl } from "../App";

function History() {
  const navigate = useNavigate();
  const { userData } = useSelector((state) => state.user);

  const [historyData, setHistoryData] = useState([]);
  const [stats, setStats] = useState({
    totalInterviews: 0,
    completedInterviews: 0,
    averageScore: 0,
    highestScore: 0,
  });
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState("");
  const [selectedMode, setSelectedMode] = useState("all");
  const [selectedStatus, setSelectedStatus] = useState("all");
  const [showAuthModal, setShowAuthModal] = useState(false);
  const [deletingId, setDeletingId] = useState(null);

  const fetchHistory = async () => {
    setLoading(true);
    try {
      const response = await axios.get(`${ServerUrl}/api/interview/history`, {
        withCredentials: true,
      });

      setStats(response.data.stats || {
        totalInterviews: 0,
        completedInterviews: 0,
        averageScore: 0,
        highestScore: 0,
      });
      setHistoryData(response.data.interviews || []);
    } catch (error) {
      console.error("Error fetching history:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (userData) {
      fetchHistory();
    } else {
      setLoading(false);
    }
  }, [userData]);



  const handleDelete = async (e, interviewId) => {
    e.stopPropagation();
    if (!window.confirm("Are you sure you want to delete this interview record?")) {
      return;
    }

    setDeletingId(interviewId);
    try {
      await axios.delete(`${ServerUrl}/api/interview/${interviewId}`, {
        withCredentials: true,
      });
      setHistoryData((prev) => prev.filter((item) => item._id !== interviewId));
      fetchHistory();
    } catch (error) {
      console.error("Error deleting interview:", error);
    } finally {
      setDeletingId(null);
    }
  };

  // Filter logic
  const filteredInterviews = historyData.filter((item) => {
    const matchesSearch = item.role
      ?.toLowerCase()
      .includes(searchQuery.toLowerCase());
    const matchesMode =
      selectedMode === "all" ||
      item.mode?.toLowerCase() === selectedMode.toLowerCase();
    const matchesStatus =
      selectedStatus === "all" ||
      item.status?.toLowerCase() === selectedStatus.toLowerCase();
    return matchesSearch && matchesMode && matchesStatus;
  });

  const getScoreBadge = (score) => {
    if (score >= 8) return "bg-emerald-50 text-emerald-700 border-emerald-200";
    if (score >= 6) return "bg-teal-50 text-teal-700 border-teal-200";
    if (score >= 4) return "bg-amber-50 text-amber-700 border-amber-200";
    return "bg-rose-50 text-rose-700 border-rose-200";
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
          {/* HEADER SECTION */}
          <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-8">
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3">
                <HiSparkles size={14} />
                Interview Dashboard & Analytics
              </div>
              <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
                Interview History
              </h1>
              <p className="text-sm text-slate-500 mt-1">
                Track your progress, review past answers, and evaluate continuous improvements.
              </p>
            </div>

            <button
              onClick={() => {
                if (!userData) setShowAuthModal(true);
                else navigate("/interview");
              }}
              className="inline-flex items-center justify-center gap-2 bg-slate-950 text-white px-5 py-3 rounded-2xl font-semibold text-sm hover:bg-slate-800 transition shadow-lg cursor-pointer w-full sm:w-auto"
            >
              Start New Interview
              <HiArrowRight size={16} />
            </button>
          </div>

          {/* IF NOT LOGGED IN */}
          {!userData && !loading && (
            <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center max-w-xl mx-auto my-12 shadow-sm">
              <div className="w-16 h-16 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-4">
                <BsFileEarmarkText size={28} />
              </div>
              <h2 className="text-2xl font-bold text-slate-900 mb-2">
                Sign in to view your history
              </h2>
              <p className="text-slate-500 text-sm mb-6 leading-relaxed">
                Log in or create an account to access all your previous mock interview evaluations and feedback.
              </p>
              <button
                onClick={() => setShowAuthModal(true)}
                className="bg-emerald-500 hover:bg-emerald-600 text-white font-bold py-3 px-8 rounded-xl transition cursor-pointer"
              >
                Sign In / Register
              </button>
            </div>
          )}

          {/* AUTHENTICATED CONTENT */}
          {userData && (
            <>
              {/* STATS OVERVIEW CARDS */}
              <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6 mb-10">
                {/* Total Interviews */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Total Sessions
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {stats.totalInterviews}
                  </div>
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <BsBarChartFill className="text-emerald-500" /> Recorded sessions
                  </div>
                </div>

                {/* Completed */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Completed
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-slate-900">
                    {stats.completedInterviews}
                  </div>
                  <div className="mt-2 text-xs text-emerald-600 flex items-center gap-1 font-medium">
                    <BsCheckCircleFill /> Full reports ready
                  </div>
                </div>

                {/* Average Score */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Average Score
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-emerald-600">
                    {stats.averageScore} <span className="text-sm font-normal text-slate-400">/ 10</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <BsShieldCheck className="text-emerald-500" /> Overall performance
                  </div>
                </div>

                {/* Highest Score */}
                <div className="bg-white rounded-2xl p-5 border border-slate-200 shadow-sm">
                  <span className="text-xs font-semibold text-slate-400 uppercase tracking-wider block mb-1">
                    Best Score
                  </span>
                  <div className="text-2xl sm:text-3xl font-bold text-teal-600">
                    {stats.highestScore} <span className="text-sm font-normal text-slate-400">/ 10</span>
                  </div>
                  <div className="mt-2 text-xs text-slate-500 flex items-center gap-1">
                    <FaAward className="text-teal-500" /> Peak achievement
                  </div>
                </div>
              </div>

              {/* SEARCH & FILTERS BAR */}
              <div className="bg-white rounded-2xl p-4 border border-slate-200 shadow-sm mb-6 flex flex-col md:flex-row items-center gap-3">
                {/* Search */}
                <div className="relative flex-1 w-full">
                  <FaSearch className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  <input
                    type="text"
                    placeholder="Search by role (e.g. Frontend Developer)..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full pl-11 pr-4 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                  />
                </div>

                {/* Mode Filter */}
                <div className="flex items-center gap-2 w-full md:w-auto">
                  <select
                    value={selectedMode}
                    onChange={(e) => setSelectedMode(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-emerald-400 transition w-full md:w-auto text-slate-700"
                  >
                    <option value="all">All Modes</option>
                    <option value="Technical">Technical</option>
                    <option value="HR">HR</option>
                  </select>

                  {/* Status Filter */}
                  <select
                    value={selectedStatus}
                    onChange={(e) => setSelectedStatus(e.target.value)}
                    className="px-3.5 py-2.5 bg-slate-50 border border-slate-200 rounded-xl text-sm outline-none focus:bg-white focus:border-emerald-400 transition w-full md:w-auto text-slate-700"
                  >
                    <option value="all">All Statuses</option>
                    <option value="completed">Completed</option>
                    <option value="Incompleted">Incomplete</option>
                  </select>
                </div>
              </div>

              {/* INTERVIEWS LIST */}
              {loading ? (
                <div className="text-center py-16">
                  <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                  <p className="text-sm text-slate-500 font-medium">Loading interview records...</p>
                </div>
              ) : filteredInterviews.length === 0 ? (
                <div className="bg-white rounded-3xl border border-slate-200 p-8 sm:p-12 text-center my-6 shadow-sm">
                  <div className="w-16 h-16 rounded-2xl bg-slate-100 text-slate-400 flex items-center justify-center mx-auto mb-4">
                    <FaBriefcase size={24} />
                  </div>
                  <h3 className="text-lg font-bold text-slate-800 mb-1">
                    No interviews found
                  </h3>
                  <p className="text-sm text-slate-500 max-w-md mx-auto mb-6">
                    {searchQuery || selectedMode !== "all" || selectedStatus !== "all"
                      ? "No interviews match your search and filter criteria."
                      : "You haven't completed any mock interviews yet. Start your first session now!"}
                  </p>
                  <button
                    onClick={() => navigate("/interview")}
                    className="inline-flex items-center gap-2 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold px-6 py-3 rounded-xl transition cursor-pointer text-sm"
                  >
                    Take an Interview
                    <HiArrowRight size={15} />
                  </button>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 gap-5 mb-12">
                  {filteredInterviews.map((item) => {
                    const formattedDate = new Date(item.createdAt).toLocaleDateString("en-US", {
                      year: "numeric",
                      month: "short",
                      day: "numeric",
                    });
                    const formattedTime = new Date(item.createdAt).toLocaleTimeString("en-US", {
                      hour: "2-digit",
                      minute: "2-digit",
                    });

                    return (
                      <motion.div
                        key={item._id}
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        whileHover={{ y: -3 }}
                        className="bg-white rounded-2xl border border-slate-200 p-5 sm:p-6 shadow-sm hover:shadow-md transition-all flex flex-col justify-between"
                      >
                        <div>
                          {/* TOP CARD ROW */}
                          <div className="flex items-start justify-between gap-3 mb-3">
                            <div>
                              <span className="text-[11px] font-bold uppercase tracking-wider px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 inline-block mb-2">
                                {item.mode} Round
                              </span>
                              <h3 className="text-lg font-bold text-slate-900 leading-tight">
                                {item.role}
                              </h3>
                              <p className="text-xs text-slate-500 mt-0.5">
                                Experience: {item.experience}
                              </p>
                            </div>

                            {/* Score Badge */}
                            <div
                              className={`px-3 py-1.5 rounded-xl border font-bold text-sm ${getScoreBadge(
                                item.finalScore
                              )} flex-shrink-0 text-center`}
                            >
                              <span className="text-base">{item.finalScore}</span>
                              <span className="text-xs font-normal"> / 10</span>
                            </div>
                          </div>

                          {/* METRICS MINI-BARS */}
                          <div className="grid grid-cols-3 gap-2 my-4 bg-slate-50 p-3 rounded-xl border border-slate-100">
                            <div>
                              <span className="text-[10px] text-slate-400 font-medium block">Confidence</span>
                              <span className="text-xs font-bold text-slate-800">{item.confidence || 0}/10</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-medium block">Communication</span>
                              <span className="text-xs font-bold text-slate-800">{item.communication || 0}/10</span>
                            </div>
                            <div>
                              <span className="text-[10px] text-slate-400 font-medium block">Correctness</span>
                              <span className="text-xs font-bold text-slate-800">{item.correctness || 0}/10</span>
                            </div>
                          </div>
                        </div>

                        {/* BOTTOM CARD ROW & ACTIONS */}
                        <div className="pt-3 border-t border-slate-100 flex items-center justify-between gap-3">
                          <div className="flex items-center gap-1.5 text-xs text-slate-400">
                            <FaCalendarAlt size={12} />
                            <span>{formattedDate} • {formattedTime}</span>
                          </div>

                          <div className="flex items-center gap-2">
                            <button
                              onClick={(e) => handleDelete(e, item._id)}
                              disabled={deletingId === item._id}
                              className="p-2 rounded-lg text-slate-400 hover:text-rose-600 hover:bg-rose-50 transition cursor-pointer"
                              title="Delete Interview Record"
                            >
                              <FaTrashAlt size={13} />
                            </button>

                            <button
                              onClick={() => navigate(`/interview/report/${item._id}`)}
                              className="inline-flex items-center gap-1.5 px-3.5 py-1.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white text-xs font-semibold transition cursor-pointer"
                            >
                              <FaEye size={12} />
                              View Report
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    );
                  })}
                </div>
              )}
            </>
          )}
        </main>
      </div>

      {/* Auth Modal */}
      {showAuthModal && (
        <Auth isModel={true} onClose={() => setShowAuthModal(false)} />
      )}

      <Footer />
    </div>
  );
}

export default History;
