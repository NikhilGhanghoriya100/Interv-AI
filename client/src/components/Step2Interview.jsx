import React from 'react'
import maleVideo from "../assets/videos/male-ai.mp4"
import femaleVideo from "../assets/videos/female-ai.mp4"
import Timer from './Timer'
import { motion } from "motion/react"
import { FaMicrophone, FaMicrophoneSlash, FaVideo, FaVideoSlash, FaUser } from 'react-icons/fa'
import { useState, useRef, useEffect } from 'react'
import axios from 'axios'
import { ServerUrl } from '../App'
import { BsArrowRight } from 'react-icons/bs'

function Step2Interview({ interviewData, onFinish }) {
  const interviewId = interviewData?.interviewId || interviewData?.interview || interviewData?._id;
  const questions = interviewData?.questions || [];
  const userName = interviewData?.userName || "Candidate";

  const [isIntroPhase, setIsIntroPhase] = useState(true); 
  const [isMicOn, setIsMicOn] = useState(true); 
  const [isCameraOn, setIsCameraOn] = useState(true);
  const [cameraError, setCameraError] = useState("");
  const recognitionRef = useRef(null); 
  const [isAIPlaying, setIsAIPlaying] = useState(false); 

  const [currentIndex, setCurrentIndex] = useState(0); 
  const [answer, setAnswer] = useState(""); 
  const [feedback, setFeedback] = useState("");  
  const [timeLeft, setTimeLeft] = useState(questions[0]?.timeLimit || 60);

  const [selectedVoice, setSelectedVoice] = useState(null); 
  const [isSubmitting, setIsSubmitting] = useState(false); 
  const [voiceGender, setVoiceGender] = useState("female"); 
  const [subtitle, setSubtitle] = useState("");  
  const videoRef = useRef(null); 
  const userVideoRef = useRef(null);
  const streamRef = useRef(null);
  const currentQuestion = questions[currentIndex];

  // Start Camera
  const startCamera = async () => {
    try {
      if (navigator.mediaDevices && navigator.mediaDevices.getUserMedia) {
        const stream = await navigator.mediaDevices.getUserMedia({
          video: { width: { ideal: 640 }, height: { ideal: 480 }, facingMode: "user" },
          audio: false,
        });
        streamRef.current = stream;
        if (userVideoRef.current) {
          userVideoRef.current.srcObject = stream;
          userVideoRef.current.play().catch(() => {});
        }
        setIsCameraOn(true);
        setCameraError("");
      }
    } catch (err) {
      console.warn("Camera access denied or unavailable:", err);
      setCameraError("Camera unavailable or permission denied");
      setIsCameraOn(false);
    }
  };

  // Stop Camera
  const stopCamera = () => {
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((track) => track.stop());
      streamRef.current = null;
    }
    if (userVideoRef.current) {
      userVideoRef.current.srcObject = null;
    }
    setIsCameraOn(false);
  };

  // Toggle Camera
  const toggleCamera = () => {
    if (isCameraOn) {
      stopCamera();
    } else {
      startCamera();
    }
  };

  useEffect(() => {
    startCamera();

    return () => {
      stopCamera();
    };
  }, []);

  useEffect(() => {
    if (isCameraOn && userVideoRef.current && streamRef.current) {
      userVideoRef.current.srcObject = streamRef.current;
      userVideoRef.current.play().catch(() => {});
    }
  }, [isCameraOn]);

  useEffect(() => {
    const loadVoices = () => {
      const voices = window.speechSynthesis.getVoices();

      if (!voices.length) return;

      const femaleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("zira") ||
          v.name.toLowerCase().includes("samantha") ||
          v.name.toLowerCase().includes("female")
      );

      if (femaleVoice) {
        setSelectedVoice(femaleVoice);
        setVoiceGender("female");
        return;
      }

      const maleVoice = voices.find(
        (v) =>
          v.name.toLowerCase().includes("david") ||
          v.name.toLowerCase().includes("mark") ||
          v.name.toLowerCase().includes("male")
      );

      if (maleVoice) {
        setSelectedVoice(maleVoice);
        setVoiceGender("male");
      }
    };

    loadVoices();
    window.speechSynthesis.onvoiceschanged = loadVoices;

    return () => {
      window.speechSynthesis.onvoiceschanged = null;
    };
  }, []);

  const videoSource = voiceGender === "male" ? maleVideo : femaleVideo;

  // speak function
  const speakText = (text) => {
    return new Promise((resolve) => {
      if (!text || !window.speechSynthesis || !selectedVoice) {
        resolve();
        return;
      }

      window.speechSynthesis.cancel(); // stop any ongoing speech

      const humanText = String(text)
        .replace(/,/g, ", ...")
        .replace(/\,/g, ", ...");

      const utterance = new SpeechSynthesisUtterance(humanText);

      utterance.voice = selectedVoice;
      utterance.rate = 0.92; 
      utterance.pitch = 1.05;
      utterance.volume = 1;

      utterance.onstart = () => {
        setIsAIPlaying(true);
        stopMic(); // Stop the microphone when AI starts speaking
        videoRef.current?.play();
      };

      utterance.onend = () => {
        videoRef.current?.pause();
        if (videoRef.current) videoRef.current.currentTime = 0;
        setIsAIPlaying(false);

        if(isMicOn){
          startMic(); // Restart the microphone when AI finishes speaking
        }

        setTimeout(() => {
          setSubtitle("");
          resolve();
        }, 300);
      };

      utterance.onerror = () => {
        setIsAIPlaying(false);
        setSubtitle("");
        resolve();
      };

      setSubtitle(text);
      window.speechSynthesis.speak(utterance);
    });
  };

  useEffect(() => {
    if (!selectedVoice) {
      return;
    } 
    const runIntro = async () => {
      if (isIntroPhase) {
        await speakText(
          `Hi ${userName}, it's great to have you here for the interview. Let's get started with the first question.`
        );

        await speakText(
          "I'll ask you a few questions, Just answer naturally, and take your time. let's begin."
        );

        setIsIntroPhase(false);
      } else if (currentQuestion) {
        await new Promise(r => setTimeout(r, 800));

        // if last question (hard level)
        if (currentIndex === questions.length - 1) {
          await speakText("Alright, this one might be a bit more challenging");
        }
        await speakText(currentQuestion.question);

        if(isMicOn){
          startMic();
        }
      }
    }

    runIntro();

  }, [selectedVoice, isIntroPhase, currentIndex]);


  useEffect(()=>{
    if(isIntroPhase)return;
    if(!currentQuestion)return;
    const timer = setInterval(() => {
      setTimeLeft((prev) => {
        if(prev <= 1){
          clearInterval(timer);
          return 0;
        }
        return prev - 1;
        });
    },1000);

    return () => clearInterval(timer);

  }, [isIntroPhase,currentIndex]);

  useEffect(() =>{
    if (!isIntroPhase && currentQuestion) {
      setTimeLeft(currentQuestion.timeLimit || 60);
    }
  }, [currentIndex]);


  useEffect(() => {
    if(!("webkitSpeechRecognition" in window) && !("SpeechRecognition" in window)) return;

    const SpeechRecognition = window.SpeechRecognition || window.webkitSpeechRecognition;
    const recognition = new SpeechRecognition();
    recognition.lang = "en-US";
    recognition.continuous = true;
    recognition.interimResults = true;

    recognition.onresult = (event) => {
      const transcript = event.results[event.results.length - 1][0].transcript;
      setAnswer((prev) => prev ? prev + " " + transcript : transcript);
    };

    recognitionRef.current = recognition;
  },[]);

  const startMic = () => {
    if(recognitionRef.current && !isAIPlaying){
      try{
        recognitionRef.current.start();
      } catch(error){

      }
    }
  };


  const stopMic = () => {
    if(recognitionRef.current){
      try{
        recognitionRef.current.stop();
      } catch(error){

      }
    }
  };


  const toggleMic = () => {
    if (isMicOn) {
      stopMic();
      setIsMicOn(false);
    } else {
      startMic();
      setIsMicOn(true);
    }
  };


  const submitAnswer = async () => {
    if(isSubmitting) return;
    stopMic();
    setIsSubmitting(true);

    try{
      const result = await axios.post(ServerUrl + "/api/interview/submit-answer", {
        interviewId,
        questionIndex: currentIndex,
        answer,
        timeTaken: currentQuestion ? (currentQuestion.timeLimit - timeLeft) : 0,
      }, {withCredentials:true});

      setFeedback(result.data.feedback);
      speakText(result.data.feedback);
      setIsSubmitting(false);
    } catch(error){
      console.error("Error submitting answer:", error);
      setIsSubmitting(false);
    }
  }

  const handleNext = async ()=>{
    setAnswer("");
    setFeedback("");

    if (currentIndex + 1 >= questions.length){
      await finishInterview();
      return;
    }

    await speakText("Alright, let's move to the next question.");

    setCurrentIndex(currentIndex + 1);
    setTimeout(() => {
      if (isMicOn) startMic();
    }, 500);

  }

  const finishInterview = async () => {
    stopMic();
    stopCamera();
    setIsMicOn(false);
    try {
      const result = await axios.post(ServerUrl + "/api/interview/finish", {interviewId} , {withCredentials:true})

      console.log("Interview finish response:", result.data);
      if (onFinish) {
        onFinish(result.data);
      }
      
    } catch (error) {
      console.error("Error finishing interview:", error);
    }
  }

  useEffect(() =>{
    if(isIntroPhase) return;
    if(!currentQuestion) return;

    if(timeLeft === 0 && !isSubmitting && !feedback){
      submitAnswer();
    } 
  },[timeLeft]);

  useEffect(()=>{
    return()=>{
      stopCamera();
      if(recognitionRef.current){
        recognitionRef.current.stop();
        recognitionRef.current.abort();
      }

      window.speechSynthesis.cancel();
    };
  }, []);



  return (
    <div className='min-h-screen bg-gradient-to-br from-emerald-50 via-white to-teal-100 flex items-center justify-center p-3 sm:p-6'>
      <div className='w-full max-w-6xl min-h-[85vh] bg-white rounded-3xl shadow-2xl border border-gray-200 flex flex-col lg:flex-row overflow-hidden'>

        {/* Video & Controls Section (Left side) */}
        <div className='w-full lg:w-[38%] bg-slate-50 flex flex-col items-center p-5 sm:p-6 space-y-5 border-r border-gray-200'>
          
          {/* Dual Feed / PiP Video Box */}
          <div className='w-full max-w-md relative rounded-2xl overflow-hidden shadow-xl bg-slate-950 border border-slate-800 aspect-[4/3] flex items-center justify-center'>
            
            {/* Main Video: AI Interviewer */}
            <video 
              src={videoSource}
              key={videoSource}
              ref={videoRef}
              muted
              playsInline
              preload='auto'
              className='w-full h-full object-cover'
            />

            {/* Top Badge: AI Status */}
            <div className='absolute top-3 left-3 flex items-center gap-1.5 bg-slate-950/70 backdrop-blur-md px-2.5 py-1 rounded-lg text-white text-xs font-semibold border border-white/10'>
              <span className={`w-2 h-2 rounded-full ${isAIPlaying ? 'bg-emerald-400 animate-pulse' : 'bg-slate-400'}`} />
              <span>{isAIPlaying ? 'AI Speaking' : 'AI Interviewer'}</span>
            </div>

            {/* Picture-in-Picture: Candidate Live Webcam Stream */}
            <div className='absolute bottom-3 right-3 w-28 sm:w-36 aspect-[4/3] rounded-xl overflow-hidden border-2 border-white/80 shadow-2xl bg-slate-900 z-10'>
              {isCameraOn ? (
                <video
                  ref={userVideoRef}
                  autoPlay
                  playsInline
                  muted
                  style={{ transform: 'scaleX(-1)' }}
                  className='w-full h-full object-cover'
                />
              ) : (
                <div className='w-full h-full flex flex-col items-center justify-center bg-slate-800 text-slate-400 p-2 text-center'>
                  <FaUser size={20} className='mb-1 text-slate-500' />
                  <span className='text-[10px] font-medium'>Camera Off</span>
                </div>
              )}

              {/* You Badge */}
              <div className='absolute bottom-1 left-1 bg-black/70 px-1.5 py-0.5 rounded text-[9px] font-bold text-white uppercase tracking-wider'>
                You
              </div>
            </div>
          </div>

          {/* Quick Hardware Controls (Mic & Camera Toggles) */}
          <div className='w-full max-w-md flex items-center justify-center gap-3 bg-white p-2.5 rounded-2xl border border-gray-200 shadow-sm'>
            <button
              onClick={toggleMic}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isMicOn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {isMicOn ? <FaMicrophone size={13} /> : <FaMicrophoneSlash size={13} />}
              <span>{isMicOn ? 'Mic On' : 'Mic Muted'}</span>
            </button>

            <button
              onClick={toggleCamera}
              className={`flex items-center gap-1.5 px-4 py-2 rounded-xl text-xs font-bold transition cursor-pointer ${
                isCameraOn ? 'bg-emerald-50 text-emerald-700 border border-emerald-200' : 'bg-rose-50 text-rose-700 border border-rose-200'
              }`}
            >
              {isCameraOn ? <FaVideo size={13} /> : <FaVideoSlash size={13} />}
              <span>{isCameraOn ? 'Camera On' : 'Camera Off'}</span>
            </button>
          </div>

          {/* Subtitle */}
          {subtitle && (
            <div className='w-full max-w-md bg-white border border-gray-200 rounded-xl p-3.5 shadow-sm'>
              <p className='text-gray-700 text-xs sm:text-sm font-medium text-center leading-relaxed'>{subtitle}</p>
            </div>
          )}

          {/* Timer Area */}
          <div className='w-full max-w-md bg-white border border-gray-200 rounded-2xl shadow-sm p-5 space-y-4'>
            <div className='flex justify-between items-center text-xs'>
              <span className='text-gray-500 font-medium'>Interview Progress</span>
              <span className='font-bold text-emerald-600'>Question {currentIndex + 1} of {questions.length}</span>
            </div>

            <div className='h-px bg-gray-100'></div>

            <div className='flex justify-center py-1'>
              <Timer timeLeft={timeLeft} totalTime={currentQuestion?.timeLimit}/>
            </div>

            <div className='h-px bg-gray-100'></div>

            <div className='grid grid-cols-2 gap-4 text-center'>
              <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-100'>
                <span className='text-xl font-bold text-emerald-600 block'>
                  {currentIndex + 1} 
                </span>
                <span className='text-[11px] text-gray-400 font-medium'>Current</span>
              </div>

              <div className='bg-slate-50 p-2.5 rounded-xl border border-slate-100'>
                <span className='text-xl font-bold text-emerald-600 block'>{questions.length}</span>
                <span className='text-[11px] text-gray-400 font-medium'>Total</span>
              </div>
            </div>
          </div>
        </div>

        {/* Question & Answer Input Section (Right side) */}
        <div className='flex-1 flex flex-col p-4 sm:p-6 md:p-8 relative justify-between'>
          <div>
            <div className='flex items-center justify-between mb-4'>
              <h2 className='text-xl sm:text-2xl font-bold text-slate-900'>
                AI Mock Interview
              </h2>
              <span className='px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 text-xs font-bold'>
                {currentQuestion?.difficulty || 'Standard'} Mode
              </span>
            </div>

            {!isIntroPhase && (
              <div className='relative mb-5 bg-slate-50 p-4 sm:p-6 rounded-2xl border border-gray-200 shadow-sm'>
                <p className='text-xs sm:text-sm text-emerald-600 font-bold mb-1'>
                  Question {currentIndex + 1} of {questions.length}
                </p>
                <div className='text-base sm:text-lg font-semibold text-gray-900 leading-relaxed'>
                  {currentQuestion?.question}
                </div>
              </div>
            )}

            <label className='block text-xs font-semibold text-slate-500 uppercase tracking-wider mb-2'>
              Candidate Answer (Speak via Mic or Type)
            </label>
            <textarea
              placeholder='Type your answer here or speak using your microphone...'
              onChange={(e) => setAnswer(e.target.value)}
              value={answer}
              rows={7}
              className='w-full bg-slate-50 p-4 sm:p-5 rounded-2xl resize-none outline-none border border-gray-200 focus:bg-white focus:ring-2 focus:ring-emerald-500 transition text-gray-800 text-sm sm:text-base leading-relaxed'
            />
          </div>

          {!feedback ? (
            <div className='flex items-center gap-3 mt-6 pt-4 border-t border-gray-100'>
              <motion.button 
                onClick={toggleMic}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl ${isMicOn ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'} text-white shadow-md transition cursor-pointer flex-shrink-0`}
                title={isMicOn ? "Mute Microphone" : "Unmute Microphone"}
              >
                {isMicOn ? <FaMicrophone size={18}/> : <FaMicrophoneSlash size={18}/>}
              </motion.button>

              <motion.button 
                onClick={toggleCamera}
                whileTap={{ scale: 0.9 }}
                className={`w-12 h-12 sm:w-14 sm:h-14 flex items-center justify-center rounded-2xl ${isCameraOn ? 'bg-emerald-600 hover:bg-emerald-700' : 'bg-rose-600 hover:bg-rose-700'} text-white shadow-md transition cursor-pointer flex-shrink-0`}
                title={isCameraOn ? "Turn Camera Off" : "Turn Camera On"}
              >
                {isCameraOn ? <FaVideo size={18}/> : <FaVideoSlash size={18}/>}
              </motion.button>

              <motion.button 
                onClick={submitAnswer}
                disabled={isSubmitting || isAIPlaying}
                whileTap={{ scale: 0.97 }}
                className='flex-1 bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white py-3.5 sm:py-4 rounded-2xl shadow-lg transition font-bold text-sm sm:text-base disabled:opacity-50 cursor-pointer disabled:cursor-not-allowed text-center'
              >
                {isSubmitting ? "Evaluating Answer..." : "Submit Answer"}
              </motion.button>
            </div>
          ) : (
            <motion.div 
              initial={{opacity:0, y: 10}}
              animate={{opacity:1, y: 0}}
              className='mt-6 bg-emerald-50 border border-emerald-200 p-5 rounded-2xl shadow-sm'
            >
              <div className='flex items-center gap-2 mb-2'>
                <span className='text-xs font-bold uppercase tracking-wider text-emerald-800'>AI Evaluator Feedback</span>
              </div>
              <p className='text-emerald-950 font-medium text-sm sm:text-base mb-4 leading-relaxed'>{feedback}</p>

              <button 
                onClick={handleNext}
                className='w-full bg-gradient-to-r from-emerald-600 to-teal-500 hover:from-emerald-500 hover:to-teal-400 text-white py-3.5 rounded-xl shadow-md transition flex items-center justify-center gap-1.5 cursor-pointer font-bold text-sm sm:text-base'
              >
                <span>{currentIndex + 1 >= questions.length ? "Finish Interview" : "Next Question"}</span>
                <BsArrowRight size={18}/>
              </button>
            </motion.div>
          )}
        </div>

      </div>
    </div>
  )
}

export default Step2Interview ;


