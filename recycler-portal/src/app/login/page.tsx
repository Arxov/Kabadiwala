"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [step, setStep] = useState<1 | 2>(1);
  const [mobile, setMobile] = useState("");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [loading, setLoading] = useState(false);

  const handleSendOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setStep(2);
    }, 800);
  };

  const handleAutofill = () => {
    setOtp(["1", "2", "3", "4", "5", "6"]);
  };

  const handleOtpChange = (index: number, value: string) => {
    if (!/^\d*$/.test(value)) return;
    const newOtp = [...otp];
    newOtp[index] = value;
    setOtp(newOtp);

    // Auto-focus next input
    if (value && index < 5) {
      const nextInput = document.getElementById(`otp-${index + 1}`);
      nextInput?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Backspace" && !otp[index] && index > 0) {
      const prevInput = document.getElementById(`otp-${index - 1}`);
      prevInput?.focus();
    }
  };

  const handleVerifyOtp = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      router.push("/");
    }, 1200);
  };

  return (
    <main className="min-h-screen flex relative overflow-hidden">

      {/* ─── LEFT: BRANDED ART PANEL ─── */}
      <div className="hidden lg:flex lg:w-[45%] xl:w-[50%] relative items-center justify-center p-16 overflow-hidden">
        {/* Gradient background */}
        <div className="absolute inset-0 bg-gradient-to-br from-emerald-900/40 via-cyan-900/30 to-blue-900/40"></div>
        
        {/* Animated orbital rings */}
        <div className="relative z-10 flex flex-col items-center">
          {/* Central logo mark */}
          <div className="relative w-48 h-48 mb-12">
            {/* Outer orbit */}
            <div className="absolute inset-0 rounded-full border border-emerald-500/20" style={{ animation: 'spin-slow 20s linear infinite' }}>
              <div className="absolute top-0 left-1/2 w-3 h-3 -mt-1.5 -ml-1.5 rounded-full bg-emerald-400 shadow-lg shadow-emerald-500/50"></div>
            </div>
            {/* Middle orbit */}
            <div className="absolute inset-6 rounded-full border border-blue-500/15" style={{ animation: 'spin-slow 15s linear infinite reverse' }}>
              <div className="absolute bottom-0 right-0 w-2 h-2 rounded-full bg-blue-400 shadow-lg shadow-blue-500/50"></div>
            </div>
            {/* Inner ring */}
            <div className="absolute inset-12 rounded-full border border-amber-500/10" style={{ animation: 'spin-slow 10s linear infinite' }}>
              <div className="absolute top-1/2 left-0 w-1.5 h-1.5 -mt-0.5 rounded-full bg-amber-400"></div>
            </div>
            {/* Central icon */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-2xl shadow-emerald-500/30 animate-float">
                <svg className="w-10 h-10 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
              </div>
            </div>
          </div>

          {/* Brand text */}
          <h2 className="text-4xl font-extrabold text-gradient mb-3 text-center">Kabadiwala</h2>
          <p className="text-slate-400 text-center max-w-sm text-lg leading-relaxed">
            India&apos;s smartest platform for e-waste recycling. Track, quote, and manage your entire pipeline.
          </p>
          
          {/* Feature pills */}
          <div className="flex flex-wrap gap-3 mt-10 justify-center">
            {['Offline-First', 'Live Sync', 'Smart Pricing', 'GPS Tracking'].map((feat) => (
              <span key={feat} className="px-4 py-2 rounded-full text-xs font-semibold bg-white/5 text-slate-400 border border-white/5">
                {feat}
              </span>
            ))}
          </div>
        </div>
      </div>

      {/* ─── RIGHT: LOGIN FORM ─── */}
      <div className="flex-1 flex items-center justify-center p-6 lg:p-16">
        <div className="w-full max-w-md animate-slide-up">
          {/* Mobile brand (shown only on small screens) */}
          <div className="lg:hidden text-center mb-10">
            <div className="w-14 h-14 rounded-2xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center mx-auto mb-4 shadow-xl shadow-emerald-500/20">
              <svg className="w-7 h-7 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <h1 className="text-3xl font-extrabold text-gradient">Kabadiwala</h1>
          </div>

          {/* Right Side Logic */}
          {step === 1 ? (
            <>
              {/* Greeting */}
              <div className="mb-8 text-center lg:text-left">
                <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Welcome back</h1>
                <p className="text-slate-500 text-base">Sign in to your recycler dashboard</p>
              </div>

              <form onSubmit={handleSendOtp} className="space-y-5">
                <div>
                  <div className="flex justify-between text-sm mb-2">
                    <span className="text-slate-400 font-medium">Mobile or Aadhaar Number</span>
                    <span className="text-slate-500">10-Digit Mobile</span>
                  </div>
                  <div className="relative flex items-center bg-white rounded-2xl p-1 shadow-inner h-14">
                    <div className="flex items-center px-4 font-bold text-slate-800 border-r border-slate-200 h-8">
                      +91
                    </div>
                    <input
                      type="tel"
                      maxLength={10}
                      required
                      value={mobile}
                      onChange={(e) => setMobile(e.target.value.replace(/\D/g, ""))}
                      className="flex-1 bg-transparent border-none text-slate-900 font-bold text-lg px-4 focus:ring-0 outline-none w-full !bg-transparent"
                      placeholder="9822100011"
                    />
                    {mobile && (
                      <button 
                        type="button" 
                        onClick={() => setMobile("")} 
                        className="absolute right-3 w-7 h-7 rounded-full bg-slate-200 flex items-center justify-center text-slate-600 hover:bg-slate-300 transition-colors"
                      >
                        <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" /></svg>
                      </button>
                    )}
                  </div>
                  <div className="flex justify-between text-xs mt-3 font-medium px-1">
                    <span className="text-slate-500">Format: 98221 00011</span>
                    {mobile.length === 10 && <span className="text-emerald-400">✓ Verified Mobile</span>}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || mobile.length !== 10}
                  className="w-full bg-[#115e3b] hover:bg-[#0d4d31] text-white font-bold py-4 rounded-2xl flex justify-center items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed mt-4 shadow-lg shadow-emerald-900/20"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Get Verification OTP 
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </button>

                <p className="text-center text-slate-500 text-sm mt-4">
                  A 6-digit secure OTP will be sent to your registered number
                </p>
              </form>
            </>
          ) : (
            <>
              {/* Step 2 Header */}
              <div className="flex justify-between items-center mb-6">
                <span className="px-3 py-1.5 bg-emerald-100 text-[#0d4d31] text-xs font-bold rounded-lg tracking-wider">
                  STEP 2 OF 2 • VERIFICATION
                </span>
                <button onClick={() => setStep(1)} className="text-emerald-500 text-sm font-semibold hover:text-emerald-400 flex items-center gap-1 transition-colors">
                  ← Change Number
                </button>
              </div>

              <h2 className="text-2xl font-bold text-blue-900 dark:text-blue-500 mb-1">Enter Verification Code</h2>
              <p className="text-slate-400 text-sm mb-8">OTP sent to +91 {mobile}</p>

              {/* Demo Autofill Banner */}
              <div className="bg-[#fcf5d3] rounded-2xl p-4 flex justify-between items-center mb-8 shadow-sm">
                <div className="flex items-center gap-3">
                  <span className="text-[#8c5a15] font-semibold text-sm">Demo OTP:</span>
                  <span className="bg-[#fce588] text-[#8c5a15] font-mono font-bold px-3 py-1 rounded-md text-sm border border-[#e6c755]">123456</span>
                </div>
                <button 
                  onClick={handleAutofill} 
                  type="button"
                  className="bg-[#fce588] hover:bg-[#f6d764] text-[#8c5a15] text-sm font-bold py-2 px-4 rounded-xl flex items-center gap-1.5 transition-colors border border-[#e6c755]"
                >
                  <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 20 20"><path fillRule="evenodd" d="M11.3 1.046A1 1 0 0112 2v5h4a1 1 0 01.82 1.573l-7 10A1 1 0 018 18v-5H4a1 1 0 01-.82-1.573l7-10a1 1 0 011.12-.38z" clipRule="evenodd" /></svg>
                  Autofill OTP
                </button>
              </div>

              <form onSubmit={handleVerifyOtp} className="space-y-8">
                <div>
                  <label className="block text-sm font-semibold text-slate-400 mb-4">
                    6-Digit OTP Code
                  </label>
                  <div className="flex justify-between gap-2">
                    {otp.map((digit, idx) => (
                      <input
                        key={idx}
                        id={`otp-${idx}`}
                        type="text"
                        inputMode="numeric"
                        autoComplete="one-time-code"
                        maxLength={1}
                        value={digit}
                        onChange={(e) => handleOtpChange(idx, e.target.value)}
                        onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                        className={`w-12 h-14 md:w-14 md:h-16 text-center text-2xl font-bold rounded-2xl border-none outline-none focus:ring-2 focus:ring-emerald-500 transition-all ${
                          digit ? "bg-white text-slate-900 border-2 border-emerald-500" : "bg-white/10 dark:bg-white/20 text-white"
                        }`}
                        placeholder="•"
                      />
                    ))}
                  </div>
                </div>

                <button 
                  type="submit" 
                  disabled={loading || otp.join("").length !== 6}
                  className="w-full bg-[#115e3b] hover:bg-[#0d4d31] text-white font-bold py-4 rounded-2xl flex justify-center items-center gap-2 transition-all disabled:opacity-60 disabled:cursor-not-allowed shadow-lg shadow-emerald-900/20"
                >
                  {loading ? (
                    <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
                  ) : (
                    <>
                      Verify & Enter Mandi 
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                    </>
                  )}
                </button>
              </form>

              {/* Secure Footer */}
              <div className="mt-8 pt-6 border-t border-white/10 flex flex-wrap justify-center items-center gap-4 text-xs font-medium text-slate-500">
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clipRule="evenodd" /></svg>
                  256-Bit Encrypted Data (AES)
                </div>
                <div className="h-4 w-px bg-white/20 hidden md:block"></div>
                <div className="flex items-center gap-1.5">
                  <svg className="w-3.5 h-3.5 text-emerald-500" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M6.267 3.455a3.066 3.066 0 001.745-.723 3.066 3.066 0 013.976 0 3.066 3.066 0 001.745.723 3.066 3.066 0 012.812 2.812c.051.643.304 1.254.723 1.745a3.066 3.066 0 010 3.976 3.066 3.066 0 00-.723 1.745 3.066 3.066 0 01-2.812 2.812 3.066 3.066 0 00-1.745.723 3.066 3.066 0 01-3.976 0 3.066 3.066 0 00-1.745-.723 3.066 3.066 0 01-2.812-2.812 3.066 3.066 0 00-.723-1.745 3.066 3.066 0 010-3.976 3.066 3.066 0 00.723-1.745 3.066 3.066 0 012.812-2.812zm7.44 5.252a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clipRule="evenodd" /></svg>
                  UIDAI e-KYC Secured
                </div>
              </div>
            </>
          )}
        </div>
      </div>
    </main>
  );
}
