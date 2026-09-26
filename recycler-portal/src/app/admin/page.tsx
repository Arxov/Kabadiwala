"use client";
import { useState, useEffect } from 'react';
import Link from 'next/link';

interface DashboardStats {
  totalHandoverVolume: number;
  activeRecyclers: number;
  anomaliesDetected: number;
  recentActivity: { id: string; action: string; time: string; status: 'success' | 'warning' }[];
}

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

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
            recentActivity: [
              { id: '1', action: 'Large batch of laptops collected', time: '10 mins ago', status: 'success' },
              { id: '2', action: 'Unverified recycler registration attempt', time: '1 hour ago', status: 'warning' },
              { id: '3', action: 'Daily sync completed successfully', time: '3 hours ago', status: 'success' },
              { id: '4', action: 'High value e-waste reported missing', time: '5 hours ago', status: 'warning' },
            ]
          });
          setLoading(false);
        }, 400);
      });
  }, []);

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-[#ededed] flex font-sans selection:bg-[#262626] selection:text-[#ededed]">
      {/* Sidebar */}
      <aside className="w-72 bg-[#0a0a0a] border-r border-[#262626] flex flex-col">
        <div className="p-8 border-b border-[#262626]">
          <div className="flex items-center gap-3">
            <div className="w-8 h-8 bg-[#ededed] rounded-sm flex items-center justify-center">
              <span className="text-[#0a0a0a] font-bold">K</span>
            </div>
            <h1 className="text-xl font-semibold tracking-tight text-[#ededed]">
              Kabadiwala Admin
            </h1>
          </div>
        </div>
        
        <nav className="flex-1 px-4 py-8 space-y-1">
          <Link href="/admin" className="flex items-center gap-3 px-4 py-2.5 rounded-md bg-[#141414] text-[#ededed] border border-[#262626] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" />
            </svg>
            <span className="font-medium text-sm">Overview</span>
          </Link>
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#141414] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
            <span className="font-medium text-sm">Operators</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#141414] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            <span className="font-medium text-sm">Market Rates</span>
          </a>
          <a href="#" className="flex items-center gap-3 px-4 py-2.5 rounded-md text-[#a3a3a3] hover:text-[#ededed] hover:bg-[#141414] transition-colors">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            <span className="font-medium text-sm">Incident Log</span>
          </a>
        </nav>
        
        <div className="p-6">
           <Link href="/" className="flex items-center justify-center gap-2 w-full py-2.5 px-4 authentic-button-outline rounded-md transition-colors font-medium text-sm">
             <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
               <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 19l-7-7m0 0l7-7m-7 7h18" />
             </svg>
             Return to Portal
           </Link>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 p-10 overflow-y-auto">
        <header className="flex justify-between items-center mb-12 animate-fade-in border-b border-[#262626] pb-6">
          <div>
            <h2 className="text-2xl font-semibold tracking-tight">System Status</h2>
            <p className="text-[#a3a3a3] text-sm mt-1">Metrics and recent activities for your region.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 px-3 py-1.5 bg-[#141414] border border-[#262626] rounded-md">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
              <span className="text-xs font-medium text-[#a3a3a3]">All Systems Normal</span>
            </div>
            <button className="w-8 h-8 rounded-md bg-[#141414] border border-[#262626] flex items-center justify-center hover:bg-[#262626] transition-colors">
              <svg className="w-4 h-4 text-[#a3a3a3]" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
              </svg>
            </button>
            <div className="w-8 h-8 rounded-md bg-[#ededed] flex items-center justify-center cursor-pointer">
              <span className="font-bold text-xs text-[#0a0a0a]">AU</span>
            </div>
          </div>
        </header>

        {loading ? (
          <div className="flex flex-col items-center justify-center h-64 space-y-4">
            <div className="w-6 h-6 border-2 border-[#262626] border-t-[#ededed] rounded-full animate-spin"></div>
            <p className="text-[#a3a3a3] text-sm font-medium">Loading telemetry...</p>
          </div>
        ) : (
          <div className="space-y-8 animate-slide-up">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              <div className="authentic-panel p-6 rounded-xl relative overflow-hidden">
                <h3 className="text-[#737373] text-xs font-semibold tracking-widest uppercase mb-3">Total Handover Volume</h3>
                <div className="flex items-baseline gap-2">
                  <p className="text-3xl font-bold text-[#ededed]">{stats?.totalHandoverVolume.toLocaleString()}</p>
                  <span className="text-[#a3a3a3] text-sm font-medium">kg</span>
                </div>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="flex items-center text-emerald-500 font-medium">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    12%
                  </span>
                  <span className="text-[#737373]">vs last month</span>
                </div>
              </div>

              <div className="authentic-panel p-6 rounded-xl relative overflow-hidden">
                <h3 className="text-[#737373] text-xs font-semibold tracking-widest uppercase mb-3">Active Operators</h3>
                <p className="text-3xl font-bold text-[#ededed]">{stats?.activeRecyclers}</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="flex items-center text-[#ededed] font-medium">
                    <svg className="w-3 h-3 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                    3 new
                  </span>
                  <span className="text-[#737373]">this week</span>
                </div>
              </div>

              <div className="authentic-panel p-6 rounded-xl relative overflow-hidden">
                <h3 className="text-[#737373] text-xs font-semibold tracking-widest uppercase mb-3">Anomalies Detected</h3>
                <p className="text-3xl font-bold text-[#ededed]">{stats?.anomaliesDetected}</p>
                <div className="mt-4 flex items-center gap-2 text-xs">
                  <span className="text-[#a3a3a3] font-medium">
                    Requires manual review
                  </span>
                </div>
              </div>
            </div>

            {/* Recent Activity Table */}
            <div className="authentic-panel rounded-xl overflow-hidden mt-8">
              <div className="px-6 py-4 border-b border-[#262626] flex justify-between items-center bg-[#0a0a0a]">
                <h3 className="text-sm font-semibold text-[#ededed]">Event Log</h3>
                <button className="text-xs text-[#a3a3a3] hover:text-[#ededed] transition-colors">Export CSV</button>
              </div>
              <div className="divide-y divide-[#262626]">
                {stats?.recentActivity.map((activity) => (
                  <div key={activity.id} className="px-6 py-4 flex items-center justify-between hover:bg-[#141414] transition-colors">
                    <div className="flex items-center gap-4">
                      <div className={`w-1.5 h-1.5 rounded-full ${activity.status === 'success' ? 'bg-[#a3a3a3]' : 'bg-[#ededed]'}`}></div>
                      <p className="font-medium text-sm text-[#ededed]">{activity.action}</p>
                    </div>
                    <span className="text-xs text-[#737373]">{activity.time}</span>
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

