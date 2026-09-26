import Link from "next/link";

export default function Handovers() {
  return (
    <main className="min-h-screen pb-16 font-sans">
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#ededed] rounded-sm flex items-center justify-center">
            <span className="text-[#0a0a0a] font-bold text-xs">K</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-[#ededed]">
            Kabadiwala
          </h1>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/admin" className="text-[#a3a3a3] hover:text-[#ededed] transition-colors">Dashboard</Link>
          <Link href="/" className="text-[#a3a3a3] hover:text-[#ededed] transition-colors">Lots Browser</Link>
          <Link href="/handovers" className="text-[#ededed] transition-colors relative">
            Handovers
            <span className="absolute -bottom-[19px] left-0 w-full h-[2px] bg-[#ededed]"></span>
          </Link>
        </div>
      </nav>

      <div className="flex flex-col items-center justify-center mt-32 px-6">
        <div className="authentic-panel p-12 text-center rounded-xl max-w-lg animate-slide-up">
          <h2 className="text-2xl font-semibold mb-4 text-[#ededed] tracking-tight">Handovers</h2>
          <p className="text-[#a3a3a3] mb-8 text-sm leading-relaxed">This module is currently under construction for the prototype. Check back soon for handover tracking and receipt generation.</p>
          <Link href="/">
            <button className="authentic-button px-6 py-2.5 rounded-md font-medium text-sm">
              Return to Browser
            </button>
          </Link>
        </div>
      </div>
    </main>
  );
}
