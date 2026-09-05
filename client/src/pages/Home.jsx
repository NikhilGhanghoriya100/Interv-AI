import React, { useState } from "react";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useSelector } from "react-redux";
import { motion } from "motion/react";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import { useNavigate } from "react-router-dom";

import {
  BsRobot,
  BsMic,
  BsClock,
  BsBarChart,
  BsFileEarmarkText,
  BsCheckCircleFill,
} from "react-icons/bs";

import { RiBrainLine } from "react-icons/ri";
import { IoSparkles } from "react-icons/io5";

import Auth from "./Auth";

import evalImg from "../assets/ai-ans.png";
import hrImg from "../assets/HR.png";
import techImg from "../assets/tech.png";
import confidenceImg from "../assets/confi.png";
import creditImg from "../assets/credit.png";
import resumeImg from "../assets/resume.png";
import pdfImg from "../assets/pdf.png";
import analyticsImg from "../assets/history.png";

function Home() {
  const { userData } = useSelector((state) => state.user);

  const [showAuth, setShowAuth] = useState(false);

  const navigate = useNavigate();

  const handleStartInterview = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate("/interview");
  };

  const handleHistory = () => {
    if (!userData) {
      setShowAuth(true);
      return;
    }

    navigate("/history");
  };

  const steps = [
    {
      icon: <BsRobot size={23} />,
      step: "01",
      title: "Choose Your Role",
      desc: "Select your target role and experience level. Interv.AI adapts the interview accordingly.",
    },
    {
      icon: <BsMic size={23} />,
      step: "02",
      title: "Talk With AI",
      desc: "Experience a realistic voice interview with dynamic questions and intelligent follow-ups.",
    },
    {
      icon: <BsBarChart size={23} />,
      step: "03",
      title: "Get AI Feedback",
      desc: "Receive detailed performance insights to understand your strengths and improve faster.",
    },
  ];

  const capabilities = [
    {
      image: evalImg,
      icon: <BsBarChart size={19} />,
      title: "AI Answer Evaluation",
      desc: "Analyze communication, technical accuracy, confidence and overall answer quality.",
    },
    {
      image: resumeImg,
      icon: <BsFileEarmarkText size={19} />,
      title: "Resume Based Interview",
      desc: "Generate project-specific questions based on the experience mentioned in your resume.",
    },
    {
      image: pdfImg,
      icon: <BsFileEarmarkText size={19} />,
      title: "Downloadable PDF Report",
      desc: "Get a detailed report with strengths, weaknesses and actionable improvement insights.",
    },
    {
      image: analyticsImg,
      icon: <BsBarChart size={19} />,
      title: "History & Analytics",
      desc: "Track your interview performance and monitor your progress over multiple sessions.",
    },
  ];

  const modes = [
    {
      image: hrImg,
      label: "Behavioral",
      title: "HR Interview",
      desc: "Practice communication, behavioral and situational questions.",
    },
    {
      image: techImg,
      label: "Technical",
      title: "Technical Interview",
      desc: "Challenge yourself with role-specific technical questions.",
    },
    {
      image: confidenceImg,
      label: "Analysis",
      title: "Confidence Detection",
      desc: "Understand your speaking confidence and communication patterns.",
    },
    {
      image: creditImg,
      label: "Flexible",
      title: "Credit System",
      desc: "Use credits to unlock and manage your AI interview sessions.",
    },
  ];

  return (
    <div className="min-h-screen bg-[#f3f3f3] text-slate-900">
      <Navbar />

      <main>
        {/* =====================================================
            HERO
        ===================================================== */}

        <section className="relative overflow-hidden px-4 sm:px-6 pt-16 sm:pt-20 lg:pt-24 pb-20">
          {/* Background */}
          <div className="absolute inset-0 pointer-events-none">
            <div className="absolute top-10 left-1/2 -translate-x-1/2 w-[500px] h-[300px] bg-emerald-300/20 blur-3xl rounded-full" />

            <div className="absolute inset-0 opacity-[0.035] bg-[linear-gradient(to_right,#000_1px,transparent_1px),linear-gradient(to_bottom,#000_1px,transparent_1px)] bg-[size:40px_40px]" />
          </div>

          <div className="relative max-w-6xl mx-auto text-center">
            {/* Badge */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="inline-flex items-center gap-2 bg-white border border-gray-200 shadow-sm px-4 py-2 rounded-full text-xs sm:text-sm text-slate-600 font-medium"
            >
              <span className="flex items-center justify-center w-6 h-6 rounded-full bg-emerald-50">
                <HiSparkles className="text-emerald-600" size={14} />
              </span>
              AI-Powered Interview Preparation
            </motion.div>

            {/* Heading */}
            <motion.h1
              initial={{ opacity: 0, y: 25 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.65, delay: 0.1 }}
              className="mt-7 text-4xl sm:text-5xl md:text-6xl lg:text-7xl font-bold tracking-tight leading-[1.05] max-w-5xl mx-auto"
            >
              Practice smarter.
              <br />
              <span className="text-slate-900">Interview with</span>{" "}
              <span className="relative inline-block text-emerald-600">
                AI.
                <span className="absolute -bottom-1 left-0 right-0 h-1 bg-emerald-300 rounded-full" />
              </span>
            </motion.h1>

            {/* Description */}
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.25 }}
              className="mt-7 text-slate-500 text-base sm:text-lg leading-relaxed max-w-2xl mx-auto"
            >
              Practice realistic mock interviews with an AI interviewer, get
              instant feedback, and build the confidence you need to perform
              better in your next interview.
            </motion.p>

            {/* Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6, delay: 0.35 }}
              className="flex flex-col sm:flex-row justify-center items-center gap-3 mt-9"
            >
              <button
                onClick={handleStartInterview}
                className="w-full sm:w-auto flex items-center justify-center gap-2 bg-slate-950 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 hover:-translate-y-0.5 transition-all shadow-lg"
              >
                Start AI Interview
                <HiArrowRight size={17} />
              </button>

              <button
                onClick={handleHistory}
                className="w-full sm:w-auto px-7 py-3.5 rounded-xl bg-white border border-gray-200 text-slate-700 font-semibold text-sm hover:bg-gray-50 transition-all"
              >
                View Interview History
              </button>
            </motion.div>

            {/* Trust points */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="flex flex-wrap justify-center gap-x-6 gap-y-3 mt-8 text-xs sm:text-sm text-slate-500"
            >
              <span className="flex items-center gap-1.5">
                <BsCheckCircleFill className="text-emerald-500" />
                AI-powered feedback
              </span>

              <span className="flex items-center gap-1.5">
                <BsCheckCircleFill className="text-emerald-500" />
                Role-based questions
              </span>

              <span className="flex items-center gap-1.5">
                <BsCheckCircleFill className="text-emerald-500" />
                Performance analytics
              </span>
            </motion.div>

            {/* Hero Preview */}
            <motion.div
              initial={{ opacity: 0, y: 50 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.5 }}
              className="mt-16 max-w-5xl mx-auto"
            >
              <div className="relative bg-slate-950 rounded-[28px] p-2 sm:p-3 shadow-2xl border border-slate-800">
                <div className="rounded-[20px] border border-slate-800 bg-slate-900 overflow-hidden">
                  {/* Fake browser header */}
                  <div className="h-10 border-b border-slate-800 flex items-center px-4 gap-1.5">
                    <span className="w-2.5 h-2.5 rounded-full bg-red-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-yellow-400/70" />
                    <span className="w-2.5 h-2.5 rounded-full bg-emerald-400/70" />

                    <div className="mx-auto hidden sm:block w-1/3 h-5 rounded-md bg-white/5" />
                  </div>

                  {/* Preview */}
                  <div className="grid md:grid-cols-2 gap-5 p-5 sm:p-8 text-left">
                    <div className="flex flex-col justify-center">
                      <div className="inline-flex w-fit items-center gap-2 text-xs text-emerald-400 bg-emerald-400/10 border border-emerald-400/10 px-3 py-1.5 rounded-full">
                        <RiBrainLine size={14} />
                        AI Interviewer
                      </div>

                      <h3 className="text-white text-xl sm:text-2xl font-semibold mt-4">
                        Tell me about yourself.
                      </h3>

                      <p className="text-slate-500 text-sm mt-3 leading-relaxed">
                        Answer naturally. The AI interviewer will listen,
                        evaluate your response and ask relevant follow-up
                        questions.
                      </p>

                      <div className="flex items-center gap-3 mt-6">
                        <div className="w-10 h-10 rounded-full bg-emerald-400 flex items-center justify-center text-slate-950">
                          <BsMic />
                        </div>

                        <div className="flex-1">
                          <div className="flex gap-1 items-center">
                            {[1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                              <span
                                key={item}
                                className="w-1 bg-emerald-400 rounded-full"
                                style={{
                                  height: `${10 + (item % 4) * 5}px`,
                                }}
                              />
                            ))}
                          </div>
                        </div>
                      </div>
                    </div>

                    <div className="bg-white/5 border border-white/10 rounded-2xl p-5">
                      <div className="flex items-center justify-between mb-5">
                        <span className="text-sm text-slate-300">
                          Live Evaluation
                        </span>

                        <span className="text-xs text-emerald-400 bg-emerald-400/10 px-2.5 py-1 rounded-full">
                          Analyzing
                        </span>
                      </div>

                      <div className="space-y-4">
                        {[
                          ["Communication", "82%"],
                          ["Technical Depth", "76%"],
                          ["Confidence", "88%"],
                        ].map(([label, value]) => (
                          <div key={label}>
                            <div className="flex justify-between text-xs mb-2">
                              <span className="text-slate-400">{label}</span>

                              <span className="text-slate-200">{value}</span>
                            </div>

                            <div className="h-2 bg-white/5 rounded-full overflow-hidden">
                              <div
                                className="h-full bg-emerald-400 rounded-full"
                                style={{ width: value }}
                              />
                            </div>
                          </div>
                        ))}
                      </div>

                      <div className="mt-7 pt-5 border-t border-white/10">
                        <p className="text-xs text-slate-500">
                          AI-generated insights based on your interview
                          performance.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </section>

        {/* =====================================================
            HOW IT WORKS
        ===================================================== */}

        <section id="how-it-works" className="px-4 sm:px-6 py-20 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-[0.2em] text-emerald-600 uppercase">
                How it works
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                From practice to{" "}
                <span className="text-emerald-600">confidence.</span>
              </h2>

              <p className="text-slate-500 text-sm sm:text-base mt-4">
                A simple three-step process designed to make every practice
                session meaningful.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-5">
              {steps.map((item, index) => (
                <motion.div
                  key={item.step}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.1,
                  }}
                  whileHover={{ y: -6 }}
                  className="relative bg-white border border-gray-200 rounded-3xl p-7 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all"
                >
                  <div className="flex items-start justify-between">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center">
                      {item.icon}
                    </div>

                    <span className="text-5xl font-bold text-slate-100">
                      {item.step}
                    </span>
                  </div>

                  <h3 className="font-bold text-lg mt-7">{item.title}</h3>

                  <p className="text-sm text-slate-500 leading-relaxed mt-3">
                    {item.desc}
                  </p>

                  {index !== steps.length - 1 && (
                    <div className="hidden md:block absolute top-14 -right-3 w-6 h-px bg-emerald-200 z-10" />
                  )}
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            DARK AI SECTION
        ===================================================== */}

        <section id="features" className="px-4 sm:px-6 py-20">
          <div className="max-w-6xl mx-auto bg-slate-950 rounded-[32px] px-5 sm:px-10 lg:px-14 py-14 sm:py-16 overflow-hidden relative">
            <div className="absolute -top-32 -right-20 w-80 h-80 bg-emerald-400/10 blur-3xl rounded-full" />

            <div className="relative">
              <div className="max-w-2xl">
                <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-400">
                  Powerful AI
                </span>

                <h2 className="text-3xl sm:text-4xl font-bold text-white mt-3">
                  Everything you need to{" "}
                  <span className="text-emerald-400">interview better.</span>
                </h2>

                <p className="text-slate-400 mt-4 text-sm sm:text-base leading-relaxed">
                  Interv.AI combines intelligent questioning, performance
                  analysis and personalized feedback into one interview
                  preparation platform.
                </p>
              </div>

              <div className="grid grid-cols-2 gap-3 sm:gap-5 mt-12">
                {capabilities.map((item, index) => (
                  <motion.div
                    key={item.title}
                    initial={{ opacity: 0, y: 25 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{
                      duration: 0.5,
                      delay: index * 0.08,
                    }}
                    whileHover={{ y: -4 }}
                    className="bg-white rounded-3xl p-3 sm:p-6 group min-w-0"
                  >
                    <div className="flex flex-col gap-4">
                      <div className="w-full h-28 sm:h-40 flex items-center justify-center bg-slate-50 rounded-2xl overflow-hidden">
                        <img
                          src={item.image}
                          alt={item.title}
                          className="w-full h-full object-contain group-hover:scale-105 transition-transform duration-300"
                        />
                      </div>

                      <div className="w-full min-w-0">
                        <div className="w-9 h-9 sm:w-10 sm:h-10 rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                          {item.icon}
                        </div>

                        <h3 className="font-bold text-sm sm:text-lg leading-tight">
                          {item.title}
                        </h3>

                        <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                          {item.desc}
                        </p>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* =====================================================
            INTERVIEW MODES
        ===================================================== */}

        <section className="px-4 sm:px-6 py-20 sm:py-24">
          <div className="max-w-6xl mx-auto">
            <div className="text-center max-w-2xl mx-auto mb-14">
              <span className="text-xs font-bold tracking-[0.2em] uppercase text-emerald-600">
                Interview modes
              </span>

              <h2 className="text-3xl sm:text-4xl font-bold mt-3">
                Practice for{" "}
                <span className="text-emerald-600">every situation.</span>
              </h2>

              <p className="text-slate-500 mt-4 text-sm sm:text-base">
                Choose the type of practice that matches your next interview.
              </p>
            </div>

            <div className="grid grid-cols-2 gap-3 sm:gap-5">
              {modes.map((mode, index) => (
                <motion.div
                  key={mode.title}
                  initial={{ opacity: 0, y: 25 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{
                    duration: 0.5,
                    delay: index * 0.08,
                  }}
                  whileHover={{ y: -5 }}
                  className="bg-white border border-gray-200 rounded-3xl p-4 sm:p-7 shadow-sm hover:shadow-xl hover:border-emerald-200 transition-all"
                >
                  <div className="flex flex-col gap-4">
                    <div className="w-full h-24 sm:h-28 bg-slate-50 rounded-2xl flex items-center justify-center">
                      <img
                        src={mode.image}
                        alt={mode.title}
                        className="w-16 h-16 sm:w-20 sm:h-20 object-contain"
                      />
                    </div>

                    <div>
                      <span className="inline-flex text-[10px] sm:text-xs font-semibold text-emerald-600 bg-emerald-50 px-2 py-1 rounded-full">
                        {mode.label}
                      </span>

                      <h3 className="font-bold text-sm sm:text-xl mt-3">
                        {mode.title}
                      </h3>

                      <p className="text-xs sm:text-sm text-slate-500 leading-relaxed mt-2">
                        {mode.desc}
                      </p>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* =====================================================
            FINAL CTA
        ===================================================== */}

        <section className="px-4 sm:px-6 pb-20">
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="relative max-w-6xl mx-auto overflow-hidden bg-emerald-400 rounded-[30px] px-6 sm:px-12 py-12 sm:py-14 text-center"
          >
            <div className="absolute -top-20 -left-20 w-56 h-56 bg-white/20 blur-3xl rounded-full" />

            <div className="relative">
              <div className="mx-auto w-12 h-12 bg-slate-950 text-emerald-400 rounded-2xl flex items-center justify-center mb-5">
                <IoSparkles size={22} />
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold text-slate-950">
                Ready for your next interview?
              </h2>

              <p className="text-slate-800/70 max-w-xl mx-auto mt-3 text-sm sm:text-base">
                Stop wondering if you're prepared. Start practicing with an AI
                interviewer today.
              </p>

              <button
                onClick={handleStartInterview}
                className="mt-7 inline-flex items-center gap-2 bg-slate-950 text-white px-7 py-3.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition-all shadow-lg"
              >
                Start Practicing
                <HiArrowRight size={17} />
              </button>
            </div>
          </motion.div>
        </section>
      </main>

      {/* Auth Modal */}
      {showAuth && <Auth isModel={true} onClose={() => setShowAuth(false)} />}

      <Footer />
    </div>
  );
}

export default Home;