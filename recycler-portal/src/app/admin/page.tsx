'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AnomalyMonitorTable from '@/components/AnomalyMonitorTable';
import DisputeResolutionPanel from '@/components/DisputeResolutionPanel';
import StructuredDatasetPanel from '@/components/StructuredDatasetPanel';

type AdminTab = 'overview' | 'anomalies' | 'disputes' | 'datasets';

export default function AdminTelemetryPage() {
  const [activeTab, setActiveTab] = useState<AdminTab>('overview');
  const [exportNotice, setExportNotice] = useState<string | null>(null);

  const handleExportAudit = () => {
    setExportNotice('Generated CPCB Telemetry Log (CPCB_EPR_AUDIT_2026_Q3.csv) — 1,420 records verified.');
    setTimeout(() => setExportNotice(null), 5000);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-8 pb-10 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-bold mb-2">
                <span>Central &amp; State Pollution Control Board Telemetry</span>
                <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
                <span>Maharashtra SPCB Node</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                SPCB / CPCB Regulatory Telemetry &amp; Fraud Detection
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Real-time mass-balance ledger monitoring e-waste flows from informal collectors to certified smelters. Algorithmic rules instantly flag weight tampering, phantom EPR certificates, and geofence breaches.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={handleExportAudit}
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-white font-bold text-xs flex items-center space-x-2 shadow-lg"
              >
                <span>📊</span>
                <span>Export CPCB Audit CSV</span>
              </button>
              <Link
                href="/epr-audit"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
              >
                <span>📜</span>
                <span>EPR Registry</span>
              </Link>
            </div>
          </div>

          {exportNotice && (
            <div className="mt-4 p-3 rounded-xl bg-emerald-500/20 border border-emerald-500/40 text-emerald-400 text-xs font-bold">
              ✓ {exportNotice}
            </div>
          )}

          {/* Macro Telemetry Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Feedstock Intake</span>
              <div className="text-2xl font-black text-white mt-1">142.5 MT</div>
              <span className="text-[10px] text-emerald-400 font-semibold">+18.4% this quarter</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Formalized Collectors</span>
              <div className="text-2xl font-black text-blue-400 mt-1">4,280</div>
              <span className="text-[10px] text-slate-400 font-semibold">SPCB registered IDs</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Licensed Dismantlers</span>
              <div className="text-2xl font-black text-purple-400 mt-1">34 Facilities</div>
              <span className="text-[10px] text-slate-400 font-semibold">100% CCTV telemetry online</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Toxins Diverted from Dumps</span>
              <div className="text-2xl font-black text-amber-400 mt-1">18,420 kg</div>
              <span className="text-[10px] text-slate-400 font-semibold">Cyanide, lead &amp; dioxins</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Navigation Tabs */}
        <div className="flex flex-wrap items-center gap-2 p-1.5 rounded-2xl bg-slate-900 border border-slate-800">
          <button
            type="button"
            onClick={() => setActiveTab('overview')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'overview'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚖️</span>
            <span>Mass Balance Overview</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('anomalies')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'anomalies'
                ? 'bg-rose-500 text-white shadow-lg shadow-rose-500/20'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🚨</span>
            <span>Anomaly Outlier Monitor</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('disputes')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'disputes'
                ? 'bg-amber-500 text-slate-950 shadow-lg shadow-amber-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>⚖️</span>
            <span>Dispute Resolution Pipeline</span>
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('datasets')}
            className={`px-4 py-2.5 rounded-xl text-xs font-bold transition-all flex items-center space-x-2 ${
              activeTab === 'datasets'
                ? 'bg-cyan-500 text-slate-950 shadow-lg shadow-cyan-500/20 font-black'
                : 'text-slate-400 hover:text-white'
            }`}
          >
            <span>🗄️</span>
            <span>Structured Datasets &amp; Provenance</span>
          </button>
        </div>

        {/* Tab 1: Mass Balance Overview */}
        {activeTab === 'overview' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Mass Balance Flow Verification */}
            <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
              <div className="max-w-3xl mb-6">
                <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
                  <span>E-Waste Rules 2022 Mass Balance Model</span>
                  <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
                  <span>Zero Leakage Verification</span>
                </div>
                <h3 className="text-2xl font-black text-white tracking-tight">
                  Feedstock Ingestion &amp; Yield Mass Balance
                </h3>
                <p className="text-slate-400 text-sm mt-1">
                  Verifying that materials received from informal collectors match the dismantled and refined fractions reported to CPCB.
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="text-[10px] font-mono text-emerald-400 font-bold block mb-1">STAGE 1: INGESTION</span>
                  <h4 className="text-lg font-black text-white">142.5 MT</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Collected by 4,280 informal workers with mobile QR timestamps and geofenced weigh-ins.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="text-[10px] font-mono text-blue-400 font-bold block mb-1">STAGE 2: DISMANTLING</span>
                  <h4 className="text-lg font-black text-white">141.8 MT</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Mechanical segregation into populated PCBs, copper windings, batteries, and plastics. (0.5% moisture variance).
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="text-[10px] font-mono text-purple-400 font-bold block mb-1">STAGE 3: REFINING</span>
                  <h4 className="text-lg font-black text-white">138.2 MT</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    High-yield hydrometallurgical smelting recovering Gold, Silver, Palladium, Lithium, and 99.9% Copper.
                  </p>
                </div>

                <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 relative">
                  <span className="text-[10px] font-mono text-amber-400 font-bold block mb-1">STAGE 4: TSDF SLAG</span>
                  <h4 className="text-lg font-black text-white">3.6 MT</h4>
                  <p className="text-xs text-slate-400 mt-2">
                    Inert vitrified slag safely encapsulated in state-authorized hazardous waste disposal facilities (TSDF).
                  </p>
                </div>
              </div>
            </section>

            {/* Quick Summary of Anomalies & Disputes */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                onClick={() => setActiveTab('anomalies')}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-rose-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-rose-400 uppercase">Automated Fraud Rules</span>
                  <span className="px-2 py-0.5 rounded-full bg-rose-500/20 text-rose-400 text-xs font-bold">4 Active Outliers</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Algorithmic Anomaly Monitor</h4>
                <p className="text-xs text-slate-400">
                  Flags weight variances &gt;15%, price spikes &gt;35%, and geofence breaches &gt;150m.
                </p>
              </div>

              <div
                onClick={() => setActiveTab('disputes')}
                className="p-6 rounded-3xl bg-slate-900 border border-slate-800 hover:border-amber-500/40 cursor-pointer transition-all"
              >
                <div className="flex items-center justify-between mb-3">
                  <span className="text-xs font-mono font-bold text-amber-400 uppercase">Regulatory Arbitration</span>
                  <span className="px-2 py-0.5 rounded-full bg-amber-500/20 text-amber-400 text-xs font-bold">1 Open Dispute</span>
                </div>
                <h4 className="text-lg font-bold text-white mb-2">Dispute Resolution Console</h4>
                <p className="text-xs text-slate-400">
                  Resolve weigh scale mismatches, contamination claims, and regulatory penalties.
                </p>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Anomaly Outliers Table */}
        {activeTab === 'anomalies' && (
          <section id="anomaly-table" className="animate-in fade-in">
            <AnomalyMonitorTable />
          </section>
        )}

        {/* Tab 3: Dispute Resolution Pipeline */}
        {activeTab === 'disputes' && (
          <section id="disputes-panel" className="animate-in fade-in">
            <DisputeResolutionPanel />
          </section>
        )}

        {/* Tab 4: Structured Datasets & Provenance */}
        {activeTab === 'datasets' && (
          <section id="datasets-panel" className="animate-in fade-in">
            <StructuredDatasetPanel />
          </section>
        )}

        {/* Regulatory Governance Guidelines */}
        <section className="p-6 rounded-3xl bg-slate-900/60 border border-slate-800 flex flex-col md:flex-row justify-between items-center gap-4 text-xs">
          <div>
            <span className="font-bold text-white block">Central Pollution Control Board Compliance Notice</span>
            <span className="text-slate-400">
              Audit log hash SHA-256: <code>e8b9c1d0a2f4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6</code>
            </span>
          </div>
          <div className="flex items-center space-x-3">
            <span className="px-3 py-1 rounded-full bg-emerald-500/10 text-emerald-400 font-bold border border-emerald-500/20">
              ✓ Telemetry Health: 100% Nominal
            </span>
          </div>
        </section>

      </main>
    </div>
  );
}
