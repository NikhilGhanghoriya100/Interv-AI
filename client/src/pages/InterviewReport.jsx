import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import axios from "axios";
import { ServerUrl } from "../App";
import Step3Report from "../components/Step3Report";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { HiArrowLeft } from "react-icons/hi2";

function InterviewReport() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [report, setReport] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchReport = async () => {
      setLoading(true);
      setError(null);
      try {
        const response = await axios.get(`${ServerUrl}/api/interview/report/${id}`, {
          withCredentials: true,
        });
        setReport(response.data);
      } catch (err) {
        console.error("Failed to fetch report:", err);
        setError(err.response?.data?.message || "Failed to load report");
      } finally {
        setLoading(false);
      }
    };

    if (id) {
      fetchReport();
    }
  }, [id]);

  if (loading) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
        <Navbar />
        <div className="text-center py-20">
          <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin mx-auto mb-4" />
          <p className="text-slate-500 font-medium text-sm">Loading interview report...</p>
        </div>
        <Footer />
      </div>
    );
  }

  if (error || !report) {
    return (
      <div className="min-h-screen bg-[#f8fafc] flex flex-col justify-between">
        <Navbar />
        <div className="max-w-md mx-auto my-20 p-8 bg-white rounded-3xl border border-slate-200 text-center shadow-sm">
          <h2 className="text-xl font-bold text-slate-800 mb-2">Report Not Found</h2>
          <p className="text-slate-500 text-sm mb-6">{error || "Could not find the requested interview report."}</p>
          <button
            onClick={() => navigate("/history")}
            className="inline-flex items-center gap-2 bg-slate-900 text-white px-5 py-2.5 rounded-xl font-semibold text-sm hover:bg-slate-800 transition cursor-pointer"
          >
            <HiArrowLeft /> Back to History
          </button>
        </div>
        <Footer />
      </div>
    );
  }

  return (
    <Step3Report
      report={report}
      onRetake={() => navigate("/interview")}
    />
  );
}

export default InterviewReport;
