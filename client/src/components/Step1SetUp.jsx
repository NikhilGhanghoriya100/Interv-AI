import React, { useState } from "react";
import { motion } from "framer-motion";
import axios from "axios";

import {
  FaUserTie,
  FaMicrophoneAlt,
  FaChartLine,
  FaBriefcase,
  FaFileUpload,
} from "react-icons/fa";

import { HiOutlineSparkles } from "react-icons/hi2";

import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { useDispatch, useSelector } from "react-redux";
import { setUserData } from "../redux/userSlice";

export const ServerUrl = import.meta.env.VITE_SERVER_URL || "http://localhost:8000";

function Step1SetUp({ onStart }) {
  const [role, setRole] = useState("");
  const [experience, setExperience] = useState("");
  const [mode, setMode] = useState("Technical");
  const [loading, setLoading] = useState(false);
  const [resumeFile, setResumeFile] = useState(null);
  const [skills, setSkills] = useState([]);
  const [resumeText, setResumeText] = useState("");
  const [analysisDone, setAnalysisDone] = useState(false);
  const [analyzing, setAnalyzing] = useState(false);
  const [projects, setProjects] = useState([]);
  const {userData} = useSelector((state)=>state.user)
  const dispatch = useDispatch()

  const handleUploadResume = async () => {
    if (!resumeFile || analyzing) return;

    setAnalyzing(true);

    const formdata = new FormData();
    formdata.append("resume", resumeFile);

    try {
      const result = await axios.post(
        ServerUrl + "/api/interview/resume",
        formdata,
        {
          withCredentials: true,
        }
      );

      console.log(result.data);

      setRole(result.data.role || "");
      setExperience(result.data.experience || "");
      setProjects(result.data.projects || []);
      setSkills(result.data.skills || []);
      setResumeText(result.data.resumeText || "");

      setAnalysisDone(true);
    } catch (error) {
      console.log("Resume analysis error:", error);
    } finally {
      setAnalyzing(false);
    }
  };

  const features = [
    {
      icon: <FaUserTie />,
      title: "Choose your role",
      desc: "Set your target role and experience.",
    },
    {
      icon: <FaMicrophoneAlt />,
      title: "AI Mock Interview",
      desc: "Practice realistic interview questions.",
    },
    {
      icon: <FaChartLine />,
      title: "Smart Feedback",
      desc: "Improve with actionable performance insights.",
    },
  ];

  const handleStart =async() => {
    setLoading(true)
    try {
      const result = await axios.post(ServerUrl + "/api/interview/generate-questions", {role, experience, mode, resumeText, projects, skills}, {withCredentials:true})
      console.log(result.data)
      if(userData){
        dispatch(setUserData({...userData , credits:result.data.creditsLeft}))
      }
      setLoading(false)
      onStart(result.data)
      
    } catch (error) {
      console.log(error)
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen bg-[#f3f3f3]">

      {/* NAVBAR */}
      <Navbar />

      {/* MAIN CONTENT */}
      <main className="px-3 sm:px-6 py-8 sm:py-12">

        <div className="max-w-6xl mx-auto">

          {/* HEADER */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="text-center mb-8 sm:mb-10"
          >
            <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4">
              <HiOutlineSparkles size={15} />
              AI Interview Setup
            </div>

            <h1 className="text-3xl sm:text-4xl md:text-5xl font-bold text-slate-900">
              Everything starts with a
              <span className="text-emerald-500"> great setup.</span>
            </h1>

            <p className="mt-3 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto">
              Tell Interv.AI about your target role and experience
              to create a personalized interview.
            </p>
          </motion.div>

          {/* MAIN CARD */}
          <motion.div
            initial={{ opacity: 0, y: 25 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
            className="w-full bg-white rounded-[26px] border border-slate-200 shadow-sm overflow-hidden"
          >

            <div className="grid lg:grid-cols-2">

              {/* LEFT */}
              <div className="relative bg-slate-950 p-6 sm:p-8 md:p-10 lg:p-12">

                {/* Glow */}
                <div className="absolute -top-24 -right-24 w-64 h-64 bg-emerald-400/10 rounded-full blur-3xl pointer-events-none" />

                <div className="relative">

                  <p className="text-emerald-400 text-xs font-semibold uppercase tracking-widest mb-3">
                    Interv.AI
                  </p>

                  <h2 className="text-2xl sm:text-3xl font-bold text-white leading-tight">
                    Practice smarter.
                    <br />
                    Interview better.
                  </h2>

                  <p className="text-slate-400 text-sm leading-relaxed mt-4 max-w-md">
                    Prepare for your next interview with an AI interviewer
                    that adapts to your role, experience and skills.
                  </p>

                  {/* FEATURES */}
                  <div className="mt-8 space-y-3">

                    {features.map((item, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{
                          delay: 0.2 + index * 0.12,
                        }}
                        className="flex items-center gap-3 p-3.5 rounded-xl bg-white/5 border border-white/5"
                      >
                        <div className="w-9 h-9 shrink-0 rounded-lg bg-emerald-400/10 text-emerald-400 flex items-center justify-center">
                          {item.icon}
                        </div>

                        <div>
                          <p className="text-sm font-medium text-white">
                            {item.title}
                          </p>

                          <p className="text-xs text-slate-500 mt-0.5">
                            {item.desc}
                          </p>
                        </div>
                      </motion.div>
                    ))}

                  </div>

                </div>
              </div>

              {/* RIGHT */}
              <div className="p-5 sm:p-8 md:p-10 lg:p-12">

                <div className="max-w-xl mx-auto">

                  {/* FORM HEADER */}
                  <div className="mb-7">

                    <p className="text-xs font-semibold text-emerald-600 uppercase tracking-widest mb-2">
                      Step 1
                    </p>

                    <h2 className="text-2xl sm:text-3xl font-bold text-slate-900">
                      Interview Setup
                    </h2>

                    <p className="text-sm text-slate-500 mt-2">
                      Configure your interview before getting started.
                    </p>

                  </div>

                  <div className="space-y-5">

                    {/* ROLE */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Target Role
                      </label>

                      <div className="relative">

                        <FaUserTie className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                          type="text"
                          placeholder="e.g. Frontend Developer"
                          value={role}
                          onChange={(e) => setRole(e.target.value)}
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                        />

                      </div>
                    </div>

                    {/* EXPERIENCE */}
                    <div>
                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Experience
                      </label>

                      <div className="relative">

                        <FaBriefcase className="absolute left-4 top-1/2 -translate-y-1/2 text-slate-400" />

                        <input
                          type="text"
                          placeholder="e.g. Fresher / 2 years"
                          value={experience}
                          onChange={(e) =>
                            setExperience(e.target.value)
                          }
                          className="w-full pl-11 pr-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                        />

                      </div>
                    </div>

                    {/* MODE */}
                    <div>

                      <label className="block text-sm font-medium text-slate-700 mb-2">
                        Interview Type
                      </label>

                      <select
                        value={mode}
                        onChange={(e) => setMode(e.target.value)}
                        className="w-full px-4 py-3.5 bg-slate-50 border border-slate-200 rounded-xl outline-none text-sm focus:bg-white focus:border-emerald-400 focus:ring-2 focus:ring-emerald-100 transition"
                      >
                        <option value="Technical">
                          Technical Interview
                        </option>

                        <option value="HR">
                          HR Interview
                        </option>
                      </select>

                    </div>

                    {/* RESUME */}
                    {!analysisDone && (
                      <div>

                        <label className="block text-sm font-medium text-slate-700 mb-2">
                          Resume
                          <span className="text-slate-400 font-normal">
                            {" "}
                            (Optional)
                          </span>
                        </label>

                        <motion.div
                          whileHover={{ scale: 1.01 }}
                          onClick={() =>
                            document
                              .getElementById("resumeUpload")
                              .click()
                          }
                          className="border-2 border-dashed border-slate-200 rounded-2xl p-6 text-center cursor-pointer hover:border-emerald-400 hover:bg-emerald-50/40 transition"
                        >

                          <input
                            type="file"
                            accept="application/pdf"
                            id="resumeUpload"
                            className="hidden"
                            onChange={(e) =>
                              setResumeFile(e.target.files[0])
                            }
                          />

                          <div className="w-11 h-11 mx-auto rounded-xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-3">
                            <FaFileUpload size={19} />
                          </div>

                          <p className="text-sm font-medium text-slate-700">
                            {resumeFile
                              ? resumeFile.name
                              : "Upload your resume"}
                          </p>

                          <p className="text-xs text-slate-400 mt-1">
                            PDF only • Optional
                          </p>

                          {resumeFile && (
                            <motion.button
                              whileTap={{ scale: 0.97 }}
                              onClick={(e) => {
                                e.stopPropagation();
                                handleUploadResume();
                              }}
                              className="mt-4 bg-slate-950 text-white px-5 py-2.5 rounded-xl text-sm font-semibold hover:bg-slate-800 transition"
                            >
                              {analyzing
                                ? "Analyzing..."
                                : "Analyze Resume"}
                            </motion.button>
                          )}

                        </motion.div>

                      </div>
                    )}

                    {/* ANALYSIS RESULT */}
                    {analysisDone && (
                      <motion.div
                        initial={{ opacity: 0, y: 15 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-slate-50 border border-slate-200 rounded-2xl p-5"
                      >

                        <div className="flex items-center gap-2 mb-4">

                          <div className="w-8 h-8 rounded-lg bg-emerald-100 text-emerald-600 flex items-center justify-center">
                            <HiOutlineSparkles size={17} />
                          </div>

                          <h3 className="font-semibold text-slate-800">
                            Resume Analysis
                          </h3>

                        </div>

                        {/* SKILLS */}
                        {skills.length > 0 && (
                          <div className="mb-4">

                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                              Skills
                            </p>

                            <div className="flex flex-wrap gap-2">

                              {skills.map((skill, i) => (
                                <span
                                  key={i}
                                  className="bg-white border border-emerald-100 text-emerald-700 px-2.5 py-1 rounded-lg text-xs font-medium"
                                >
                                  {skill}
                                </span>
                              ))}

                            </div>

                          </div>
                        )}

                        {/* PROJECTS */}
                        {projects.length > 0 && (
                          <div>

                            <p className="text-xs font-semibold text-slate-500 uppercase tracking-wide mb-2">
                              Projects
                            </p>

                            <ul className="space-y-1.5">

                              {projects.map((project, i) => (
  <li
    key={i}
    className="text-sm text-slate-600"
  >
    <span className="font-medium text-slate-700">
      • {project.name}
    </span>

    {project.description && (
      <span className="text-slate-500">
        {" — "}{project.description}
      </span>
    )}
  </li>
))}

                            </ul>

                          </div>
                        )}

                      </motion.div>
                    )}

                    {/* START INTERVIEW */}
                    <motion.button
                      disabled={
                        !role ||
                        !experience ||
                        loading
                      }
                      whileHover={{
                        scale:
                          !role ||
                          !experience ||
                          analyzing
                            ? 1
                            : 1.02,
                      }}
                      whileTap={{
                        scale:
                          !role ||
                          !experience ||
                          analyzing
                            ? 1
                            : 0.98,
                      }}
                      // onClick={() =>
                      //   onStart &&
                      //   onStart({
                      //     role,
                      //     experience,
                      //     mode,
                      //     skills,
                      //     projects,
                      //   })
                      // }
                      onClick={handleStart}
                      className="w-full bg-emerald-400 hover:bg-emerald-300 disabled:bg-slate-300 disabled:text-slate-500 text-slate-950 py-3.5 rounded-xl text-sm sm:text-base font-bold transition"
                    >
                      {loading ? "Starting...": "Start Interview →"}
                    </motion.button>

                  </div>

                </div>
              </div>

            </div>
          </motion.div>

        </div>
      </main>

      {/* FOOTER */}
      <Footer />

    </div>
  );
}

export default Step1SetUp;
