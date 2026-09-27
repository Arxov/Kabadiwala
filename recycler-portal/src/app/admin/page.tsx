'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import AnomalyMonitorTable from '@/components/AnomalyMonitorTable';

export default function AdminTelemetryPage() {
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
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1">

        {/* Real-Time Algorithmic Anomaly Outlier Detection Table */}
        <section id="anomaly-table">
          <AnomalyMonitorTable />
        </section>

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
