"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalHandoverVolume: number;
  activeRecyclers: number;
  anomaliesDetected: number;
  avgProcessingTime: number;
  recentActivity: { id: string; action: string; time: string; status: 'success' | 'warning' }[];
}

const weeklyData = [
  { day: 'Mon', value: 65 },
  { day: 'Tue', value: 82 },
  { day: 'Wed', value: 45 },
  { day: 'Thu', value: 93 },
  { day: 'Fri', value: 70 },
  { day: 'Sat', value: 55 },
  { day: 'Sun', value: 30 },
];

const materialBreakdown = [
  { name: 'Copper & Cables', pct: 35, color: 'bg-emerald-400' },
  { name: 'Smartphones', pct: 25, color: 'bg-blue-400' },
  { name: 'Motherboards', pct: 22, color: 'bg-amber-400' },
  { name: 'CRT Monitors', pct: 12, color: 'bg-purple-400' },
  { name: 'Other', pct: 6, color: 'bg-slate-400' },
];

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);

  useEffect(() => {
    fetch('/api/v1/admin/dashboard/stats')
      .then(res => {
        if (!res.ok) throw new Error('API not available, using fallback data');
        return res.json();
      })
      .then(data => {
        setStats(data);
        setLoading(false);
      })
      .catch(() => {
        setTimeout(() => {
          setStats({
            totalHandoverVolume: 14250,
            activeRecyclers: 34,
            anomaliesDetected: 3,
            avgProcessingTime: 2.4,
            recentActivity: [
              { id: '1', action: 'Large batch of laptops collected from Kothrud area', time: '10 mins ago', status: 'success' },
              { id: '2', action: 'Unverified recycler registration attempt blocked', time: '1 hour ago', status: 'warning' },
              { id: '3', action: 'Daily sync completed — 847 records updated', time: '3 hours ago', status: 'success' },
              { id: '4', action: 'High-value e-waste shipment flagged for review', time: '5 hours ago', status: 'warning' },
              { id: '5', action: 'New price board updated for Q4 2024', time: '1 day ago', status: 'success' },
            ]
          });
          setLoading(false);
        }, 600);
      });
  }, []);

  const statCards = stats ? [
    {
      label: 'Total Volume',
      value: stats.totalHandoverVolume.toLocaleString(),
      unit: 'kg',
      change: '+12%',
      changeUp: true,
      iconBg: 'bg-emerald-500/10',
      iconColor: 'text-emerald-400',
      borderHover: 'hover:border-emerald-500/30',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
    },
    {
      label: 'Active Recyclers',
      value: stats.activeRecyclers.toString(),
      unit: '',
      change: '+3 new',
      changeUp: true,
      iconBg: 'bg-blue-500/10',
      iconColor: 'text-blue-400',
      borderHover: 'hover:border-blue-500/30',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
    },
    {
      label: 'Anomalies',
      value: stats.anomaliesDetected.toString(),
      unit: '',
      change: 'Needs review',
      changeUp: false,
      iconBg: 'bg-red-500/10',
      iconColor: 'text-red-400',
      borderHover: 'hover:border-red-500/30',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />,
    },
    {
      label: 'Avg. Processing',
      value: stats.avgProcessingTime.toString(),
      unit: 'days',
      change: '-0.3 days',
      changeUp: true,
      iconBg: 'bg-amber-500/10',
      iconColor: 'text-amber-400',
      borderHover: 'hover:border-amber-500/30',
      icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />,
    },
  ] : [];

  return (
    <div className="min-h-screen flex font-sans">
      {/* ─── SIDEBAR ─── */}
      <aside className={`${sidebarCollapsed ? 'w-20' : 'w-72'} bg-[#060d1a]/80 backdrop-blur-xl border-r border-white/5 flex flex-col transition-all duration-300 relative hidden md:flex`}>
        {/* Logo */}
        <div className="p-6 border-b border-white/5">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 flex-shrink-0">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" />
              </svg>
            </div>
            {!sidebarCollapsed && (
              <span className="text-xl font-bold text-gradient">Kabadiwala</span>
            )}
          </div>
        </div>

        {/* Collapse toggle */}
        <button 
          onClick={() => setSidebarCollapsed(!sidebarCollapsed)}
          className="absolute -right-3 top-16 w-6 h-6 rounded-full bg-slate-800 border border-white/10 flex items-center justify-center hover:bg-slate-700 transition z-10"
        >
          <svg className={`w-3 h-3 text-slate-400 transition-transform ${sidebarCollapsed ? 'rotate-180' : ''}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
          </svg>
        </button>
        
        {/* Nav items */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {[
            { label: 'Dashboard', href: '/admin', active: true, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
            { label: 'Recyclers', href: '#', active: false, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
            { label: 'Price Board', href: '#', active: false, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
            { label: 'Anomalies', href: '#', active: false, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> },
            { label: 'Handovers', href: '/handovers', active: false, icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> },
          ].map((item) => (
            <Link
              key={item.label}
              href={item.href}
              className={`flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                item.active 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16,185,129,0.07)]'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
              title={item.label}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
              {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </Link>
          ))}
        </nav>
        
        {/* Bottom link */}
        <div className="p-4 border-t border-white/5">
          <Link href="/" className={`flex items-center ${sidebarCollapsed ? 'justify-center' : 'justify-center gap-2'} w-full py-2.5 px-3 rounded-xl text-sm font-medium text-slate-500 hover:text-white hover:bg-white/5 transition-all`}>
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
            </svg>
            {!sidebarCollapsed && 'Back to Portal'}
          </Link>
        </div>
      </aside>

      {/* ─── MAIN CONTENT ─── */}
      <main className="flex-1 p-6 lg:p-10 overflow-y-auto">
        {/* Header */}
        <header className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-4 mb-10">
          <div>
            <h2 className="text-3xl font-extrabold text-white tracking-tight">Dashboard</h2>
            <p className="text-slate-500 mt-1 text-sm">Welcome back, administrator — here&apos;s your system overview.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
              <span className="glow-dot"></span>
              <span className="text-sm font-medium text-slate-400">System Online</span>
            </div>
            <button className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition">
              <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 p-0.5 cursor-pointer">
              <div className="w-full h-full bg-[#0a1122] rounded-[10px] flex items-center justify-center">
                <span className="font-bold text-sm text-white">AU</span>
              </div>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-12 h-12 border-4 border-white/5 border-t-emerald-500 rounded-full animate-spin"></div>
            <p className="text-slate-500 font-medium">Syncing telemetry data…</p>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* ─── STAT CARDS ─── */}
            <div className="grid grid-cols-1 sm:grid-cols-2 xl:grid-cols-4 gap-5">
              {statCards.map((card, i) => (
                <div key={card.label} className={`gradient-card p-5 rounded-xl group ${card.borderHover} transition-all animate-slide-up stagger-${i + 1}`} style={{ opacity: 0 }}>
                  <div className="flex items-start justify-between mb-4">
                    <div className={`w-10 h-10 rounded-lg ${card.iconBg} flex items-center justify-center`}>
                      <svg className={`w-5 h-5 ${card.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">{card.icon}</svg>
                    </div>
                    <div className={`flex items-center gap-1 text-xs font-semibold px-2 py-1 rounded-md ${card.changeUp ? 'text-emerald-400 bg-emerald-500/10' : 'text-red-400 bg-red-500/10'}`}>
                      {card.changeUp && (
                        <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                      )}
                      {card.change}
                    </div>
                  </div>
                  <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider mb-1">{card.label}</p>
                  <div className="flex items-baseline gap-1.5">
                    <span className="text-3xl font-extrabold text-white stat-value">{card.value}</span>
                    {card.unit && <span className="text-sm font-medium text-slate-500">{card.unit}</span>}
                  </div>
                </div>
              ))}
            </div>

            {/* ─── CHARTS ROW ─── */}
            <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
              {/* Weekly Collection Bar Chart */}
              <div className="lg:col-span-3 gradient-card rounded-xl p-6">
                <div className="flex justify-between items-center mb-6">
                  <div>
                    <h3 className="font-bold text-white">Weekly Collection</h3>
                    <p className="text-xs text-slate-500 mt-0.5">Volume collected per day (kg)</p>
                  </div>
                  <span className="text-xs text-slate-500 bg-white/5 px-3 py-1 rounded-lg">This Week</span>
                </div>
                <div className="flex items-end gap-3 h-40">
                  {weeklyData.map((d) => (
                    <div key={d.day} className="flex-1 flex flex-col items-center gap-2">
                      <div className="w-full relative flex justify-center">
                        <div 
                          className="w-full max-w-[36px] rounded-lg bg-gradient-to-t from-emerald-500/80 to-emerald-400/40 transition-all duration-700 hover:from-emerald-400 hover:to-emerald-300/60"
                          style={{ height: `${d.value * 1.4}px` }}
                        ></div>
                      </div>
                      <span className="text-[10px] font-semibold text-slate-500">{d.day}</span>
                    </div>
                  ))}
                </div>
              </div>

              {/* Material Breakdown */}
              <div className="lg:col-span-2 gradient-card rounded-xl p-6">
                <div className="mb-6">
                  <h3 className="font-bold text-white">Material Breakdown</h3>
                  <p className="text-xs text-slate-500 mt-0.5">By category percentage</p>
                </div>
                <div className="space-y-4">
                  {materialBreakdown.map((m) => (
                    <div key={m.name}>
                      <div className="flex justify-between items-center mb-1.5">
                        <span className="text-xs font-medium text-slate-400">{m.name}</span>
                        <span className="text-xs font-bold text-white">{m.pct}%</span>
                      </div>
                      <div className="w-full h-2 bg-white/5 rounded-full overflow-hidden">
                        <div 
                          className={`h-full ${m.color} rounded-full transition-all duration-1000`}
                          style={{ width: `${m.pct}%` }}
                        ></div>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* ─── RECENT ACTIVITY ─── */}
            <div className="gradient-card rounded-xl overflow-hidden">
              <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
                <div>
                  <h3 className="font-bold text-white">Recent Activity</h3>
                  <p className="text-xs text-slate-500 mt-0.5">System events and alerts</p>
                </div>
                <button className="text-xs text-emerald-400 hover:text-emerald-300 font-semibold transition px-3 py-1.5 rounded-lg hover:bg-emerald-500/10">View All →</button>
              </div>
              <div className="divide-y divide-white/5">
                {stats?.recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-white/[0.02] transition-colors group">
                    <div className="flex items-center gap-4">
                      <div className={`w-2.5 h-2.5 rounded-full flex-shrink-0 ${
                        activity.status === 'success' 
                          ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211,153,0.4)]' 
                          : 'bg-amber-400 shadow-[0_0_8px_rgba(251,191,36,0.4)]'
                      }`}></div>
                      <p className="text-sm font-medium text-slate-300 group-hover:text-white transition">{activity.action}</p>
                    </div>
                    <span className="text-xs text-slate-600 flex-shrink-0 ml-4">{activity.time}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
