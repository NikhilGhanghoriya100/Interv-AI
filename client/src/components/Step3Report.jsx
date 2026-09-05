import React, { useState } from "react";
import { motion } from "motion/react";
import { useNavigate } from "react-router-dom";
import {
  FaAward,
  FaRedo,
  FaPrint,
  FaCheckCircle,
  FaExclamationCircle,
  FaChevronDown,
  FaChevronUp,
  FaBriefcase,
  FaLightbulb,
} from "react-icons/fa";
import { HiSparkles } from "react-icons/hi2";
import { BsBarChartFill, BsShieldCheck } from "react-icons/bs";
import Navbar from "./Navbar";
import Footer from "./Footer";

function Step3Report({ report, onRetake }) {
  const navigate = useNavigate();
  const [expandedIndex, setExpandedIndex] = useState(0);

  const finalScore = report?.finalScore ?? 0;
  const confidence = report?.confidence ?? 0;
  const communication = report?.communication ?? 0;
  const correctness = report?.correctness ?? 0;
  const questionWiseScore = report?.questionWiseScore || [];
  const role = report?.role || "Candidate";
  const experience = report?.experience || "N/A";
  const mode = report?.mode || "Technical";

  // Score badge & status helper
  const getScoreStatus = (score) => {
    if (score >= 8) return { label: "Excellent", color: "text-emerald-600", bg: "bg-emerald-50", border: "border-emerald-200" };
    if (score >= 6) return { label: "Good Performance", color: "text-teal-600", bg: "bg-teal-50", border: "border-teal-200" };
    if (score >= 4) return { label: "Average", color: "text-amber-600", bg: "bg-amber-50", border: "border-amber-200" };
    return { label: "Needs Improvement", color: "text-rose-600", bg: "bg-rose-50", border: "border-rose-200" };
  };

  const status = getScoreStatus(finalScore);

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 print:bg-white print:p-0">
      <style>{`
        @media print {
          @page {
            size: A4;
            margin: 12mm 15mm 15mm 15mm;
          }
          body {
            -webkit-print-color-adjust: exact !important;
            print-color-adjust: exact !important;
            background: #ffffff !important;
          }
          .print-break-avoid {
            break-inside: avoid !important;
            page-break-inside: avoid !important;
          }
        }
      `}</style>

      {/* Navbar (hidden during print) */}
      <div className="print:hidden">
        <Navbar />
      </div>

      <main className="max-w-6xl mx-auto px-4 sm:px-6 py-8 sm:py-12">
        {/* TOP BANNER */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="mb-8 flex flex-col md:flex-row md:items-center justify-between gap-4 border-b border-slate-200 pb-6 print:border-b-2 print:pb-4"
        >
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-3 print:border-emerald-300">
              <HiSparkles size={14} />
              AI Interview Assessment Completed
            </div>
            <h1 className="text-3xl sm:text-4xl font-bold text-slate-900 tracking-tight">
              Interview Performance Report
            </h1>
            <div className="flex flex-wrap items-center gap-3 mt-2 text-sm text-slate-500">
              <span className="flex items-center gap-1 font-medium text-slate-700">
                <FaBriefcase className="text-emerald-500" /> {role}
              </span>
              <span>•</span>
              <span>Exp: {experience}</span>
              <span>•</span>
              <span className="px-2.5 py-0.5 rounded-md bg-slate-100 font-semibold text-slate-700 text-xs">
                {mode} Round
              </span>
            </div>
          </div>

          {/* ACTION BUTTONS (hidden in print) */}
          <div className="flex flex-wrap items-center gap-3 print:hidden">
            <button
              onClick={() => navigate("/history")}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-100 border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-200 transition shadow-sm cursor-pointer"
              title="Back to History"
            >
              <BsBarChartFill size={14} className="text-emerald-600" />
              History
            </button>

            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-white border border-slate-200 text-slate-700 font-semibold text-sm hover:bg-slate-50 transition shadow-sm cursor-pointer"
              title="Print or Save as PDF"
            >
              <FaPrint size={14} />
              Download PDF
            </button>

            <button
              onClick={() => {
                if (onRetake) onRetake();
                else navigate("/interview");
              }}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 text-white font-semibold text-sm hover:bg-slate-800 transition shadow-sm cursor-pointer"
            >
              <FaRedo size={13} />
              Retake Interview
            </button>
          </div>
        </motion.div>

        {/* OVERALL SCORE & SUB-METRICS GRID */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-10 print-break-avoid">
          {/* MAIN SCORE CARD */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="bg-gradient-to-br from-slate-900 via-slate-800 to-emerald-950 text-white rounded-3xl p-6 sm:p-8 flex flex-col justify-between shadow-xl relative overflow-hidden print:bg-slate-900 print:text-white print-break-avoid"
          >
            <div className="absolute -right-12 -bottom-12 w-44 h-44 bg-emerald-500/10 rounded-full blur-2xl pointer-events-none print:hidden" />

            <div>
              <div className="flex items-center justify-between">
                <span className="text-xs uppercase tracking-widest text-emerald-400 font-bold">
                  Overall Score
                </span>
                <span className="p-2 bg-white/10 rounded-xl text-emerald-400">
                  <FaAward size={20} />
                </span>
              </div>

              <div className="mt-6 flex items-baseline gap-2">
                <span className="text-6xl font-extrabold text-white tracking-tight">
                  {finalScore}
                </span>
                <span className="text-slate-400 text-xl font-medium">/ 10</span>
              </div>

              <div className="mt-4">
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${status.bg} ${status.color} border ${status.border}`}
                >
                  {status.label}
                </span>
              </div>
            </div>

            <p className="mt-6 text-xs text-slate-400 leading-relaxed border-t border-white/10 pt-4">
              Calculated across all {questionWiseScore.length} questions based on AI evaluative assessment.
            </p>
          </motion.div>

          {/* SUB-METRICS (Confidence, Communication, Correctness) */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="lg:col-span-2 bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm flex flex-col justify-between print-break-avoid"
          >
            <div>
              <div className="flex items-center justify-between mb-6">
                <h3 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <BsBarChartFill className="text-emerald-500" /> Core Assessment Breakdown
                </h3>
                <span className="text-xs text-slate-400">Scores out of 10</span>
              </div>

              <div className="grid sm:grid-cols-3 gap-5">
                {/* Confidence */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 print:border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Confidence</span>
                    <BsShieldCheck className="text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">
                    {confidence} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(confidence * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Communication */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 print:border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Communication</span>
                    <FaLightbulb className="text-teal-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">
                    {communication} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-teal-500 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(communication * 10, 100)}%` }}
                    />
                  </div>
                </div>

                {/* Correctness */}
                <div className="p-4 rounded-2xl bg-slate-50 border border-slate-100 print:border-slate-200">
                  <div className="flex items-center justify-between mb-2">
                    <span className="text-xs font-semibold text-slate-500">Correctness</span>
                    <FaCheckCircle className="text-emerald-600" />
                  </div>
                  <div className="text-2xl font-bold text-slate-900 mb-2">
                    {correctness} <span className="text-xs text-slate-400 font-normal">/ 10</span>
                  </div>
                  <div className="w-full bg-slate-200 h-2 rounded-full overflow-hidden">
                    <div
                      className="bg-emerald-600 h-full rounded-full transition-all duration-500"
                      style={{ width: `${Math.min(correctness * 10, 100)}%` }}
                    />
                  </div>
                </div>
              </div>
            </div>

            <div className="mt-6 pt-4 border-t border-slate-100 flex flex-wrap items-center justify-between gap-2 text-xs text-slate-500">
              <span>💡 Focus on clarity, structured examples, and direct answers for highest ratings.</span>
              <span className="font-semibold text-emerald-600">Adaptive AI Evaluator</span>
            </div>
          </motion.div>
        </div>

        {/* QUESTION WISE ANALYSIS SECTION */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm mb-12 print:border-0 print:p-0 print:shadow-none"
        >
          <div className="mb-6">
            <h2 className="text-xl font-bold text-slate-900">
              Question-by-Question Analysis
            </h2>
            <p className="text-sm text-slate-500 mt-1">
              Review your answers, individual parameter scores, and AI feedback.
            </p>
          </div>

          {questionWiseScore.length === 0 ? (
            <div className="text-center py-12 text-slate-400">
              <FaExclamationCircle size={32} className="mx-auto mb-3" />
              <p>No questions found in this report.</p>
            </div>
          ) : (
            <div className="space-y-4">
              {questionWiseScore.map((q, idx) => {
                const isExpanded = expandedIndex === idx;
                const qStatus = getScoreStatus(q.score || 0);

                return (
                  <div
                    key={idx}
                    className="border border-slate-200 rounded-2xl overflow-hidden transition-all duration-200 hover:border-slate-300 print-break-avoid print:border-slate-300 print:mb-4"
                  >
                    {/* ACCORDION HEADER */}
                    <button
                      type="button"
                      onClick={() => setExpandedIndex(isExpanded ? -1 : idx)}
                      className="w-full p-4 sm:p-5 flex items-center justify-between gap-4 text-left bg-slate-50/70 hover:bg-slate-100/70 transition cursor-pointer print:bg-slate-100"
                    >
                      <div className="flex items-start sm:items-center gap-3 flex-1 min-w-0">
                        <span className="flex-shrink-0 w-8 h-8 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-sm flex items-center justify-center print:border print:border-emerald-300">
                          {idx + 1}
                        </span>
                        <div className="flex-1 min-w-0">
                          <p className="font-semibold text-slate-900 text-sm sm:text-base line-clamp-1 print:line-clamp-none">
                            {q.question}
                          </p>
                          <div className="flex items-center gap-2 mt-1">
                            <span className="text-[11px] font-medium text-slate-400 uppercase">
                              {q.difficulty || "medium"}
                            </span>
                            <span className="text-slate-300 print:hidden">•</span>
                            <span className="text-xs text-slate-600 truncate max-w-xs print:hidden">
                              {q.feedback}
                            </span>
                          </div>
                        </div>
                      </div>

                      <div className="flex items-center gap-3 flex-shrink-0">
                        <span
                          className={`px-3 py-1 rounded-xl text-xs font-bold ${qStatus.bg} ${qStatus.color} border ${qStatus.border}`}
                        >
                          {q.score || 0} / 10
                        </span>
                        <span className="print:hidden">
                          {isExpanded ? (
                            <FaChevronUp className="text-slate-400 text-xs" />
                          ) : (
                            <FaChevronDown className="text-slate-400 text-xs" />
                          )}
                        </span>
                      </div>
                    </button>

                    {/* EXPANDED CONTENT: Rendered if expanded on screen OR always shown during print */}
                    <div
                      className={`${
                        isExpanded ? "block" : "hidden"
                      } print:!block p-5 sm:p-6 bg-white border-t border-slate-100 space-y-5 print:p-4`}
                    >
                      {/* Question Prompt */}
                      <div>
                        <p className="text-xs font-bold uppercase text-slate-400 mb-1 tracking-wider">
                          Question
                        </p>
                        <p className="text-slate-800 font-medium text-sm sm:text-base leading-relaxed">
                          {q.question}
                        </p>
                      </div>

                      {/* Candidate's Answer */}
                      <div className="bg-slate-50 p-4 rounded-xl border border-slate-200">
                        <p className="text-xs font-bold uppercase text-slate-500 mb-2 tracking-wider">
                          Your Answer
                        </p>
                        <p className="text-slate-700 text-sm italic leading-relaxed">
                          {q.answer ? `"${q.answer}"` : "No answer provided."}
                        </p>
                      </div>

                      {/* AI Feedback */}
                      <div className="bg-emerald-50/60 p-4 rounded-xl border border-emerald-100">
                        <div className="flex items-center gap-2 mb-1 text-emerald-800 font-semibold text-xs uppercase tracking-wider">
                          <HiSparkles size={14} /> AI Evaluator Feedback
                        </div>
                        <p className="text-emerald-950 font-medium text-sm leading-relaxed">
                          {q.feedback || "Evaluated response recorded."}
                        </p>
                      </div>

                      {/* Metric scores breakdown */}
                      <div className="grid grid-cols-3 gap-3 pt-2">
                        <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-500 block">Confidence</span>
                          <span className="text-base font-bold text-slate-900">{q.confidence || 0} / 10</span>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-500 block">Communication</span>
                          <span className="text-base font-bold text-slate-900">{q.communication || 0} / 10</span>
                        </div>
                        <div className="text-center p-3 rounded-xl bg-slate-50 border border-slate-100">
                          <span className="text-[11px] font-semibold text-slate-500 block">Correctness</span>
                          <span className="text-base font-bold text-slate-900">{q.correctness || 0} / 10</span>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </motion.div>
      </main>

      {/* Footer (hidden during print) */}
      <div className="print:hidden">
        <Footer />
      </div>
    </div>
  );
}

export default Step3Report;

