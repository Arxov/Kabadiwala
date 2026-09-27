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

const recyclersList = [
  { id: 'r-001', name: 'GreenTech Recyclers', contact: 'Ramesh Gupta', phone: '+91 98765 43210', location: 'Kothrud, Pune', status: 'verified', rating: 4.8, totalVolume: '5,230 kg', speciality: 'Copper & Cables' },
  { id: 'r-002', name: 'EcoWaste Solutions', contact: 'Anita Sharma', phone: '+91 87654 32109', location: 'Hinjewadi, Pune', status: 'verified', rating: 4.5, totalVolume: '3,890 kg', speciality: 'E-Waste (Batteries)' },
  { id: 'r-003', name: 'CleanEarth Pvt Ltd', contact: 'Sunil Patil', phone: '+91 76543 21098', location: 'Hadapsar, Pune', status: 'pending', rating: 3.9, totalVolume: '1,450 kg', speciality: 'Mixed Metals' },
  { id: 'r-004', name: 'MetalCraft Industries', contact: 'Deepak Joshi', phone: '+91 65432 10987', location: 'Pimpri, Pune', status: 'verified', rating: 4.7, totalVolume: '7₹20 kg', speciality: 'Motherboards & PCB' },
  { id: 'r-005', name: 'Urban Scrap Co.', contact: 'Priya Nair', phone: '+91 54321 09876', location: 'Baner, Pune', status: 'suspended', rating: 2.8, totalVolume: '820 kg', speciality: 'Vehicle Scrap' },
];

const priceBoard = [
  { material: 'Copper Wire (Clean)', unit: 'per kg', buyPrice: '₹620', sellPrice: '₹680', trend: 'up', change: '+₹15' },
  { material: 'Aluminium Scrap', unit: 'per kg', buyPrice: '₹105', sellPrice: '₹125', trend: 'up', change: '+₹5' },
  { material: 'Motherboards (Grade A)', unit: 'per kg', buyPrice: '₹480', sellPrice: '₹550', trend: 'down', change: '-₹20' },
  { material: 'Smartphone Scrap', unit: 'per unit', buyPrice: '₹95', sellPrice: '₹140', trend: 'up', change: '+₹10' },
  { material: 'CRT Monitor Glass', unit: 'per kg', buyPrice: '₹8', sellPrice: '₹15', trend: 'stable', change: '—' },
  { material: 'Lead-acid Battery', unit: 'per kg', buyPrice: '₹42', sellPrice: '₹55', trend: 'up', change: '+₹3' },
  { material: 'Iron & Steel', unit: 'per kg', buyPrice: '₹28', sellPrice: '₹35', trend: 'down', change: '-₹2' },
  { material: 'Plastic (HDPE)', unit: 'per kg', buyPrice: '₹18', sellPrice: '₹25', trend: 'stable', change: '—' },
];

const anomaliesList = [
  { id: 'a-001', type: 'Weight Mismatch', description: 'Reported 120kg but weigh-bridge shows 85kg — difference of 35kg in shipment #SH-2847', severity: 'high', timestamp: '25 Sep, 4:32 PM', recycler: 'Urban Scrap Co.', resolved: false },
  { id: 'a-002', type: 'Unverified Recycler', description: 'Recycler "QuickMetal Traders" attempted to register without CPCB authorization documents', severity: 'medium', timestamp: '25 Sep, 1:15 PM', recycler: 'QuickMetal Traders', resolved: false },
  { id: 'a-003', type: 'Price Anomaly', description: 'Copper quoted at ₹350/kg — 44% below market rate. Possible data entry error or fraud.', severity: 'high', timestamp: '24 Sep, 11:00 AM', recycler: 'CleanEarth Pvt Ltd', resolved: false },
  { id: 'a-004', type: 'GPS Spoofing', description: 'Collection vehicle GPS location jumped 45km in 2 minutes during route #RT-1923', severity: 'medium', timestamp: '24 Sep, 8:45 AM', recycler: 'EcoWaste Solutions', resolved: true },
  { id: 'a-005', type: 'Duplicate Entry', description: 'Same lot ID "LOT-4782" submitted twice from different collectors within 10 minutes', severity: 'low', timestamp: '23 Sep, 6:30 PM', recycler: 'GreenTech Recyclers', resolved: true },
];

const handoversList = [
  { id: 'h-001', material: 'Mixed Copper & Cables', weight: '45 kg', collector: 'Rajesh Pawar', recycler: 'GreenTech Recyclers', status: 'completed', date: '2024-09-25', value: '₹8,500', qrVerified: true },
  { id: 'h-002', material: 'Old Smartphones (Scrap)', weight: '12 kg', collector: 'Sunil Mane', recycler: 'EcoWaste Solutions', status: 'in_transit', date: '2024-09-26', value: '₹12,000', qrVerified: true },
  { id: 'h-003', material: 'Motherboards & RAM', weight: '8 kg', collector: 'Amit Deshmukh', recycler: 'MetalCraft Industries', status: 'pending', date: '2024-09-26', value: '₹15,400', qrVerified: false },
  { id: 'h-004', material: 'CRT Monitors', weight: '120 kg', collector: 'Vikram Kulkarni', recycler: 'CleanEarth Pvt Ltd', status: 'completed', date: '2024-09-24', value: '₹3,000', qrVerified: true },
  { id: 'h-005', material: 'Lead-acid Batteries', weight: '32 kg', collector: 'Ganesh Thakur', recycler: 'GreenTech Recyclers', status: 'in_transit', date: '2024-09-26', value: '₹4,200', qrVerified: true },
];

type TabKey = 'dashboard' | 'recyclers' | 'priceboard' | 'anomalies' | 'handovers';

export default function AdminDashboard() {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [loading, setLoading] = useState<boolean>(true);
  const [sidebarCollapsed, setSidebarCollapsed] = useState(false);
  const [activeTab, setActiveTab] = useState<TabKey>('dashboard');
  const [isNotificationsOpen, setIsNotificationsOpen] = useState(false);

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

  const sidebarItems: { label: string; key: TabKey; icon: JSX.Element }[] = [
    { label: 'Dashboard', key: 'dashboard', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
    { label: 'Recyclers', key: 'recyclers', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" /> },
    { label: 'Price Board', key: 'priceboard', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /> },
    { label: 'Anomalies', key: 'anomalies', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" /> },
    { label: 'Handovers', key: 'handovers', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" /> },
  ];

  const severityConfig: Record<string, { color: string; bg: string }> = {
    high: { color: 'text-red-400', bg: 'bg-red-500/10' },
    medium: { color: 'text-amber-400', bg: 'bg-amber-500/10' },
    low: { color: 'text-blue-400', bg: 'bg-blue-500/10' },
  };

  const handoverStatusConfig: Record<string, { label: string; color: string; bg: string; dot: string }> = {
    completed: { label: 'Completed', color: 'text-emerald-400', bg: 'bg-emerald-500/10', dot: 'bg-emerald-400' },
    in_transit: { label: 'In Transit', color: 'text-blue-400', bg: 'bg-blue-500/10', dot: 'bg-blue-400' },
    pending: { label: 'Pending', color: 'text-amber-400', bg: 'bg-amber-500/10', dot: 'bg-amber-400' },
  };

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
        
        {/* Nav items — now using onClick to switch tabs */}
        <nav className="flex-1 px-3 py-6 space-y-1">
          {sidebarItems.map((item) => (
            <button
              key={item.label}
              onClick={() => setActiveTab(item.key)}
              className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                activeTab === item.key 
                  ? 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20 shadow-[0_0_20px_rgba(16₹85₹29,0.07)]'
                  : 'text-slate-500 hover:text-slate-200 hover:bg-white/5'
              }`}
              title={item.label}
            >
              <svg className="w-5 h-5 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">{item.icon}</svg>
              {!sidebarCollapsed && <span className="font-medium text-sm">{item.label}</span>}
            </button>
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
            <h2 className="text-3xl font-extrabold text-white tracking-tight capitalize">{activeTab === 'priceboard' ? 'Price Board' : activeTab}</h2>
            <p className="text-slate-500 mt-1 text-sm">
              {activeTab === 'dashboard' && "Welcome back, administrator — here's your system overview."}
              {activeTab === 'recyclers' && 'Manage registered recyclers, verify credentials, and track performance.'}
              {activeTab === 'priceboard' && 'Current buy/sell prices for recyclable materials, updated daily.'}
              {activeTab === 'anomalies' && 'Flagged irregularities requiring investigation or resolution.'}
              {activeTab === 'handovers' && 'Track all material handoffs from collectors to certified recyclers.'}
            </p>
          </div>
          <div className="flex items-center gap-3">
            {/* Mobile tab selector */}
            <select 
              value={activeTab} 
              onChange={(e) => setActiveTab(e.target.value as TabKey)}
              className="md:hidden bg-white/5 border border-white/10 rounded-xl px-3 py-2 text-sm text-slate-300"
            >
              {sidebarItems.map(item => (
                <option key={item.key} value={item.key}>{item.label}</option>
              ))}
            </select>
            <div className="flex items-center gap-2.5 px-4 py-2 rounded-xl bg-white/5 border border-white/5">
              <span className="glow-dot"></span>
              <span className="text-sm font-medium text-slate-400">System Online</span>
            </div>
            <div className="relative">
              <button 
                onClick={() => setIsNotificationsOpen(!isNotificationsOpen)}
                className="w-10 h-10 rounded-xl bg-white/5 border border-white/5 flex items-center justify-center hover:bg-white/10 transition"
              >
                <svg className="w-5 h-5 text-slate-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 17h5l-1.405-1.405A2.032 2.032 0 0118 14.158V11a6.002 6.002 0 00-4-5.659V5a2 2 0 10-4 0v.341C7.67 6.165 6 8.388 6 11v3.159c0 .538-.214 1.055-.595 1.436L4 17h5m6 0v1a3 3 0 11-6 0v-1m6 0H9" />
                </svg>
                {/* Notification dot */}
                <span className="absolute top-2.5 right-3 w-2 h-2 rounded-full bg-emerald-400 border border-[#060d1a]"></span>
              </button>
              
              {isNotificationsOpen && (
                <div className="absolute right-0 mt-3 w-80 bg-[#0a1122] border border-white/10 rounded-2xl shadow-2xl overflow-hidden z-50 animate-fade-in-scale">
                  <div className="px-4 py-3 border-b border-white/10 flex justify-between items-center bg-white/5">
                    <h3 className="text-sm font-bold text-white">Notifications</h3>
                    <span className="text-xs text-emerald-400 cursor-pointer hover:text-emerald-300">Mark all as read</span>
                  </div>
                  <div className="max-h-80 overflow-y-auto">
                    {stats?.recentActivity?.slice(0, 3).map((act, i) => (
                      <div key={i} className="p-4 border-b border-white/5 hover:bg-white/5 transition flex items-start gap-3">
                        <div className={`w-2 h-2 mt-1.5 rounded-full flex-shrink-0 ${act.status === 'success' ? 'bg-emerald-400' : 'bg-amber-400'}`}></div>
                        <div>
                          <p className="text-sm text-slate-300 leading-snug">{act.action}</p>
                          <p className="text-xs text-slate-500 mt-1">{act.time}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                  <div className="p-3 text-center border-t border-white/10 bg-white/5 cursor-pointer hover:bg-white/10 transition">
                    <span className="text-xs font-semibold text-slate-400">View all notifications</span>
                  </div>
                </div>
              )}
            </div>
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
          <>
            {/* ─────────── DASHBOARD TAB ─────────── */}
            {activeTab === 'dashboard' && (
              <div className="space-y-8 animate-slide-up">
                {/* Stat Cards */}
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

                {/* Charts Row */}
                <div className="grid grid-cols-1 lg:grid-cols-5 gap-6">
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

                {/* Recent Activity */}
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
                              ? 'bg-emerald-400 shadow-[0_0_8px_rgba(52,211₹53,0.4)]' 
                              : 'bg-amber-400 shadow-[0_0_8px_rgba(251₹91,36,0.4)]'
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

            {/* ─────────── RECYCLERS TAB ─────────── */}
            {activeTab === 'recyclers' && (
              <div className="space-y-6 animate-slide-up">
                <div className="gradient-card rounded-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">Registered Recyclers</h3>
                      <p className="text-xs text-slate-500 mt-0.5">{recyclersList.length} recyclers total</p>
                    </div>
                    <button className="glass-button px-4 py-2 rounded-xl text-xs font-bold text-white flex items-center gap-1.5">
                      <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M12 4v16m8-8H4" /></svg>
                      Add Recycler
                    </button>
                  </div>
                  <div className="divide-y divide-white/5">
                    {recyclersList.map((r, idx) => (
                      <div key={r.id} className={`px-6 py-5 hover:bg-white/[0.02] transition-colors group animate-slide-up stagger-${Math.min(idx+1, 6)}`} style={{ opacity: 0 }}>
                        <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className="w-11 h-11 rounded-xl bg-gradient-to-br from-emerald-400/20 to-cyan-500/20 flex items-center justify-center flex-shrink-0">
                              <span className="text-sm font-bold text-emerald-400">{r.name.charAt(0)}</span>
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate group-hover:text-gradient transition-all">{r.name}</h4>
                              <p className="text-xs text-slate-500">{r.contact} • {r.location}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap lg:flex-nowrap">
                            <div className="text-center">
                              <p className="text-[10px] text-slate-600 uppercase">Volume</p>
                              <p className="text-xs font-bold text-white">{r.totalVolume}</p>
                            </div>
                            <div className="w-px h-6 bg-white/5 hidden lg:block"></div>
                            <div className="text-center">
                              <p className="text-[10px] text-slate-600 uppercase">Rating</p>
                              <p className="text-xs font-bold text-amber-400">★ {r.rating}</p>
                            </div>
                            <div className="w-px h-6 bg-white/5 hidden lg:block"></div>
                            <div className="text-center">
                              <p className="text-[10px] text-slate-600 uppercase">Speciality</p>
                              <p className="text-xs font-medium text-slate-400">{r.speciality}</p>
                            </div>
                            <div className="w-px h-6 bg-white/5 hidden lg:block"></div>
                            <span className={`text-xs font-bold px-3 py-1.5 rounded-lg capitalize ${
                              r.status === 'verified' ? 'text-emerald-400 bg-emerald-500/10' :
                              r.status === 'pending' ? 'text-amber-400 bg-amber-500/10' :
                              'text-red-400 bg-red-500/10'
                            }`}>{r.status}</span>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─────────── PRICE BOARD TAB ─────────── */}
            {activeTab === 'priceboard' && (
              <div className="space-y-6 animate-slide-up">
                <div className="gradient-card rounded-xl overflow-hidden">
                  <div className="px-6 py-5 border-b border-white/5 flex justify-between items-center">
                    <div>
                      <h3 className="font-bold text-white">Material Price Board</h3>
                      <p className="text-xs text-slate-500 mt-0.5">Last updated: Today at 09:00 AM</p>
                    </div>
                    <button className="glass-button px-4 py-2 rounded-xl text-xs font-bold text-white">Update Prices</button>
                  </div>
                  {/* Table Header */}
                  <div className="hidden lg:grid grid-cols-6 gap-4 px-6 py-3 bg-white/[0.02] text-xs font-semibold text-slate-500 uppercase tracking-wider border-b border-white/5">
                    <span className="col-span-2">Material</span>
                    <span>Unit</span>
                    <span>Buy Price</span>
                    <span>Sell Price</span>
                    <span>Trend</span>
                  </div>
                  <div className="divide-y divide-white/5">
                    {priceBoard.map((item, idx) => (
                      <div key={item.material} className={`px-6 py-4 hover:bg-white/[0.02] transition-colors group lg:grid lg:grid-cols-6 lg:gap-4 lg:items-center flex flex-col gap-2 animate-slide-up stagger-${Math.min(idx+1, 6)}`} style={{ opacity: 0 }}>
                        <span className="col-span-2 text-sm font-bold text-white group-hover:text-gradient transition-all">{item.material}</span>
                        <span className="text-xs text-slate-500">{item.unit}</span>
                        <span className="text-sm font-bold text-white">{item.buyPrice}</span>
                        <span className="text-sm font-bold text-emerald-400">{item.sellPrice}</span>
                        <div className="flex items-center gap-2">
                          {item.trend === 'up' && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 10l7-7m0 0l7 7m-7-7v18" /></svg>
                              {item.change}
                            </span>
                          )}
                          {item.trend === 'down' && (
                            <span className="flex items-center gap-1 text-xs font-semibold text-red-400 bg-red-500/10 px-2.5 py-1 rounded-md">
                              <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M19 14l-7 7m0 0l-7-7m7 7V3" /></svg>
                              {item.change}
                            </span>
                          )}
                          {item.trend === 'stable' && (
                            <span className="text-xs font-semibold text-slate-500 bg-white/5 px-2.5 py-1 rounded-md">Stable</span>
                          )}
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            )}

            {/* ─────────── ANOMALIES TAB ─────────── */}
            {activeTab === 'anomalies' && (
              <div className="space-y-6 animate-slide-up">
                {/* Summary strip */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-red-500/10 flex items-center justify-center"><svg className="w-4 h-4 text-red-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" /></svg></div>
                    <div><p className="text-[10px] font-semibold text-slate-600 uppercase">High</p><p className="text-xl font-extrabold text-white">{anomaliesList.filter(a => a.severity === 'high').length}</p></div>
                  </div>
                  <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center"><svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01" /></svg></div>
                    <div><p className="text-[10px] font-semibold text-slate-600 uppercase">Medium</p><p className="text-xl font-extrabold text-white">{anomaliesList.filter(a => a.severity === 'medium').length}</p></div>
                  </div>
                  <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center"><svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                    <div><p className="text-[10px] font-semibold text-slate-600 uppercase">Low</p><p className="text-xl font-extrabold text-white">{anomaliesList.filter(a => a.severity === 'low').length}</p></div>
                  </div>
                </div>

                {/* Anomaly cards */}
                <div className="space-y-4">
                  {anomaliesList.map((a, idx) => {
                    const sev = severityConfig[a.severity];
                    return (
                      <div key={a.id} className={`gradient-card rounded-xl p-5 group hover:shadow-lg transition-all animate-slide-up stagger-${Math.min(idx+1, 6)}`} style={{ opacity: 0 }}>
                        <div className="flex flex-col md:flex-row md:items-start justify-between gap-4">
                          <div className="flex items-start gap-4 flex-1 min-w-0">
                            <div className={`w-10 h-10 rounded-lg ${sev.bg} flex items-center justify-center flex-shrink-0 mt-0.5`}>
                              <svg className={`w-5 h-5 ${sev.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <div className="flex items-center gap-2 mb-1">
                                <h4 className="text-sm font-bold text-white">{a.type}</h4>
                                <span className={`text-[10px] font-bold uppercase px-2 py-0.5 rounded ${sev.bg} ${sev.color}`}>{a.severity}</span>
                                {a.resolved && <span className="text-[10px] font-bold uppercase px-2 py-0.5 rounded bg-emerald-500/10 text-emerald-400">Resolved</span>}
                              </div>
                              <p className="text-xs text-slate-400 leading-relaxed">{a.description}</p>
                              <p className="text-[10px] text-slate-600 mt-2">Recycler: {a.recycler} • {a.timestamp}</p>
                            </div>
                          </div>
                          {!a.resolved && (
                            <button className="glass-button-outline px-4 py-2 rounded-lg text-xs font-semibold flex-shrink-0">
                              Investigate
                            </button>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            )}

            {/* ─────────── HANDOVERS TAB ─────────── */}
            {activeTab === 'handovers' && (
              <div className="space-y-6 animate-slide-up">
                {/* Stats */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-emerald-500/10 flex items-center justify-center"><svg className="w-4 h-4 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" /></svg></div>
                    <div><p className="text-[10px] font-semibold text-slate-600 uppercase">Completed</p><p className="text-xl font-extrabold text-white">{handoversList.filter(h => h.status === 'completed').length}</p></div>
                  </div>
                  <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-blue-500/10 flex items-center justify-center"><svg className="w-4 h-4 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" /></svg></div>
                    <div><p className="text-[10px] font-semibold text-slate-600 uppercase">In Transit</p><p className="text-xl font-extrabold text-white">{handoversList.filter(h => h.status === 'in_transit').length}</p></div>
                  </div>
                  <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-3">
                    <div className="w-9 h-9 rounded-lg bg-amber-500/10 flex items-center justify-center"><svg className="w-4 h-4 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg></div>
                    <div><p className="text-[10px] font-semibold text-slate-600 uppercase">Pending</p><p className="text-xl font-extrabold text-white">{handoversList.filter(h => h.status === 'pending').length}</p></div>
                  </div>
                </div>

                {/* Handover cards */}
                <div className="space-y-4">
                  {handoversList.map((h, idx) => {
                    const s = handoverStatusConfig[h.status];
                    return (
                      <div key={h.id} className={`gradient-card rounded-xl p-5 group hover:shadow-lg transition-all animate-slide-up stagger-${Math.min(idx+1, 6)}`} style={{ opacity: 0 }}>
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
                          <div className="flex items-center gap-4 flex-1 min-w-0">
                            <div className={`w-11 h-11 rounded-xl ${s.bg} flex items-center justify-center flex-shrink-0`}>
                              <svg className={`w-5 h-5 ${s.color}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
                              </svg>
                            </div>
                            <div className="min-w-0">
                              <h4 className="text-sm font-bold text-white truncate">{h.material}</h4>
                              <p className="text-xs text-slate-500">{h.collector} → {h.recycler}</p>
                            </div>
                          </div>
                          <div className="flex items-center gap-4 flex-wrap md:flex-nowrap">
                            <div className="text-right"><p className="text-[10px] text-slate-600">Weight</p><p className="text-xs font-bold text-white">{h.weight}</p></div>
                            <div className="w-px h-6 bg-white/5 hidden md:block"></div>
                            <div className="text-right"><p className="text-[10px] text-slate-600">Value</p><p className="text-xs font-bold text-white">{h.value}</p></div>
                            <div className="w-px h-6 bg-white/5 hidden md:block"></div>
                            {h.qrVerified ? (
                              <span className="flex items-center gap-1 text-[10px] font-bold text-emerald-400 bg-emerald-500/10 px-2.5 py-1 rounded-md">
                                <svg className="w-3 h-3" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M5 13l4 4L19 7" /></svg>
                                QR Verified
                              </span>
                            ) : (
                              <span className="text-[10px] font-bold text-slate-500 bg-white/5 px-2.5 py-1 rounded-md">Unverified</span>
                            )}
                            <div className="w-px h-6 bg-white/5 hidden md:block"></div>
                            <span className={`flex items-center gap-1.5 text-[10px] font-bold ${s.color} ${s.bg} px-2.5 py-1 rounded-md`}>
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
            )}
          </>
        )}
      </main>
    </div>
  );
}

// Added for Hackathon Demo
export function QRHandoverModal({ isOpen, onClose, txnId }: { isOpen: boolean, onClose: () => void, txnId: string }) {
    if (!isOpen) return null;
    
    // In a real app, this would fetch from /api/v1/handover/${txnId}/generate-qr
    // For demo purposes, we will mock the JWT token shape
    const mockJwt = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0eG5faWQiOiIke3R4bklkfSIsInJlY3ljbGVyX2lkIjoiZGVtby1yZWN5Y2xlciIsImV4cCI6MTk5OTk5OTk5OX0.mock_signature_for_demo`;
    
    return (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
            <div className="bg-white p-8 rounded-xl max-w-sm w-full text-center shadow-2xl">
                <h3 className="text-xl font-bold mb-2">Digital Handover</h3>
                <p className="text-gray-500 mb-6 text-sm">Ask the collector to scan this QR code with their mobile app to cryptographically sign and complete the transaction.</p>
                
                <div className="flex justify-center mb-6 bg-gray-50 p-4 rounded-lg">
                    <QRCodeSVG value={mockJwt} size={200} level="H" includeMargin={true} />
                </div>
                
                <button onClick={onClose} className="w-full bg-green-600 hover:bg-green-700 text-white font-bold py-3 rounded-lg transition-colors">
                    Close
                </button>
            </div>
        </div>
    );
}
