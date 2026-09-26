"use client";
import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";

export default function Login() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    // Simulate auth for prototype
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

          {/* Greeting */}
          <div className="mb-8">
            <h1 className="text-3xl font-extrabold text-white tracking-tight mb-2">Welcome back</h1>
            <p className="text-slate-500 text-base">Sign in to your recycler dashboard</p>
          </div>

          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label className="block text-sm font-semibold text-slate-300 mb-2" htmlFor="email">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full"
                placeholder="admin@recycler.com"
              />
            </div>

            <div>
              <div className="flex justify-between items-center mb-2">
                <label className="block text-sm font-semibold text-slate-300" htmlFor="password">
                  Password
                </label>
                <a href="#" className="text-xs text-emerald-400 hover:text-emerald-300 font-medium transition">Forgot?</a>
              </div>
              <input
                id="password"
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full"
                placeholder="••••••••"
              />
            </div>

            {/* Remember me */}
            <div className="flex items-center gap-3">
              <input type="checkbox" id="remember" className="w-4 h-4 rounded border-white/10 bg-transparent accent-emerald-500" />
              <label htmlFor="remember" className="text-sm text-slate-400">Keep me signed in</label>
            </div>

            <button 
              type="submit" 
              disabled={loading}
              className="w-full glass-button text-white font-bold py-3.5 rounded-xl flex justify-center items-center gap-2 disabled:opacity-60 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin"></div>
              ) : (
                <>
                  Sign In
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                </>
              )}
            </button>
          </form>

          <div className="mt-8 text-center">
            <p className="text-sm text-slate-500">
              Don&apos;t have an account?{' '}
              <Link href="#" className="text-emerald-400 hover:text-emerald-300 font-semibold transition">
                Create one
              </Link>
            </p>
          </div>

          {/* Divider + demo hint */}
          <div className="mt-8 pt-6 border-t border-white/5 text-center">
            <p className="text-xs text-slate-600">
              SIH 2024 Prototype — Use any email/password to sign in
            </p>
          </div>
        </div>
      </div>
    </main>
  );
}
