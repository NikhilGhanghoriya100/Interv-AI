import React from "react";
import {
  RiRobot2Fill,
  RiGithubFill,
  RiLinkedinFill,
  RiTwitterXFill,
} from "react-icons/ri";

function Footer() {
  return (
    <footer className="bg-[#f3f3f3] px-4 py-8">
      <div className="max-w-6xl mx-auto">
        <div className="relative overflow-hidden bg-slate-950 rounded-[26px] px-6 py-7 md:px-9">

          {/* Glow */}
          <div className="absolute -top-20 -right-20 w-56 h-56 bg-emerald-400/10 rounded-full blur-3xl" />

          <div className="relative">

            {/* Top */}
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-7">

              {/* Brand */}
              <div className="max-w-md">

                <div className="flex items-center gap-2.5 mb-3">
                  <div className="bg-emerald-400 text-slate-950 p-2 rounded-xl">
                    <RiRobot2Fill size={20} />
                  </div>

                  <span className="font-bold text-xl text-white">
                    Interv.
                    <span className="text-emerald-400">AI</span>
                  </span>
                </div>

                <p className="text-slate-400 text-sm leading-relaxed max-w-sm">
                  Your personal AI interviewer to practice, improve, and
                  build interview confidence.
                </p>

              </div>

              {/* Links */}
              <div className="flex gap-10 text-sm">

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Product
                  </h3>

                  <div className="flex flex-col gap-2 text-slate-400">
                    <a href="interview" className="hover:text-emerald-400 transition">
                      AI Interview
                    </a>

                    <a href="history" className="hover:text-emerald-400 transition">
                      Dashboard
                    </a>

                    
                  </div>
                </div>

                <div>
                  <h3 className="text-white font-medium mb-3">
                    Company
                  </h3>

                  <div className="flex flex-col gap-2 text-slate-400">
                    <a href="#" className="hover:text-emerald-400 transition">
                      About
                    </a>

                    <a href="#" className="hover:text-emerald-400 transition">
                      Contact
                    </a>

                    <a href="#" className="hover:text-emerald-400 transition">
                      Privacy
                    </a>
                  </div>
                </div>

              </div>
            </div>

            {/* Bottom */}
            <div className="border-t border-slate-800 mt-7 pt-5 flex flex-col sm:flex-row items-center justify-between gap-4">

              <p className="text-xs text-slate-500">
                © 2026 Interv.AI. All rights reserved.
              </p>

              <div className="flex gap-2">

                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition"
                >
                  <RiGithubFill size={16} />
                </a>

                <a
                  href="https://www.linkedin.com/in/nikhil-ghanghoriya2"
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition"
                >
                  <RiLinkedinFill size={16} />
                </a>

                <a
                  href="#"
                  className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center text-slate-400 hover:text-emerald-400 hover:bg-emerald-400/10 transition"
                >
                  <RiTwitterXFill size={15} />
                </a>

              </div>

            </div>

          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;
