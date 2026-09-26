import Link from "next/link";

export default function Handovers() {
  return (
    <main className="min-h-screen text-slate-200 pb-12">
      <nav className="glass-header sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gradient">
          E-Waste Connect
        </h1>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 transition">Dashboard</Link>
          <Link href="/" className="text-slate-300 hover:text-white transition">Lots Browser</Link>
          <Link href="/handovers" className="text-white font-semibold transition border-b-2 border-emerald-500 pb-1">Handovers</Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-32 px-6">
        <div className="glass-panel p-12 text-center rounded-2xl max-w-lg animate-slide-up">
          <h2 className="text-3xl font-extrabold mb-4 text-white">Handovers</h2>
          <p className="text-slate-400 mb-8">This module is currently under construction for the SIH prototype. Check back soon!</p>
          <Link href="/">
            <button className="glass-button px-6 py-3 rounded-lg font-medium text-white shadow-lg">
              Return to Lots Browser
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
