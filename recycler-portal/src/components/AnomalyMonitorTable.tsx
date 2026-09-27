'use client';

import React, { useState } from 'react';
import { ANOMALY_ALERTS, AnomalyRecord } from '../lib/mockData';

export default function AnomalyMonitorTable() {
  const [alerts, setAlerts] = useState<AnomalyRecord[]>(ANOMALY_ALERTS);
  const [selectedSeverity, setSelectedSeverity] = useState<string>('ALL');

  const handleUpdateStatus = (id: string, newStatus: AnomalyRecord['status']) => {
    setAlerts((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: newStatus } : a))
    );
  };

  const filtered = selectedSeverity === 'ALL'
    ? alerts
    : alerts.filter((a) => a.severity === selectedSeverity);

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative">
      {/* Top Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-rose-500/10 border border-rose-500/20 text-rose-400 text-xs font-semibold mb-2">
            <span>SPCB / CPCB Regulatory Monitor</span>
            <span className="w-1.5 h-1.5 rounded-full bg-rose-400 animate-pulse" />
            <span>Automated Telemetry</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            E-Waste Flow Anomaly & Fraud Detection Engine
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Real-time algorithmic monitoring for phantom EPR certificates, weight inflation, and geographic divergence.
          </p>
        </div>

        {/* Severity Filter */}
        <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
          <span className="text-slate-400 font-medium">Filter Severity:</span>
          <select
            value={selectedSeverity}
            onChange={(e) => setSelectedSeverity(e.target.value)}
            className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
          >
            <option value="ALL" className="bg-slate-900 text-white">All Alerts</option>
            <option value="HIGH" className="bg-slate-900 text-rose-400">High Severity</option>
            <option value="MEDIUM" className="bg-slate-900 text-amber-400">Medium Severity</option>
            <option value="LOW" className="bg-slate-900 text-blue-400">Low Severity</option>
          </select>
        </div>
      </div>

      {/* KPI Cards Strip */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 my-6">
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Lots Audited</span>
          <div className="text-2xl font-black text-white mt-1">1,420</div>
          <span className="text-[10px] text-emerald-400 font-semibold">100% Ingestion Coverage</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Anomaly Rate</span>
          <div className="text-2xl font-black text-amber-400 mt-1">1.8%</div>
          <span className="text-[10px] text-slate-500 font-semibold">Benchmark &lt; 3.0%</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Quarantined Lots</span>
          <div className="text-2xl font-black text-rose-400 mt-1">3</div>
          <span className="text-[10px] text-rose-400/80 font-semibold">Pending Physical Audit</span>
        </div>
        <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800">
          <span className="text-[11px] font-bold text-slate-400 uppercase tracking-wider block">Resolved & Cleared</span>
          <div className="text-2xl font-black text-emerald-400 mt-1">12</div>
          <span className="text-[10px] text-slate-500 font-semibold">Avg Resolution 4.2h</span>
        </div>
      </div>

      {/* Table of Alerts */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Severity & Rule</th>
              <th className="py-3 px-3">Lot Reference</th>
              <th className="py-3 px-3">Anomaly Description</th>
              <th className="py-3 px-3">Declared vs Verified</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-3 text-right">Regulatory Action</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filtered.map((item) => (
              <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3.5 px-4">
                  <div className="flex items-center space-x-2">
                    <span
                      className={`px-2 py-0.5 rounded text-[10px] font-black uppercase ${
                        item.severity === 'HIGH'
                          ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                          : item.severity === 'MEDIUM'
                          ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                          : 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                      }`}
                    >
                      {item.severity}
                    </span>
                    <span className="font-mono text-[11px] text-slate-400 font-semibold">
                      {item.anomalyType}
                    </span>
                  </div>
                </td>
                <td className="py-3.5 px-3 font-mono font-bold text-white">
                  {item.lotRef}
                </td>
                <td className="py-3.5 px-3 max-w-xs text-slate-300">
                  {item.description}
                  <span className="block text-[10px] text-slate-500 mt-0.5">{item.timestamp}</span>
                </td>
                <td className="py-3.5 px-3 text-xs">
                  <div className="text-slate-400">Decl: {item.declaredValue}</div>
                  <div className="font-bold text-rose-400">Ver: {item.verifiedValue}</div>
                </td>
                <td className="py-3.5 px-3">
                  <span
                    className={`inline-block px-2.5 py-0.5 rounded-full text-[10px] font-bold ${
                      item.status === 'INVESTIGATING'
                        ? 'bg-amber-500/15 text-amber-300 border border-amber-500/30'
                        : item.status === 'RESOLVED_REJECTED'
                        ? 'bg-rose-500/15 text-rose-300 border border-rose-500/30'
                        : item.status === 'CLEARED'
                        ? 'bg-emerald-500/15 text-emerald-300 border border-emerald-500/30'
                        : 'bg-slate-800 text-slate-300'
                    }`}
                  >
                    {item.status.replace('_', ' ')}
                  </span>
                </td>
                <td className="py-3.5 px-3 text-right">
                  <div className="flex items-center justify-end space-x-1.5">
                    {item.status !== 'INVESTIGATING' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'INVESTIGATING')}
                        className="px-2.5 py-1 rounded bg-slate-800 hover:bg-slate-700 text-slate-200 text-[11px] font-semibold"
                      >
                        Audit
                      </button>
                    )}
                    {item.status !== 'CLEARED' && (
                      <button
                        onClick={() => handleUpdateStatus(item.id, 'CLEARED')}
                        className="px-2.5 py-1 rounded bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 text-[11px] font-bold"
                      >
                        Clear
                      </button>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
