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
    <main className="min-h-screen flex flex-col items-center justify-center p-6 bg-[#0a0a0a] font-sans">
      <div className="w-full max-w-[360px] animate-fade-in">
        <div className="flex justify-center mb-8">
          <div className="w-12 h-12 bg-[#ededed] rounded flex items-center justify-center shadow-sm">
            <span className="text-[#0a0a0a] font-bold text-xl tracking-tight">K</span>
          </div>
        </div>
        
        <div className="text-center mb-8">
          <h1 className="text-2xl font-semibold tracking-tight text-[#ededed] mb-1.5">Welcome back</h1>
          <p className="text-[#a3a3a3] text-sm">Sign in to the Kabadiwala Portal</p>
        </div>

        <form onSubmit={handleLogin} className="space-y-4">
          <div>
            <label className="block text-xs font-medium text-[#a3a3a3] mb-1.5 uppercase tracking-wide" htmlFor="email">
              Email Address
            </label>
            <input
              id="email"
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-3 py-2 text-sm text-[#ededed] placeholder-[#737373] focus:outline-none focus:border-[#525252] transition-colors"
              placeholder="admin@recycler.com"
            />
          </div>

          <div>
            <label className="block text-xs font-medium text-[#a3a3a3] mb-1.5 uppercase tracking-wide" htmlFor="password">
              Password
            </label>
            <input
              id="password"
              type="password"
              required
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-3 py-2 text-sm text-[#ededed] placeholder-[#737373] focus:outline-none focus:border-[#525252] transition-colors"
              placeholder="••••••••"
            />
          </div>

          <div className="pt-2">
            <button 
              type="submit" 
              disabled={loading}
              className="w-full authentic-button text-sm font-medium py-2.5 rounded-md flex justify-center items-center disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? (
                <div className="w-4 h-4 border-2 border-[#0a0a0a] border-t-transparent rounded-full animate-spin"></div>
              ) : (
                "Continue"
              )}
            </button>
          </div>
          
          <div className="text-center text-xs text-[#737373] mt-6">
            Don&apos;t have an account? <Link href="#" className="text-[#ededed] hover:underline font-medium ml-1 transition-colors">Request access</Link>
          </div>
        </form>
      </div>
    </main>
  );
}
