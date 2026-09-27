'use client';

import React, { useState } from 'react';
import { SCRAP_MATERIALS, ScrapMaterial } from '../lib/mockData';

const CITY_MULTIPLIERS: Record<string, { label: string; mult: number }> = {
  pune: { label: 'Pune (Baseline)', mult: 1.0 },
  mumbai: { label: 'Mumbai (+2.5%)', mult: 1.025 },
  delhi: { label: 'Delhi-NCR (+1.8%)', mult: 1.018 },
  bengaluru: { label: 'Bengaluru (+3.0%)', mult: 1.03 },
  ahmedabad: { label: 'Ahmedabad (+0.5%)', mult: 1.005 },
};

export default function PublicPriceBoard() {
  const [selectedCity, setSelectedCity] = useState<string>('pune');
  const [searchQuery, setSearchQuery] = useState<string>('');
  const [selectedMaterial, setSelectedMaterial] = useState<ScrapMaterial>(SCRAP_MATERIALS[0]);

  const mult = CITY_MULTIPLIERS[selectedCity]?.mult || 1.0;

  const filteredMaterials = SCRAP_MATERIALS.filter((m) =>
    m.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    m.hindiName.includes(searchQuery) ||
    m.marathiName.includes(searchQuery) ||
    m.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const speakPrice = (material: ScrapMaterial) => {
    if (typeof window === 'undefined' || !('speechSynthesis' in window)) return;
    const adjustedPrice = Math.round(material.currentPrice * mult);
    const text = `Today's prevailing rate for ${material.name} in ${CITY_MULTIPLIERS[selectedCity].label} is ₹${adjustedPrice} per kilogram. Market range is ₹${Math.round(material.minPrice * mult)} to ₹${Math.round(material.maxPrice * mult)}.`;
    const utterance = new SpeechSynthesisUtterance(text);
    utterance.rate = 0.9;
    window.speechSynthesis.cancel();
    window.speechSynthesis.speak(utterance);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative">
      {/* Controls Bar */}
      <div className="flex flex-col md:flex-row md:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
            <span>CPCB Verified Benchmark Rates</span>
            <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
            <span>Live 24h Ticker</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Transparent Public Scrap Price Board
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Real-time formal dismantling benchmarks preventing informal price gouging.
          </p>
        </div>

        <div className="flex flex-wrap items-center gap-3">
          {/* City Selector */}
          <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
            <span className="text-slate-400 font-medium">City:</span>
            <select
              value={selectedCity}
              onChange={(e) => setSelectedCity(e.target.value)}
              className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
            >
              {Object.entries(CITY_MULTIPLIERS).map(([key, info]) => (
                <option key={key} value={key} className="bg-slate-900 text-white">
                  {info.label}
                </option>
              ))}
            </select>
          </div>

          {/* Search Box */}
          <div className="relative">
            <input
              type="text"
              placeholder="Search category..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 w-48"
            />
          </div>
        </div>
      </div>

      {/* Featured Scrap Hero Box */}
      <div className="my-6 p-6 rounded-2xl bg-gradient-to-br from-slate-950 to-slate-900 border border-slate-800 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
        <div>
          <div className="flex items-center space-x-3 mb-2">
            <span className="px-2.5 py-1 rounded-md bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase">
              {selectedMaterial.eprCategory}
            </span>
            <span className="text-slate-400 text-xs font-medium">
              {selectedMaterial.hindiName} • {selectedMaterial.marathiName}
            </span>
          </div>
          <h4 className="text-2xl font-black text-white">{selectedMaterial.name}</h4>
          <p className="text-xs text-slate-400 mt-2 max-w-xl">
            <strong className="text-emerald-400">Critical Minerals Recovered:</strong>{' '}
            {selectedMaterial.criticalMinerals.join(', ')}
          </p>
          <p className="text-xs text-rose-400 mt-1 max-w-xl">
            <strong>Hazard Averted:</strong> {selectedMaterial.hazardAverted}
          </p>
        </div>

        <div className="flex items-center space-x-6">
          <div className="text-right">
            <div className="text-xs uppercase font-bold text-slate-400">Prevailing Rate</div>
            <div className="text-4xl font-black text-white flex items-baseline justify-end space-x-1">
              <span className="text-2xl text-emerald-400 font-bold">₹</span>
              <span>{Math.round(selectedMaterial.currentPrice * mult)}</span>
              <span className="text-sm text-slate-400 font-semibold">/ kg</span>
            </div>
            <div className="text-[11px] font-semibold text-slate-400 mt-1">
              Range: ₹{Math.round(selectedMaterial.minPrice * mult)} - ₹{Math.round(selectedMaterial.maxPrice * mult)} / kg
            </div>
          </div>

          <button
            type="button"
            onClick={() => speakPrice(selectedMaterial)}
            className="p-3.5 rounded-2xl bg-emerald-500 text-slate-950 hover:bg-emerald-400 font-bold shadow-lg shadow-emerald-500/20 transition-all flex flex-col items-center justify-center space-y-1"
            title="Hear Prevailing Rate via Web Audio"
          >
            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2.5} d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
            </svg>
            <span className="text-[10px] font-black uppercase">Hear</span>
          </button>
        </div>
      </div>

      {/* Grid of Materials */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4">
        {filteredMaterials.map((mat) => {
          const isSelected = mat.id === selectedMaterial.id;
          const displayPrice = Math.round(mat.currentPrice * mult);
          return (
            <div
              key={mat.id}
              onClick={() => setSelectedMaterial(mat)}
              className={`p-4 rounded-2xl border transition-all cursor-pointer ${
                isSelected
                  ? 'bg-slate-800/80 border-emerald-500/80 shadow-lg shadow-emerald-500/10 ring-1 ring-emerald-500'
                  : 'bg-slate-950/60 border-slate-800/80 hover:bg-slate-900/60 hover:border-slate-700'
              }`}
            >
              <div className="flex items-start justify-between">
                <div>
                  <h5 className="font-bold text-white text-sm">{mat.name}</h5>
                  <span className="text-[11px] text-slate-400 font-medium">
                    {mat.hindiName}
                  </span>
                </div>
                <span
                  className={`text-[11px] font-bold px-2 py-0.5 rounded-full ${
                    mat.change24h >= 0
                      ? 'bg-emerald-500/15 text-emerald-400'
                      : 'bg-rose-500/15 text-rose-400'
                  }`}
                >
                  {mat.change24h >= 0 ? `+₹${mat.change24h}` : `-₹${Math.abs(mat.change24h)}`}
                </span>
              </div>

              <div className="mt-4 flex items-baseline justify-between">
                <div className="text-2xl font-black text-white">
                  ₹{displayPrice} <span className="text-xs font-normal text-slate-400">/ kg</span>
                </div>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    speakPrice(mat);
                  }}
                  className="p-1.5 rounded-lg text-slate-400 hover:text-emerald-400 hover:bg-slate-800"
                  title="Hear Price"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15.536 8.464a5 5 0 010 7.072M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z" />
                  </svg>
                </button>
              </div>

              {/* Mini sparkline visualization */}
              <div className="mt-3 pt-2 border-t border-slate-800/80 flex items-center justify-between text-[11px] text-slate-400">
                <span>30d Trend</span>
                <span className="font-semibold text-emerald-400">▲ Steady Rise</span>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
