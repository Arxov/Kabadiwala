"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LotsMap = dynamic(() => import('@/components/MapWrapper'), { 
  ssr: false, 
  loading: () => <div className="h-[420px] w-full rounded-2xl glass-panel animate-shimmer flex items-center justify-center mb-10 border border-white/5"><span className="text-slate-500 text-sm">Loading Map…</span></div> 
});

export default function Home() {
  const lots = useLiveQuery(() => db.lots.toArray());
  const [mounted, setMounted] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ material_type: '', estimated_weight_kg: '', estimated_value_inr: '' });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [serviceTab, setServiceTab] = useState<'all' | 'individual' | 'organisation'>('all');

  useEffect(() => {
    setMounted(true);
  }, []);

  const handleAddLot = async (e: React.FormEvent) => {
    e.preventDefault();
    const newLot = {
      id: Math.random().toString(36).substring(2, 9),
      status: 'available',
      updated_at: new Date().toISOString(),
      collector_id: 'c-demo',
      material_type: formData.material_type,
      estimated_weight_kg: Number(formData.estimated_weight_kg),
      estimated_value_inr: Number(formData.estimated_value_inr),
      location_lat: 18.5204 + (Math.random() - 0.5) * 0.15,
      location_lng: 73.8567 + (Math.random() - 0.5) * 0.15,
    };
    await db.lots.add(newLot);
    setIsModalOpen(false);
    setFormData({ material_type: '', estimated_weight_kg: '', estimated_value_inr: '' });
  };

  if (!mounted) return null;

  const totalWeight = lots?.reduce((sum, l) => sum + l.estimated_weight_kg, 0) || 0;
  const totalValue = lots?.reduce((sum, l) => sum + l.estimated_value_inr, 0) || 0;

  return (
    <main className="min-h-screen pb-16 relative">
      {/* ─── NAVIGATION ─── */}
      <nav className="glass-header sticky top-0 z-50 px-6 lg:px-10 py-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <Link href="/" className="flex items-center gap-3 group">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center shadow-lg shadow-emerald-500/20 group-hover:shadow-emerald-500/40 transition-shadow">
              <svg className="w-5 h-5 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M13 10V3L4 14h7v7l9-11h-7z" /></svg>
            </div>
            <span className="text-xl font-bold text-gradient tracking-tight">Kabadiwala</span>
          </Link>

          {/* Desktop nav */}
          <div className="hidden md:flex items-center gap-1">
            <Link href="/" className="px-4 py-2 rounded-lg text-sm font-semibold text-white bg-white/5 border border-white/10">
              Lots Browser
            </Link>
            <Link href="/prices" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              Scrap Prices
            </Link>
            <Link href="/handovers" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              Handovers
            </Link>
            <Link href="/admin" className="px-4 py-2 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition-all">
              Admin
            </Link>
            <div className="w-px h-6 bg-white/10 mx-2"></div>
            <Link href="/login" className="glass-button px-4 py-2 rounded-lg text-sm font-semibold text-white">
              Sign In
            </Link>
          </div>

          {/* Mobile hamburger */}
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

        {/* Mobile dropdown */}
        {mobileMenuOpen && (
          <div className="md:hidden mt-3 pb-3 border-t border-white/5 pt-3 flex flex-col gap-1 animate-slide-up">
            <Link href="/" className="px-4 py-2.5 rounded-lg text-sm font-semibold text-white bg-white/5">Lots Browser</Link>
            <Link href="/prices" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition">Scrap Prices</Link>
            <Link href="/handovers" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition">Handovers</Link>
            <Link href="/admin" className="px-4 py-2.5 rounded-lg text-sm font-medium text-slate-400 hover:text-white hover:bg-white/5 transition">Admin</Link>
            <Link href="/login" className="glass-button px-4 py-2.5 rounded-lg text-sm font-semibold text-white text-center mt-1">Sign In</Link>
          </div>
        )}
      </nav>

      <div className="max-w-7xl mx-auto px-6 lg:px-10">

        {/* ─── HERO STRIP ─── */}
        <div className="mt-10 mb-10 animate-slide-up">
          <div className="flex flex-col lg:flex-row justify-between items-start lg:items-end gap-6">
            <div>
              <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-2">Recycler Portal</p>
              <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight leading-tight">
                Available <span className="text-gradient">Lots</span>
              </h2>
              <p className="text-slate-400 text-lg mt-2 max-w-lg">Browse e-waste materials near you. Prepare quotes, track handovers, and manage your recycling pipeline.</p>
            </div>

            <div className="flex gap-3 items-center flex-wrap">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="glass-button px-5 py-2.5 rounded-xl text-sm font-bold text-white flex items-center gap-2"
              >
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M12 4v16m8-8H4"></path></svg>
                Add New Lot
              </button>
              <div className="glass-panel px-4 py-2.5 rounded-xl text-sm font-medium flex items-center gap-2.5">
                <span className="glow-dot"></span>
                <span className="text-slate-300">Live Sync</span>
              </div>
            </div>
          </div>
        </div>

        {/* ─── KPI STRIP ─── */}
        {lots && lots.length > 0 && (
          <div className="grid grid-cols-3 gap-4 mb-10 animate-slide-up" style={{ animationDelay: '0.1s' }}>
            <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-emerald-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-emerald-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" /></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Lots</p>
                <p className="text-2xl font-extrabold text-white stat-value">{lots.length}</p>
              </div>
            </div>
            <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-blue-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" /></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Total Weight</p>
                <p className="text-2xl font-extrabold text-white stat-value">{totalWeight.toLocaleString()} <span className="text-sm font-medium text-slate-400">kg</span></p>
              </div>
            </div>
            <div className="glass-panel rounded-xl px-5 py-4 flex items-center gap-4">
              <div className="w-10 h-10 rounded-lg bg-amber-500/10 flex items-center justify-center flex-shrink-0">
                <svg className="w-5 h-5 text-amber-400" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>
              </div>
              <div>
                <p className="text-xs font-semibold text-slate-500 uppercase tracking-wider">Est. Value</p>
                <p className="text-2xl font-extrabold text-white stat-value">₹{totalValue.toLocaleString()}</p>
              </div>
            </div>
          </div>
        )}

        {/* ─── MAP ─── */}
        <div className="animate-slide-up" style={{ animationDelay: '0.15s' }}>
          <LotsMap lots={lots || []} />
        </div>
        
        {/* ─── LOTS GRID ─── */}
        {!lots ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-emerald-500/30 border-t-emerald-500 rounded-full animate-spin"></div>
          </div>
        ) : lots.length === 0 ? (
          <div className="gradient-card p-12 text-center rounded-2xl flex flex-col items-center justify-center animate-fade-in-scale">
            <div className="w-16 h-16 rounded-2xl bg-slate-800 flex items-center justify-center mb-5">
              <svg className="w-8 h-8 text-slate-500" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 012-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            </div>
            <h3 className="text-xl font-bold text-white mb-2">No lots available yet</h3>
            <p className="text-slate-400 max-w-sm">There are no materials in your area at the moment. Add a lot or load demo data to get started.</p>
            <div className="flex gap-4 mt-8">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="glass-button px-6 py-3 rounded-xl font-semibold text-white"
              >
                Add Your First Lot
              </button>
              <button 
                onClick={() => {
                  db.lots.bulkAdd([
                    { id: '1', status: 'available', updated_at: new Date().toISOString(), collector_id: 'c1', material_type: 'Mixed Copper & Cables', estimated_weight_kg: 45, estimated_value_inr: 8500, location_lat: 18.51 + (Math.random() - 0.5)*0.1, location_lng: 73.85 + (Math.random() - 0.5)*0.1 },
                    { id: '2', status: 'available', updated_at: new Date().toISOString(), collector_id: 'c2', material_type: 'Old Smartphones (Scrap)', estimated_weight_kg: 12, estimated_value_inr: 12000, location_lat: 18.52 + (Math.random() - 0.5)*0.1, location_lng: 73.84 + (Math.random() - 0.5)*0.1 },
                    { id: '3', status: 'available', updated_at: new Date().toISOString(), collector_id: 'c3', material_type: 'Motherboards & RAM', estimated_weight_kg: 8, estimated_value_inr: 15400, location_lat: 18.53 + (Math.random() - 0.5)*0.1, location_lng: 73.86 + (Math.random() - 0.5)*0.1 },
                    { id: '4', status: 'available', updated_at: new Date().toISOString(), collector_id: 'c4', material_type: 'CRT Monitors', estimated_weight_kg: 120, estimated_value_inr: 3000, location_lat: 18.50 + (Math.random() - 0.5)*0.1, location_lng: 73.82 + (Math.random() - 0.5)*0.1 },
                  ]);
                }}
                className="glass-button-outline px-6 py-3 rounded-xl font-semibold"
              >
                Load Demo Data
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {lots.map((lot, idx) => (
              <div 
                key={lot.id} 
                className={`gradient-card p-6 relative overflow-hidden group hover:-translate-y-1.5 hover:shadow-2xl hover:shadow-emerald-500/10 transition-all duration-400 animate-slide-up stagger-${Math.min(idx + 1, 6)}`}
                style={{ opacity: 0 }}
              >
                {/* Decorative corner glow */}
                <div className="absolute -top-16 -right-16 w-32 h-32 bg-emerald-500/10 rounded-full blur-2xl group-hover:bg-emerald-500/20 transition-all duration-700"></div>
                
                <div className="relative z-10">
                  {/* Header */}
                  <div className="flex justify-between items-start mb-5">
                    <div className="flex-1 min-w-0">
                      <h3 className="text-lg font-bold text-white mb-1 truncate">{lot.material_type}</h3>
                      <div className="flex items-center gap-2">
                        <div className="w-5 h-5 rounded-full bg-gradient-to-br from-emerald-400 to-cyan-500 flex items-center justify-center">
                          <span className="text-[8px] font-bold text-white">P</span>
                        </div>
                        <p className="text-slate-500 text-xs font-medium">Local Collector • Pune</p>
                      </div>
                    </div>
                    <span className="flex-shrink-0 ml-3 bg-emerald-500/10 text-emerald-400 text-xs font-bold px-3 py-1.5 rounded-lg border border-emerald-500/20">
                      {lot.estimated_weight_kg} kg
                    </span>
                  </div>
                  
                  {/* Details */}
                  <div className="space-y-3 mb-6">
                    <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                      <span className="text-slate-500 text-sm">Estimated Value</span>
                      <span className="text-white font-bold text-lg stat-value">₹{lot.estimated_value_inr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center py-2.5 border-b border-white/5">
                      <span className="text-slate-500 text-sm">Status</span>
                      <span className="flex items-center gap-2 text-sm">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400"></span>
                        <span className="text-slate-300 capitalize">{lot.status.replace('_', ' ')}</span>
                      </span>
                    </div>
                  </div>
                  
                  {/* CTA */}
                  <button className="w-full glass-button text-white font-semibold py-3 rounded-xl flex justify-center items-center gap-2 text-sm">
                    <span>Prepare Quote</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform duration-300" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* ─── OUR SERVICES ─── */}
      <div className="max-w-7xl mx-auto px-6 lg:px-10 mt-20 mb-16">
        <div className="text-center mb-10 animate-slide-up">
          <p className="text-emerald-400 text-sm font-semibold tracking-wider uppercase mb-3">What We Offer</p>
          <h2 className="text-4xl lg:text-5xl font-extrabold text-white tracking-tight">
            Our <span className="text-gradient">Services</span>
          </h2>
          <p className="text-slate-400 text-lg mt-3 max-w-lg mx-auto">
            Attaining <span className="text-emerald-400 font-semibold">sustainable solutions</span> with ease.
          </p>

          {/* Tab Filters */}
          <div className="flex items-center justify-center gap-2 mt-8">
            {([
              { key: 'all' as const, label: 'All Services', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2V6zM14 6a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2V6zM4 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2H6a2 2 0 01-2-2v-2zM14 16a2 2 0 012-2h2a2 2 0 012 2v2a2 2 0 01-2 2h-2a2 2 0 01-2-2v-2z" /> },
              { key: 'individual' as const, label: 'For Individuals', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z" /> },
              { key: 'organisation' as const, label: 'For Organisations', icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" /> },
            ]).map((tab) => (
              <button
                key={tab.key}
                onClick={() => setServiceTab(tab.key)}
                className={`flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all ${
                  serviceTab === tab.key 
                    ? 'glass-button text-white shadow-lg' 
                    : 'text-slate-400 hover:text-white bg-white/5 hover:bg-white/10 border border-white/5'
                }`}
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">{tab.icon}</svg>
                {tab.label}
              </button>
            ))}
          </div>
        </div>

        {/* Services Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {([
            {
              title: 'Scrap Collection',
              description: 'Digitised solution for door-to-door free pickup of 40+ recyclables across your city.',
              category: 'individual' as const,
              iconBg: 'bg-emerald-500/10',
              iconColor: 'text-emerald-400',
              glowColor: 'group-hover:shadow-emerald-500/10',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />,
            },
            {
              title: 'Zero Waste Society',
              description: 'Serving residential societies in achieving their zero waste goals with smart bins and tracking.',
              category: 'organisation' as const,
              iconBg: 'bg-blue-500/10',
              iconColor: 'text-blue-400',
              glowColor: 'group-hover:shadow-blue-500/10',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0z" />,
            },
            {
              title: 'Vehicle Scrapping',
              description: 'Assisting people in getting rid of old vehicles sustainably with government-compliant processes.',
              category: 'individual' as const,
              iconBg: 'bg-amber-500/10',
              iconColor: 'text-amber-400',
              glowColor: 'group-hover:shadow-amber-500/10',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M13 10V3L4 14h7v7l9-11h-7z" />,
            },
            {
              title: 'E-Waste Management',
              description: 'End-to-end certified e-waste disposal and recycling for electronics, batteries, and IT assets.',
              category: 'organisation' as const,
              iconBg: 'bg-purple-500/10',
              iconColor: 'text-purple-400',
              glowColor: 'group-hover:shadow-purple-500/10',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />,
            },
            {
              title: 'Corporate Recycling',
              description: 'Bulk waste management and CSR-ready compliance reporting for enterprises and campuses.',
              category: 'organisation' as const,
              iconBg: 'bg-cyan-500/10',
              iconColor: 'text-cyan-400',
              glowColor: 'group-hover:shadow-cyan-500/10',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />,
            },
            {
              title: 'Pickup on Demand',
              description: 'Schedule a free doorstep pickup for your recyclables with real-time tracking and fair pricing.',
              category: 'individual' as const,
              iconBg: 'bg-rose-500/10',
              iconColor: 'text-rose-400',
              glowColor: 'group-hover:shadow-rose-500/10',
              icon: <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />,
            },
          ])
            .filter((s) => serviceTab === 'all' || s.category === serviceTab)
            .map((service, idx) => (
              <div
                key={service.title}
                className={`gradient-card p-6 rounded-xl group hover:-translate-y-1.5 hover:shadow-2xl ${service.glowColor} transition-all duration-400 animate-slide-up stagger-${Math.min(idx + 1, 6)}`}
                style={{ opacity: 0 }}
              >
                {/* Decorative corner glow */}
                <div className="absolute -top-12 -right-12 w-24 h-24 bg-white/[0.02] rounded-full blur-2xl group-hover:bg-white/[0.05] transition-all duration-700"></div>

                <div className="relative z-10 flex items-start gap-4">
                  {/* Icon */}
                  <div className={`w-12 h-12 rounded-xl ${service.iconBg} flex items-center justify-center flex-shrink-0`}>
                    <svg className={`w-6 h-6 ${service.iconColor}`} fill="none" viewBox="0 0 24 24" stroke="currentColor">{service.icon}</svg>
                  </div>

                  {/* Text */}
                  <div className="flex-1 min-w-0">
                    <h3 className="text-lg font-bold text-white mb-1.5 group-hover:text-gradient transition-all">{service.title}</h3>
                    <p className="text-slate-400 text-sm leading-relaxed">{service.description}</p>
                  </div>
                </div>
              </div>
            ))
          }
        </div>

        {/* Contact CTA */}
        <div className="text-center mt-10">
          <button className="glass-button px-8 py-3 rounded-xl text-sm font-bold text-white inline-flex items-center gap-2">
            <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" /></svg>
            Contact Us
          </button>
        </div>
      </div>

      {/* ─── ADD LOT MODAL ─── */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-md" onClick={() => setIsModalOpen(false)}></div>
          <div className="glass-panel p-8 rounded-2xl w-full max-w-md relative z-10 animate-fade-in-scale border border-white/10 shadow-2xl shadow-black/50">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-5 right-5 w-8 h-8 rounded-lg hover:bg-white/5 flex items-center justify-center text-slate-400 hover:text-white transition">
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            
            <div className="mb-6">
              <h3 className="text-2xl font-bold text-white">Create New Lot</h3>
              <p className="text-slate-500 text-sm mt-1">Fill in the details to add a new e-waste lot</p>
            </div>
            
            <form onSubmit={handleAddLot} className="space-y-5">
              <div>
                <label className="block text-sm font-semibold text-slate-300 mb-2">Material Type</label>
                <input 
                  required
                  type="text" 
                  value={formData.material_type}
                  onChange={e => setFormData({...formData, material_type: e.target.value})}
                  className="w-full"
                  placeholder="e.g. Copper wire, Laptops"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Weight (kg)</label>
                  <input 
                    required
                    type="number" 
                    min="0.1"
                    step="0.1"
                    value={formData.estimated_weight_kg}
                    onChange={e => setFormData({...formData, estimated_weight_kg: e.target.value})}
                    className="w-full"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold text-slate-300 mb-2">Value (₹)</label>
                  <input 
                    required
                    type="number" 
                    min="1"
                    value={formData.estimated_value_inr}
                    onChange={e => setFormData({...formData, estimated_value_inr: e.target.value})}
                    className="w-full"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full glass-button text-white font-bold py-3 rounded-xl">
                  Submit & Sync
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
