'use client';

import React, { useState } from 'react';

interface MaterialMix {
  id: string;
  name: string;
  percentage: number;
  informalRate: number; // ₹/kg given by predatory middlemen
  formalRate: number;   // ₹/kg provided via Kabadiwala Connect
}

const DEFAULT_MIX: MaterialMix[] = [
  { id: 'pcb', name: 'Circuit Boards (PCB)', percentage: 20, informalRate: 110, formalRate: 220 },
  { id: 'cables', name: 'Copper Cables (Unburnt)', percentage: 15, informalRate: 280, formalRate: 480 },
  { id: 'batteries', name: 'Li-ion Batteries', percentage: 10, informalRate: 65, formalRate: 140 },
  { id: 'crt', name: 'CRT Displays & Monitors', percentage: 25, informalRate: 15, formalRate: 32 },
  { id: 'plastics', name: 'E-Waste Engineering Plastics', percentage: 30, informalRate: 10, formalRate: 24 },
];

export default function UnitEconomicsCalculator() {
  const [totalWeight, setTotalWeight] = useState<number>(100);

  // Calculations
  const calculations = DEFAULT_MIX.map((item) => {
    const itemWeight = (totalWeight * item.percentage) / 100;
    const informalIncome = itemWeight * item.informalRate;
    const formalIncome = itemWeight * item.formalRate;
    const surplus = formalIncome - informalIncome;
    const percentGain = ((surplus / informalIncome) * 100);

    return {
      ...item,
      itemWeight,
      informalIncome,
      formalIncome,
      surplus,
      percentGain,
    };
  });

  const totalInformal = calculations.reduce((acc, c) => acc + c.informalIncome, 0);
  const totalFormal = calculations.reduce((acc, c) => acc + c.formalIncome, 0);
  const totalSurplus = totalFormal - totalInformal;
  const overallPercentGain = ((totalSurplus / totalInformal) * 100).toFixed(1);
  const annualSurplusEstimate = (totalSurplus * 12).toLocaleString('en-IN');

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative overflow-hidden">
      {/* Background Glow */}
      <div className="absolute -top-24 -right-24 w-80 h-80 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute -bottom-24 -left-24 w-80 h-80 bg-blue-500/10 rounded-full blur-3xl pointer-events-none" />

      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
            <span>Verified 100 kg Unit Economics</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
            <span>SIH 2026 Model</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Informal Exploitation vs Formal Direct Recycling
          </h3>
          <p className="text-slate-400 text-sm mt-1 max-w-xl">
            See how removing predatory middleman rings and unscientific backyard extraction provides dramatic income gains for informal waste collectors.
          </p>
        </div>

        {/* Big Surplus Highlight Callout */}
        <div className="bg-gradient-to-br from-emerald-500/20 to-emerald-600/10 border border-emerald-500/30 rounded-2xl p-4 flex items-center space-x-4">
          <div className="text-right">
            <div className="text-xs uppercase font-bold tracking-wider text-emerald-400">
              Collector Net Income Gain
            </div>
            <div className="text-3xl font-black text-white">
              +{overallPercentGain}%
            </div>
          </div>
          <div className="w-12 h-12 rounded-xl bg-emerald-500/20 flex items-center justify-center text-emerald-400 font-bold text-2xl">
            ₹
          </div>
        </div>
      </div>

      {/* Weight Slider Controller */}
      <div className="my-6 p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
        <div className="flex items-center justify-between mb-3">
          <label htmlFor="weight-slider" className="text-sm font-bold text-slate-200 flex items-center space-x-2">
            <span>Batch Volume:</span>
            <span className="text-emerald-400 font-black text-base">{totalWeight} kg</span>
          </label>
          <div className="flex space-x-2">
            {[25, 50, 100, 250, 500].map((preset) => (
              <button
                key={preset}
                type="button"
                onClick={() => setTotalWeight(preset)}
                className={`px-3 py-1 rounded-lg text-xs font-bold transition-all ${
                  totalWeight === preset
                    ? 'bg-emerald-500 text-slate-950 font-black shadow-md shadow-emerald-500/20'
                    : 'bg-slate-800 text-slate-400 hover:text-white hover:bg-slate-700'
                }`}
              >
                {preset} kg
              </button>
            ))}
          </div>
        </div>

        <input
          id="weight-slider"
          type="range"
          min="10"
          max="500"
          step="5"
          value={totalWeight}
          onChange={(e) => setTotalWeight(Number(e.target.value))}
          className="w-full h-2.5 bg-slate-800 rounded-lg appearance-none cursor-pointer accent-emerald-500"
        />
        <div className="flex justify-between text-[11px] text-slate-500 mt-1.5 font-medium">
          <span>10 kg (Single Sack)</span>
          <span>100 kg (Standard Handcart)</span>
          <span>500 kg (Micro-Aggregator Hub)</span>
        </div>
      </div>

      {/* Side-by-Side Summary Comparison Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
        {/* Predatory Middlemen Card */}
        <div className="p-5 rounded-2xl bg-rose-950/20 border border-rose-800/40 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-rose-400">
              Predatory Informal Middleman Ring
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-rose-500/20 text-rose-300">
              Backyard Dumping
            </span>
          </div>
          <div className="text-3xl font-black text-slate-100">
            ₹{totalInformal.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-400 mt-2">
            Collectors paid opaque, depressed rates; open cable burning oxidizes 15% copper; PCBs boiled in nitric acid with zero health protection.
          </p>
          <div className="mt-4 pt-3 border-t border-rose-900/40 flex justify-between text-xs text-rose-300/80 font-medium">
            <span>Avg Realized Rate:</span>
            <span>₹{(totalInformal / totalWeight).toFixed(1)} / kg</span>
          </div>
        </div>

        {/* Kabadiwala Connect Formal Chain */}
        <div className="p-5 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 relative">
          <div className="flex items-center justify-between mb-2">
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              Kabadiwala Connect (Formal Recycler Direct)
            </span>
            <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-500/20 text-emerald-300">
              CPCB EPR Certified
            </span>
          </div>
          <div className="text-3xl font-black text-emerald-400">
            ₹{totalFormal.toLocaleString('en-IN')}
          </div>
          <p className="text-xs text-slate-300 mt-2">
            Instant digital weighing; verified transparent CPCB benchmark rates; mechanical wire stripping and clean hydrometallurgical mineral recovery.
          </p>
          <div className="mt-4 pt-3 border-t border-emerald-900/40 flex justify-between text-xs text-emerald-300 font-bold">
            <span>Avg Realized Rate:</span>
            <span>₹{(totalFormal / totalWeight).toFixed(1)} / kg (+{overallPercentGain}%)</span>
          </div>
        </div>
      </div>

      {/* Itemized Material Breakdown Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">E-Waste Category</th>
              <th className="py-3 px-3">Batch Qty</th>
              <th className="py-3 px-3 text-rose-400">Informal Rate</th>
              <th className="py-3 px-3 text-emerald-400">Formal Rate</th>
              <th className="py-3 px-3 text-right">Net Collector Gain</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {calculations.map((row) => (
              <tr key={row.id} className="hover:bg-slate-900/40 transition-colors">
                <td className="py-3 px-4 font-bold text-white flex items-center space-x-2">
                  <span>{row.name}</span>
                </td>
                <td className="py-3 px-3 font-semibold text-slate-300">
                  {row.itemWeight.toFixed(1)} kg ({row.percentage}%)
                </td>
                <td className="py-3 px-3 font-medium text-rose-400/90">
                  ₹{row.informalRate}/kg (₹{row.informalIncome.toLocaleString('en-IN')})
                </td>
                <td className="py-3 px-3 font-bold text-emerald-400">
                  ₹{row.formalRate}/kg (₹{row.formalIncome.toLocaleString('en-IN')})
                </td>
                <td className="py-3 px-3 text-right font-black text-emerald-400">
                  +₹{row.surplus.toLocaleString('en-IN')} (+{row.percentGain.toFixed(0)}%)
                </td>
              </tr>
            ))}
          </tbody>
          <tfoot className="bg-slate-900 font-bold border-t border-slate-700 text-white text-xs">
            <tr>
              <td className="py-3 px-4 uppercase tracking-wider text-slate-400">Total Lot Net Surplus</td>
              <td className="py-3 px-3 font-black text-emerald-400">{totalWeight} kg</td>
              <td className="py-3 px-3 text-rose-400">₹{totalInformal.toLocaleString('en-IN')}</td>
              <td className="py-3 px-3 text-emerald-400">₹{totalFormal.toLocaleString('en-IN')}</td>
              <td className="py-3 px-3 text-right font-black text-emerald-400 text-sm">
                +₹{totalSurplus.toLocaleString('en-IN')}
              </td>
            </tr>
          </tfoot>
        </table>
      </div>

      {/* Annual Impact Callout */}
      <div className="mt-6 p-4 rounded-xl bg-slate-950/80 border border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
        <div className="flex items-center space-x-3 text-slate-300">
          <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
            📈
          </div>
          <span>
            Assuming 1 handcart ({totalWeight} kg) per month, an informal family earns an extra{' '}
            <strong className="text-emerald-400 font-bold">₹{annualSurplusEstimate} / year</strong>, directly uplifting livelihoods.
          </span>
        </div>
        <div className="text-slate-400 whitespace-nowrap">
          CPCB E-Waste Rules 2022 Compliant
        </div>
      </div>
    </div>
  );
}
