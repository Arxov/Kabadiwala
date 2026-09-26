"use client";

import { useState } from "react";
import Link from "next/link";

const sampleHandovers = [
  {
    id: 'h-001',
    material: 'Mixed Copper & Cables',
    weight: '45 kg',
    collector: 'Rajesh Pawar',
    recycler: 'GreenTech Recyclers',
    status: 'completed',
    date: '2024-09-25',
    value: '₹8,500',
    qrVerified: true,
  },
  {
    id: 'h-002',
    material: 'Old Smartphones (Scrap)',
    weight: '12 kg',
    collector: 'Sunil Mane',
    recycler: 'EcoWaste Solutions',
    status: 'in_transit',
    date: '2024-09-26',
    value: '₹12,000',
    qrVerified: true,
  },
  {
    id: 'h-003',
    material: 'Motherboards & RAM',
    weight: '8 kg',
    collector: 'Amit Deshmukh',
    recycler: 'Pending Assignment',
    status: 'pending',
    date: '2024-09-26',
    value: '₹15,400',
    qrVerified: false,
  },
];

const statusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
  completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
  in_transit: { label: 'In Transit', color: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-400' },
  pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-400' },
};

export default function Handovers() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <main className="min-h-screen pb-16">
      {/* ─── NAVIGATION ─── */}
      <nav className="glass-header sticky top-0 z-50 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-bold text-gradient tracking-tight">Kabadiwala</span>
          </Link>

          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              Lots Browser
            </Link>
            <Link href="/handovers" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/5 border border-white/10">
              Handovers
            </Link>
            <Link href="/admin" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              Admin
            </Link>
          </div>

          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)} 
            className="md:hidden w-10 h-10 flex items-center justify-center rounded-lg hover:bg-white/5 transition"
            aria-label="Toggle menu"
          >
            <svg className="w-5 h-5 text-slate-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              {mobileMenuOpen ? (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              ) : (
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              )}
            </svg>
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/5 pt-3 flex flex-col gap-1 animate-slide-up max-w-7xl mx-auto">
            <Link href="/" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400">Lots Browser</Link>
            <Link href="/handovers" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/5">Handovers</Link>
            <Link href="/admin" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400">Admin</Link>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">
        {/* ─── HEADER ─── */}
        <div className="mt-10 mb-10 animate-slide-up">
          <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-6">
            <div>
              <p className="text-blue-400 text-sm font-semibold tracking-wider uppercase mb-2">Chain of Custody</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
                <span className="text-gradient">Handovers</span>
              </h2>
              <p className="text-slate-400 text-lg mt-2 max-w-lg">Track material handoffs from collectors to certified recyclers with QR verification.</p>
            </div>
            <button className="glass-button px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
              New Handover
            </button>
          </div>
        </div>

        {/* ─── STATS ROW ─── */}
        <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
          <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Completed</p>
              <p className="text-2xl font-extrabold text-white stat-value">1</p>
            </div>
          </div>
          <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">In Transit</p>
              <p className="text-2xl font-extrabold text-white stat-value">1</p>
            </div>
          </div>
          <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4">
            <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
              <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
            </div>
            <div>
              <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Pending</p>
              <p className="text-2xl font-extrabold text-white stat-value">1</p>
            </div>
          </div>
        </div>

        {/* ─── HANDOVER CARDS ─── */}
        <div className="space-y-5 animate-slide-up" style={{ animationDelay: '0.15s' }}>
          {sampleHandovers.map((h, idx) => {
            const s = statusConfig[h.status];
            return (
              <div key={h.id} className={`gradient-card rounded-xl p-6 group hover:shadow-lg hover:shadow-black/20 transition-all animate-slide-up stagger-${idx + 1}`} style={{ opacity: 0 }}>
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                  {/* Left: material info */}
                  <div className="flex items-start gap-4 flex-1 min-w-0">
                    <div className={`w-12 h-12 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                      <svg className={`w-6 h-6 ${s.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                      </svg>
                    </div>
                    <div className="min-w-0">
                      <h3 className="text-lg font-bold text-white truncate">{h.material}</h3>
                      <p className="text-sm text-slate-500 mt-0.5">{h.collector} → {h.recycler}</p>
                    </div>
                  </div>

                  {/* Right: meta */}
                  <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Weight</p>
                      <p className="text-sm font-bold text-white">{h.weight}</p>
                    </div>
                    <div className="w-px h-8 bg-white/5 hidden md:block"></div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">Value</p>
                      <p className="text-sm font-bold text-white">{h.value}</p>
                    </div>
                    <div className="w-px h-8 bg-white/5 hidden md:block"></div>
                    <div className="flex items-center gap-2">
                      {h.qrVerified ? (
                        <span className="flex items-center gap-1.5 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-3 py-1.5 rounded-lg">
                          <svg className="w-3.5 h-3.5" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                          QR Verified
                        </span>
                      ) : (
                        <span className="text-xs font-semibold text-slate-500 bg-white/5 px-3 py-1.5 rounded-lg">Unverified</span>
                      )}
                    </div>
                    <div className="w-px h-8 bg-white/5 hidden md:block"></div>
                    <span className={`flex items-center gap-1.5 text-xs font-bold ${s.color} ${s.bg} px-3 py-1.5 rounded-lg`}>
                      <span className={`w-1.5 h-1.5 rounded-full ${s.dot}`}></span>
                      {s.label}
                    </span>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </main>
  );
}
