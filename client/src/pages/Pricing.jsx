import React, { useState } from "react";
import { motion, AnimatePresence } from "motion/react";
import { useNavigate } from "react-router-dom";
import { useSelector, useDispatch } from "react-redux";
import axios from "axios";
import {
  FaCheck,
  FaTimes,
  FaAward,
  FaBolt,
  FaRocket,
  FaQuestionCircle,
  FaChevronDown,
  FaChevronUp,
} from "react-icons/fa";
import {
  BsCoin,
  BsShieldCheck,
  BsCheckCircleFill,
  BsFileEarmarkPdf,
  BsLightningChargeFill,
} from "react-icons/bs";
import { HiSparkles, HiArrowRight } from "react-icons/hi2";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import Auth from "./Auth";
import { ServerUrl } from "../App";
import { setUserData } from "../redux/userSlice";

function Pricing() {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { userData } = useSelector((state) => state.user);

  const [showAuthModal, setShowAuthModal] = useState(false);
  const [selectedPlan, setSelectedPlan] = useState(null);
  const [purchasing, setPurchasing] = useState(false);
  const [purchaseSuccess, setPurchaseSuccess] = useState(null);
  const [openFaq, setOpenFaq] = useState(null);

  const plans = [
    {
      id: "starter",
      name: "Starter Pack",
      tagline: "Ideal for a quick refresher before an interview.",
      price: "₹199",
      priceNumber: 199,
      credits: 150,
      interviewsCount: 3,
      popular: false,
      icon: <FaRocket className="text-emerald-500" size={22} />,
      features: [
        "150 Interview Credits (~3 Full Sessions)",
        "Technical & HR Interview Modes",
        "Realistic AI Voice Interaction",
        "Instant Evaluation & Scorecard",
        "Confidence & Correctness Analysis",
        "Standard Response Time",
      ],
      notIncluded: [
        "Resume-based Custom Questions",
        "Downloadable PDF Reports",
        "Priority AI Processing",
      ],
      buttonText: "Get Started",
      buttonVariant: "outline",
    },
    {
      id: "pro",
      name: "Pro Career",
      tagline: "Most popular for active job seekers & freshers.",
      price: "₹499",
      priceNumber: 499,
      credits: 500,
      interviewsCount: 10,
      popular: true,
      badge: "Most Popular",
      icon: <FaBolt className="text-emerald-400" size={22} />,
      features: [
        "500 Interview Credits (~10 Full Sessions)",
        "Resume Parsing & Role-Tailored Questions",
        "Technical, HR & Behavioral Modes",
        "Full Downloadable PDF Reports",
        "Speech, Tone & Clarity Detection",
        "Detailed Question-by-Question Feedback",
        "Priority Voice Processing",
      ],
      notIncluded: [],
      buttonText: "Upgrade to Pro",
      buttonVariant: "primary",
    },
    {
      id: "ultimate",
      name: "Ultimate Master",
      tagline: "Complete interview readiness & comprehensive analytics.",
      price: "₹999",
      priceNumber: 999,
      credits: 1500,
      interviewsCount: 30,
      popular: false,
      badge: "Best Value",
      icon: <FaAward className="text-teal-400" size={22} />,
      features: [
        "1500 Interview Credits (~30 Full Sessions)",
        "Unlimited Resume Uploads & Analysis",
        "Comprehensive Analytics & History",
        "Advanced Difficulty Levels (Easy to Hard)",
        "Full Downloadable PDF Reports",
        "Ultra-Fast AI Latency",
        "Lifetime Session Access",
        "Priority Support",
      ],
      notIncluded: [],
      buttonText: "Get Ultimate",
      buttonVariant: "dark",
    },
  ];

  const faqs = [
    {
      q: "How do interview credits work?",
      a: "Each full mock interview session consists of 5 role-tailored questions evaluated in real time by AI and consumes 50 credits. For example, 500 credits allow you to take 10 complete interview sessions.",
    },
    {
      q: "Do purchased credits ever expire?",
      a: "No! Your credits never expire. You can practice at your own pace whenever you have an upcoming interview.",
    },
    {
      q: "How does the resume-based interview work?",
      a: "When you upload your resume PDF during setup, our AI extracts your projects, skills, and work experience to ask specific, realistic questions just like a human interviewer would.",
    },
    {
      q: "Can I download or print my performance report?",
      a: "Yes! At the end of every interview and in your History dashboard, you can view the complete scorecard with question-by-question breakdown and save it as a clean PDF.",
    },
    {
      q: "Can I practice both Technical and HR rounds?",
      a: "Yes, all plans support both Technical and HR/Behavioral interview modes.",
    },
  ];

  const handleSelectPlan = (plan) => {
    if (!userData) {
      setShowAuthModal(true);
      return;
    }
    setSelectedPlan(plan);
  };

  const loadRazorpayScript = () => {
    return new Promise((resolve) => {
      if (window.Razorpay) {
        resolve(true);
        return;
      }
      const script = document.createElement("script");
      script.src = "https://checkout.razorpay.com/v1/checkout.js";
      script.onload = () => resolve(true);
      script.onerror = () => resolve(false);
      document.body.appendChild(script);
    });
  };

  const handleConfirmPurchase = async () => {
    if (!selectedPlan || purchasing) return;

    setPurchasing(true);
    try {
      const isScriptLoaded = await loadRazorpayScript();
      if (!isScriptLoaded) {
        alert("Failed to load Razorpay SDK. Please check your internet connection.");
        setPurchasing(false);
        return;
      }

      // Step 1: Create Razorpay Order on backend
      const orderResponse = await axios.post(
        `${ServerUrl}/api/payment/create-order`,
        {
          amount: selectedPlan.priceNumber,
          credits: selectedPlan.credits,
          planName: selectedPlan.name,
        },
        { withCredentials: true }
      );

      const { order, key } = orderResponse.data;
      const cleanKey = String(key || "").replace(/['"]/g, "").trim();

      // If Razorpay keys are configured on backend, open Razorpay Checkout
      if (order && order.id && cleanKey && cleanKey !== "rzp_test_placeholder") {
        const options = {
          key: cleanKey,
          amount: order.amount,
          currency: order.currency || "INR",
          name: "Interv.AI",
          description: `${selectedPlan.name} (${selectedPlan.credits} Credits)`,
          image: window.location.origin + "/logo1.png",
          order_id: order.id,
          handler: async function (response) {
            try {
              setPurchasing(true);
              // Step 2: Verify payment signature on backend
              const verifyResponse = await axios.post(
                `${ServerUrl}/api/payment/verify-payment`,
                {
                  razorpay_order_id: response.razorpay_order_id,
                  razorpay_payment_id: response.razorpay_payment_id,
                  razorpay_signature: response.razorpay_signature,
                  credits: selectedPlan.credits,
                  planName: selectedPlan.name,
                },
                { withCredentials: true }
              );

              if (verifyResponse.data.success) {
                dispatch(
                  setUserData({
                    ...userData,
                    credits: verifyResponse.data.credits,
                  })
                );

                setPurchaseSuccess({
                  plan: selectedPlan,
                  newCredits: verifyResponse.data.credits,
                  paymentId: response.razorpay_payment_id,
                });
                setSelectedPlan(null);
              }
            } catch (verifyError) {
              console.error("Signature verification error:", verifyError);
              alert(
                verifyError.response?.data?.message ||
                  "Payment signature verification failed. Please contact support."
              );
            } finally {
              setPurchasing(false);
            }
          },
          prefill: {
            name: userData?.name || "",
            email: userData?.email || "",
          },
          theme: {
            color: "#10b981", // emerald-500
          },
          modal: {
            ondismiss: function () {
              setPurchasing(false);
            },
          },
        };

        const rzp = new window.Razorpay(options);
        rzp.on("payment.failed", function (resp) {
          console.error("Payment failed:", resp.error);
          alert(`Payment failed: ${resp.error?.description || "Payment could not be completed"}`);
          setPurchasing(false);
        });
        rzp.open();
        setPurchasing(false);
      } else {
        // Fallback / Direct development credit top-up
        const fallbackRes = await axios.post(
          `${ServerUrl}/api/user/buy-credits`,
          {
            credits: selectedPlan.credits,
            planName: selectedPlan.name,
            amount: selectedPlan.price,
          },
          { withCredentials: true }
        );

        dispatch(
          setUserData({
            ...userData,
            credits: fallbackRes.data.credits,
          })
        );

        setPurchaseSuccess({
          plan: selectedPlan,
          newCredits: fallbackRes.data.credits,
        });
        setSelectedPlan(null);
      }
    } catch (error) {
      console.error("Payment error:", error);
      alert(error.response?.data?.message || "Failed to process payment");
    } finally {
      setPurchasing(false);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8fafc] text-slate-900 flex flex-col justify-between">
      <div>
        <Navbar />

        <main className="max-w-6xl mx-auto px-4 sm:px-6 py-10 sm:py-16">
          {/* =====================================================
              HERO HEADER
          ===================================================== */}
          <div className="text-center max-w-3xl mx-auto mb-12 sm:mb-16">
            <motion.div
              initial={{ opacity: 0, y: 15 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.4 }}
              className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-emerald-50 border border-emerald-200 text-emerald-700 text-xs font-semibold mb-4"
            >
              <HiSparkles size={14} />
              Flexible Credit Plans
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              className="text-3xl sm:text-5xl font-extrabold text-slate-900 tracking-tight leading-tight"
            >
              Invest in your career.
              <br />
              <span className="text-emerald-600">Practice with AI.</span>
            </motion.h1>

            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.6, delay: 0.2 }}
              className="mt-4 text-sm sm:text-base text-slate-500 max-w-2xl mx-auto leading-relaxed"
            >
              Choose the credit plan that fits your preparation goals. Practice real-time voice interviews, get instant scores, and crack your dream job.
            </motion.p>

            {/* Current Balance Pill if logged in */}
            {userData && (
              <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="mt-6 inline-flex items-center gap-3 bg-white border border-emerald-200 shadow-sm px-5 py-2.5 rounded-2xl text-xs sm:text-sm"
              >
                <div className="flex items-center gap-1.5 text-slate-600 font-medium">
                  <BsCoin className="text-emerald-500" size={17} />
                  <span>Current Balance:</span>
                  <span className="font-bold text-slate-900">{userData.credits || 0} Credits</span>
                </div>
                <span className="text-slate-300">•</span>
                <span className="text-emerald-600 font-semibold">
                  ~{Math.floor((userData.credits || 0) / 50)} Interviews Left
                </span>
              </motion.div>
            )}
          </div>

          {/* =====================================================
              PRICING CARDS GRID
          ===================================================== */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 lg:gap-8 items-stretch mb-20">
            {plans.map((plan, index) => {
              const isPro = plan.popular;

              return (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 25 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  className={`relative rounded-3xl p-6 sm:p-8 flex flex-col justify-between transition-all duration-300 ${
                    isPro
                      ? "bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 text-white shadow-2xl border-2 border-emerald-400/80 scale-[1.02] lg:-translate-y-2"
                      : "bg-white text-slate-900 border border-slate-200 shadow-md hover:shadow-xl hover:border-emerald-200"
                  }`}
                >
                  {/* Popular / Best value badge */}
                  {plan.badge && (
                    <div
                      className={`absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-bold tracking-wide uppercase shadow-md ${
                        isPro
                          ? "bg-emerald-400 text-slate-950 font-extrabold"
                          : "bg-slate-900 text-white"
                      }`}
                    >
                      {plan.badge}
                    </div>
                  )}

                  <div>
                    {/* Header */}
                    <div className="flex items-center justify-between mb-4">
                      <div className="w-12 h-12 rounded-2xl flex items-center justify-center bg-emerald-500/10 border border-emerald-500/20">
                        {plan.icon}
                      </div>
                      <div
                        className={`text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full ${
                          isPro
                            ? "bg-emerald-400/10 text-emerald-400 border border-emerald-400/20"
                            : "bg-slate-100 text-slate-600"
                        }`}
                      >
                        {plan.credits} Credits
                      </div>
                    </div>

                    <h3
                      className={`text-2xl font-bold tracking-tight ${
                        isPro ? "text-white" : "text-slate-900"
                      }`}
                    >
                      {plan.name}
                    </h3>
                    <p
                      className={`text-xs mt-1.5 leading-relaxed min-h-[36px] ${
                        isPro ? "text-slate-400" : "text-slate-500"
                      }`}
                    >
                      {plan.tagline}
                    </p>

                    {/* Price */}
                    <div className="my-6 pb-6 border-b border-slate-100/10">
                      <div className="flex items-baseline gap-1.5">
                        <span className="text-4xl sm:text-5xl font-extrabold tracking-tight">
                          {plan.price}
                        </span>
                        <span
                          className={`text-xs ${
                            isPro ? "text-slate-400" : "text-slate-500"
                          }`}
                        >
                          / one-time
                        </span>
                      </div>
                      <p
                        className={`text-xs font-semibold mt-1 flex items-center gap-1 ${
                          isPro ? "text-emerald-400" : "text-emerald-600"
                        }`}
                      >
                        <BsCheckCircleFill size={11} /> {plan.interviewsCount} Full AI Mock Interviews (~50 credits/session)
                      </p>
                    </div>

                    {/* Feature List */}
                    <div className="space-y-3 mb-8">
                      <p
                        className={`text-xs font-bold uppercase tracking-wider ${
                          isPro ? "text-slate-400" : "text-slate-400"
                        }`}
                      >
                        Included Features:
                      </p>
                      {plan.features.map((feature, fIdx) => (
                        <div key={fIdx} className="flex items-start gap-2.5 text-xs sm:text-sm">
                          <span
                            className={`flex-shrink-0 mt-0.5 rounded-full p-0.5 ${
                              isPro
                                ? "bg-emerald-400 text-slate-950"
                                : "bg-emerald-100 text-emerald-700"
                            }`}
                          >
                            <FaCheck size={9} />
                          </span>
                          <span
                            className={`leading-relaxed ${
                              isPro ? "text-slate-200" : "text-slate-700"
                            }`}
                          >
                            {feature}
                          </span>
                        </div>
                      ))}

                      {/* Not included items */}
                      {plan.notIncluded.map((feature, fIdx) => (
                        <div
                          key={`not-${fIdx}`}
                          className="flex items-start gap-2.5 text-xs text-slate-400 opacity-60"
                        >
                          <span className="flex-shrink-0 mt-0.5 rounded-full p-0.5 bg-slate-200 text-slate-500">
                            <FaTimes size={9} />
                          </span>
                          <span className="line-through">{feature}</span>
                        </div>
                      ))}
                    </div>
                  </div>

                  {/* Action Button */}
                  <button
                    onClick={() => handleSelectPlan(plan)}
                    className={`w-full py-3.5 px-6 rounded-2xl font-bold text-sm transition-all shadow-md cursor-pointer flex items-center justify-center gap-2 ${
                      isPro
                        ? "bg-emerald-400 hover:bg-emerald-300 text-slate-950 hover:shadow-emerald-400/25 hover:shadow-lg"
                        : plan.buttonVariant === "dark"
                        ? "bg-slate-950 hover:bg-slate-800 text-white"
                        : "bg-slate-100 hover:bg-slate-200 text-slate-900 border border-slate-200"
                    }`}
                  >
                    <span>{plan.buttonText}</span>
                    <HiArrowRight size={15} />
                  </button>
                </motion.div>
              );
            })}
          </div>

          {/* =====================================================
              FEATURE MATRIX / COMPARISON
          ===================================================== */}
          <div className="bg-white rounded-3xl border border-slate-200 shadow-sm p-6 sm:p-10 mb-20 overflow-x-auto">
            <div className="text-center max-w-xl mx-auto mb-8">
              <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
                Plan Comparison
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Compare Plan Features
              </h2>
            </div>

            <table className="w-full text-left border-collapse min-w-[600px]">
              <thead>
                <tr className="border-b border-slate-200">
                  <th className="py-4 px-4 text-sm font-bold text-slate-900">Feature</th>
                  <th className="py-4 px-4 text-sm font-bold text-slate-700 text-center">Starter</th>
                  <th className="py-4 px-4 text-sm font-bold text-emerald-600 text-center">Pro Career</th>
                  <th className="py-4 px-4 text-sm font-bold text-slate-900 text-center">Ultimate</th>
                </tr>
              </thead>
              <tbody className="text-sm divide-y divide-slate-100">
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Credits Included</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">150</td>
                  <td className="py-3.5 px-4 text-center font-bold text-emerald-600">500</td>
                  <td className="py-3.5 px-4 text-center font-bold text-slate-900">1500</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Full AI Mock Interviews</td>
                  <td className="py-3.5 px-4 text-center">3 Sessions</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-emerald-600">10 Sessions</td>
                  <td className="py-3.5 px-4 text-center font-semibold text-slate-900">30 Sessions</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Resume Upload & Tailoring</td>
                  <td className="py-3.5 px-4 text-center text-slate-300">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓ (Unlimited)</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Technical & HR Modes</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Downloadable PDF Scorecard</td>
                  <td className="py-3.5 px-4 text-center text-slate-300">—</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Confidence & Clarity Detection</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                  <td className="py-3.5 px-4 text-center text-emerald-600 font-bold">✓</td>
                </tr>
                <tr>
                  <td className="py-3.5 px-4 text-slate-700 font-medium">Credit Expiration</td>
                  <td className="py-3.5 px-4 text-center text-slate-600">Never</td>
                  <td className="py-3.5 px-4 text-center text-slate-600">Never</td>
                  <td className="py-3.5 px-4 text-center text-slate-600">Never</td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* =====================================================
              FAQ ACCORDION
          ===================================================== */}
          <div className="max-w-3xl mx-auto mb-20">
            <div className="text-center mb-10">
              <span className="text-xs font-bold tracking-wider text-emerald-600 uppercase">
                Got Questions?
              </span>
              <h2 className="text-2xl sm:text-3xl font-bold text-slate-900 mt-2">
                Frequently Asked Questions
              </h2>
            </div>

            <div className="space-y-4">
              {faqs.map((faq, idx) => {
                const isOpen = openFaq === idx;

                return (
                  <div
                    key={idx}
                    className="bg-white rounded-2xl border border-slate-200 overflow-hidden shadow-sm transition"
                  >
                    <button
                      onClick={() => setOpenFaq(isOpen ? null : idx)}
                      className="w-full p-5 text-left flex items-center justify-between gap-4 font-semibold text-slate-900 hover:text-emerald-600 transition cursor-pointer text-sm sm:text-base"
                    >
                      <span className="flex items-center gap-2.5">
                        <FaQuestionCircle className="text-emerald-500 flex-shrink-0" />
                        {faq.q}
                      </span>
                      {isOpen ? (
                        <FaChevronUp className="text-slate-400 text-xs flex-shrink-0" />
                      ) : (
                        <FaChevronDown className="text-slate-400 text-xs flex-shrink-0" />
                      )}
                    </button>

                    {isOpen && (
                      <div className="px-5 pb-5 pt-1 text-sm text-slate-500 leading-relaxed border-t border-slate-50">
                        {faq.a}
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          {/* =====================================================
              BOTTOM CTA
          ===================================================== */}
          <div className="bg-slate-950 text-white rounded-3xl p-8 sm:p-12 text-center relative overflow-hidden shadow-xl">
            <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
            <h2 className="text-2xl sm:text-3xl font-bold">
              Ready to ace your upcoming interviews?
            </h2>
            <p className="text-slate-400 text-sm sm:text-base max-w-xl mx-auto mt-3">
              Join thousands of job seekers improving their communication, confidence, and technical depth with Interv.AI.
            </p>
            <div className="mt-8 flex flex-wrap justify-center gap-3">
              <button
                onClick={() => {
                  if (!userData) setShowAuthModal(true);
                  else navigate("/interview");
                }}
                className="bg-emerald-400 hover:bg-emerald-300 text-slate-950 font-bold px-7 py-3.5 rounded-xl text-sm transition shadow-lg cursor-pointer"
              >
                Start Practicing Now →
              </button>
            </div>
          </div>
        </main>
      </div>

      {/* =====================================================
          PURCHASE CONFIRMATION MODAL
      ===================================================== */}
      <AnimatePresence>
        {selectedPlan && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.95, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.95, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-6 sm:p-8 shadow-2xl border border-slate-200 relative"
            >
              <button
                onClick={() => setSelectedPlan(null)}
                className="absolute right-5 top-5 text-slate-400 hover:text-slate-600 cursor-pointer"
              >
                <FaTimes size={18} />
              </button>

              <div className="w-12 h-12 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mb-4">
                <BsCoin size={24} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Confirm Purchase
              </h3>
              <p className="text-slate-500 text-sm mt-1">
                You are purchasing the <span className="font-semibold text-slate-800">{selectedPlan.name}</span>.
              </p>

              <div className="bg-slate-50 rounded-2xl p-4 my-6 border border-slate-100 space-y-2.5">
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Plan:</span>
                  <span className="font-semibold text-slate-800">{selectedPlan.name}</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Credits to add:</span>
                  <span className="font-bold text-emerald-600">+{selectedPlan.credits} Credits</span>
                </div>
                <div className="flex justify-between text-sm">
                  <span className="text-slate-500">Total Interviews:</span>
                  <span className="font-semibold text-slate-800">{selectedPlan.interviewsCount} Sessions</span>
                </div>
                <div className="h-px bg-slate-200 my-2" />
                <div className="flex justify-between text-base font-bold">
                  <span className="text-slate-900">Total Amount:</span>
                  <span className="text-emerald-600">{selectedPlan.price}</span>
                </div>
              </div>

              <div className="flex gap-3">
                <button
                  onClick={() => setSelectedPlan(null)}
                  disabled={purchasing}
                  className="flex-1 py-3 rounded-xl border border-slate-200 font-semibold text-sm text-slate-600 hover:bg-slate-50 transition cursor-pointer"
                >
                  Cancel
                </button>

                <button
                  onClick={handleConfirmPurchase}
                  disabled={purchasing}
                  className="flex-1 py-3 rounded-xl bg-emerald-500 hover:bg-emerald-600 text-white font-bold text-sm transition shadow-md cursor-pointer disabled:opacity-50"
                >
                  {purchasing ? "Processing..." : "Pay & Unlock"}
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* =====================================================
          PURCHASE SUCCESS MODAL
      ===================================================== */}
      <AnimatePresence>
        {purchaseSuccess && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-50 bg-slate-950/70 backdrop-blur-sm flex items-center justify-center p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-3xl max-w-md w-full p-8 text-center shadow-2xl border border-slate-200"
            >
              <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto mb-5">
                <BsCheckCircleFill size={32} />
              </div>

              <h3 className="text-2xl font-bold text-slate-900">
                Credits Added!
              </h3>
              <p className="text-slate-500 text-sm mt-2 leading-relaxed">
                Successfully added <span className="font-bold text-emerald-600">+{purchaseSuccess.plan.credits} Credits</span> to your account.
              </p>

              <div className="bg-emerald-50 border border-emerald-200 rounded-2xl p-4 my-6">
                <span className="text-xs text-slate-500 uppercase font-semibold block">New Balance</span>
                <span className="text-3xl font-extrabold text-emerald-700">
                  {purchaseSuccess.newCredits} Credits
                </span>
              </div>

              <div className="flex flex-col gap-2.5">
                <button
                  onClick={() => {
                    setPurchaseSuccess(null);
                    navigate("/interview");
                  }}
                  className="w-full py-3.5 rounded-xl bg-slate-950 hover:bg-slate-800 text-white font-bold text-sm transition shadow-lg cursor-pointer"
                >
                  Start an Interview Now →
                </button>
                <button
                  onClick={() => setPurchaseSuccess(null)}
                  className="w-full py-2.5 rounded-xl text-slate-500 hover:text-slate-800 font-semibold text-xs transition cursor-pointer"
                >
                  Close & View Pricing
                </button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Auth Modal */}
      {showAuthModal && (
        <Auth isModel={true} onClose={() => setShowAuthModal(false)} />
      )}

      <Footer />
    </div>
  );
}

export default Pricing;
