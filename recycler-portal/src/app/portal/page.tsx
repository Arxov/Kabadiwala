'use client';

import React, { useState, useEffect } from 'react';
import dynamic from 'next/dynamic';
import { useLiveQuery } from 'dexie-react-hooks';
import Navigation from '@/components/Navigation';
import LotQuotingModal from '@/components/LotQuotingModal';
import { db } from '@/lib/db';
import {
  INITIAL_SAMPLE_LOTS,
  CPCB_RECYCLERS,
  SampleLotItem,
  seedDatabaseIfEmpty,
} from '@/lib/mockData';

// Dynamic import of Leaflet MapWrapper to prevent SSR issues
const MapWrapper = dynamic(() => import('@/components/MapWrapper'), {
  ssr: false,
  loading: () => (
    <div className="h-[420px] w-full rounded-2xl bg-slate-900 border border-slate-800 animate-pulse flex items-center justify-center">
      <span className="text-slate-500 text-sm font-semibold">Loading Leaflet GIS Spatial Map...</span>
    </div>
  ),
});

export default function RecyclerPortalPage() {
  const [selectedCategory, setSelectedCategory] = useState<string>('ALL');
  const [minWeight, setMinWeight] = useState<number>(0);
  const [selectedLotForQuote, setSelectedLotForQuote] = useState<SampleLotItem | null>(null);
  const [isQuotingModalOpen, setIsQuotingModalOpen] = useState<boolean>(false);
  const [isAddLotModalOpen, setIsAddLotModalOpen] = useState<boolean>(false);

  // New lot form state
  const [newMaterial, setNewMaterial] = useState<string>('Printed Circuit Boards (PCB)');
  const [newWeight, setNewWeight] = useState<number>(30);
  const [newValue, setNewValue] = useState<number>(6600);
  const [newLocation, setNewLocation] = useState<string>('Shivajinagar, Pune');

  // Seed DB on mount
  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  // Fetch lots from Dexie
  const dbLots = useLiveQuery(() => db.lots.toArray());

  // Merge sample details with Dexie state
  const activeLots: SampleLotItem[] = INITIAL_SAMPLE_LOTS.map((sample) => {
    const fromDb = dbLots?.find((l) => l.id === sample.id);
    if (fromDb) {
      return {
        ...sample,
        status: fromDb.status as SampleLotItem['status'],
        weightKg: fromDb.estimated_weight_kg,
        estimatedValue: fromDb.estimated_value_inr,
      };
    }
    return sample;
  });

  const filteredLots = activeLots.filter((lot) => {
    const matchesCat =
      selectedCategory === 'ALL' ||
      lot.materialType.toLowerCase() === selectedCategory.toLowerCase();
    const matchesWeight = lot.weightKg >= minWeight;
    return matchesCat && matchesWeight;
  });

  const totalTonnageKg = activeLots.reduce((acc, l) => acc + l.weightKg, 0);
  const totalValuation = activeLots.reduce((acc, l) => acc + l.estimatedValue, 0);

  const handleOpenQuote = (lot: SampleLotItem) => {
    setSelectedLotForQuote(lot);
    setIsQuotingModalOpen(true);
  };

  const handleCreateNewLot = async (e: React.FormEvent) => {
    e.preventDefault();
    const newId = `lot-${Date.now().toString().slice(-4)}`;

    await db.lots.add({
      id: newId,
      status: 'available',
      updated_at: new Date().toISOString(),
      collector_id: 'c-pun-0042',
      material_type: newMaterial,
      estimated_weight_kg: Number(newWeight),
      estimated_value_inr: Number(newValue),
      location_lat: 18.5204 + (Math.random() - 0.5) * 0.08,
      location_lng: 73.8567 + (Math.random() - 0.5) * 0.08,
    });

    setIsAddLotModalOpen(false);
  };

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-8 pb-10 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                <span>CPCB Authorized Recycler Marketplace</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Pune / Mumbai Cluster</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Live E-Waste Feedstock Discovery
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Browse verified scrap lots created by informal collectors. Place direct competitive quotes and schedule doorstep electric-van pickup.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <button
                type="button"
                onClick={() => setIsAddLotModalOpen(true)}
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
              >
                <span>➕</span>
                <span>Simulate New Lot</span>
              </button>
              <div className="px-3.5 py-2 rounded-xl bg-slate-900 border border-slate-800 text-xs font-medium text-slate-300 flex items-center space-x-2">
                <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                <span>IndexedDB Sync Live</span>
              </div>
            </div>
          </div>

          {/* Top KPI Metrics Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Available Lots</span>
              <div className="text-2xl font-black text-white mt-1">{activeLots.length}</div>
              <span className="text-[10px] text-emerald-400 font-semibold">Active in Pune region</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Feedstock Weight</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">{totalTonnageKg.toFixed(1)} kg</div>
              <span className="text-[10px] text-slate-400 font-semibold">Ready for pickup</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Total Estimated Value</span>
              <div className="text-2xl font-black text-blue-400 mt-1">₹{totalValuation.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-slate-400 font-semibold">Fair benchmark valuation</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Authorized Recyclers</span>
              <div className="text-2xl font-black text-purple-400 mt-1">{CPCB_RECYCLERS.length}</div>
              <span className="text-[10px] text-slate-400 font-semibold">CPCB & MPCB licensed</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-8 flex-1">
        {/* Leaflet GIS Spatial Map */}
        <div className="space-y-3">
          <div className="flex items-center justify-between">
            <h3 className="text-lg font-bold text-white flex items-center space-x-2">
              <span>📍</span>
              <span>Spatial Scrap Lot Clusters &amp; Recycler Facilities</span>
            </h3>
            <span className="text-xs text-slate-400">
              Leaflet GIS • High-Precision GPS Clustered
            </span>
          </div>

          <MapWrapper lots={activeLots.map((l) => ({
            id: l.id,
            status: l.status,
            updated_at: l.createdAt,
            collector_id: l.collectorId,
            material_type: l.categoryLabel,
            estimated_weight_kg: l.weightKg,
            estimated_value_inr: l.estimatedValue,
            location_lat: l.lat,
            location_lng: l.lng,
          }))} />
        </div>

        {/* Filter Controls Bar */}
        <div className="p-5 rounded-2xl bg-slate-900 border border-slate-800 flex flex-wrap items-center justify-between gap-4">
          {/* Category Filter Chips */}
          <div className="flex flex-wrap items-center gap-2">
            {['ALL', 'pcb', 'cables', 'batteries', 'crt', 'motors'].map((cat) => {
              const isSelected = selectedCategory === cat;
              return (
                <button
                  key={cat}
                  onClick={() => setSelectedCategory(cat)}
                  className={`px-3.5 py-1.5 rounded-xl text-xs font-bold transition-all ${
                    isSelected
                      ? 'bg-emerald-500 text-slate-950 shadow-md shadow-emerald-500/20'
                      : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
                  }`}
                >
                  {cat === 'ALL' ? 'All Materials' : cat.toUpperCase()}
                </button>
              );
            })}
          </div>

          {/* Min Weight Filter */}
          <div className="flex items-center space-x-2 text-xs">
            <span className="text-slate-400 font-semibold">Min Batch:</span>
            <select
              value={minWeight}
              onChange={(e) => setMinWeight(Number(e.target.value))}
              className="bg-slate-950 border border-slate-800 rounded-xl px-3 py-1.5 text-white font-bold cursor-pointer focus:outline-none"
            >
              <option value={0}>Any Weight</option>
              <option value={20}>&gt; 20 kg</option>
              <option value={50}>&gt; 50 kg</option>
              <option value={100}>&gt; 100 kg</option>
            </select>
          </div>
        </div>

        {/* Lots Grid */}
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h3 className="text-xl font-black text-white">
              Available Feedstock Lots ({filteredLots.length})
            </h3>
            <span className="text-xs text-slate-500">Sorted by Nearest GPS Location</span>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            {filteredLots.map((lot) => {
              const isQuoted = lot.status === 'quoted';
              const isVerified = lot.status === 'verified';

              return (
                <div
                  key={lot.id}
                  className="p-5 rounded-2xl bg-slate-900 border border-slate-800 hover:border-slate-700 transition-all flex flex-col justify-between"
                >
                  <div>
                    {/* Top Row: Ref & Status Badge */}
                    <div className="flex items-start justify-between mb-3">
                      <div>
                        <span className="font-mono text-xs font-bold text-slate-400 block">
                          {lot.lotRef}
                        </span>
                        <h4 className="text-base font-black text-white mt-0.5">
                          {lot.categoryLabel}
                        </h4>
                      </div>
                      <span
                        className={`text-[10px] font-bold px-2.5 py-0.5 rounded-full ${
                          isVerified
                            ? 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
                            : isQuoted
                            ? 'bg-blue-500/20 text-blue-400 border border-blue-500/30'
                            : 'bg-emerald-500/10 text-emerald-400 border border-emerald-500/20'
                        }`}
                      >
                        {lot.status.toUpperCase()}
                      </span>
                    </div>

                    {/* Location & Collector */}
                    <div className="space-y-1 text-xs text-slate-400 mb-4">
                      <div className="flex items-center space-x-1.5">
                        <span>📍</span>
                        <span className="font-semibold text-slate-300">{lot.locationName}</span>
                      </div>
                      <div className="flex items-center space-x-1.5">
                        <span>👤</span>
                        <span>{lot.collectorName} ({lot.collectorPhone})</span>
                      </div>
                    </div>

                    {/* Weight and Valuation Strip */}
                    <div className="p-3 rounded-xl bg-slate-950/70 border border-slate-800 flex justify-between items-center mb-4">
                      <div>
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Weight</span>
                        <span className="text-lg font-black text-white">{lot.weightKg} kg</span>
                      </div>
                      <div className="text-right">
                        <span className="text-[10px] text-slate-500 block uppercase font-bold">Collector Estimate</span>
                        <span className="text-lg font-black text-emerald-400">
                          ₹{lot.estimatedValue.toLocaleString('en-IN')}
                        </span>
                      </div>
                    </div>

                    {/* Hash Provenance Badge */}
                    <div className="flex items-center space-x-2 text-[10px] text-slate-500 font-mono mb-4">
                      <span className="text-emerald-500">🔒</span>
                      <span className="truncate">SHA-256: {lot.sha256Hash}</span>
                    </div>
                  </div>

                  {/* Action Button */}
                  <div>
                    {isVerified ? (
                      <div className="w-full py-2.5 rounded-xl bg-slate-800 text-slate-400 font-bold text-xs text-center">
                        ✓ Handover Completed &amp; Settled
                      </div>
                    ) : (
                      <button
                        type="button"
                        onClick={() => handleOpenQuote(lot)}
                        className="w-full py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-md shadow-emerald-500/20 transition-all"
                      >
                        Submit Purchase Quote ({lot.quotesCount} active bids)
                      </button>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </main>

      {/* Quoting Modal */}
      {selectedLotForQuote && (
        <LotQuotingModal
          lot={selectedLotForQuote}
          isOpen={isQuotingModalOpen}
          onClose={() => setIsQuotingModalOpen(false)}
        />
      )}

      {/* Add New Lot Modal */}
      {isAddLotModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 sm:p-8 max-w-md w-full shadow-2xl relative">
            <button
              onClick={() => setIsAddLotModalOpen(false)}
              className="absolute top-5 right-5 text-slate-400 hover:text-white"
            >
              ✕
            </button>
            <h3 className="text-xl font-bold text-white mb-2">Simulate New Scrap Lot</h3>
            <p className="text-xs text-slate-400 mb-5">
              Simulate an informal waste collector creating a new lot on mobile.
            </p>

            <form onSubmit={handleCreateNewLot} className="space-y-4">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  E-Waste Category:
                </label>
                <select
                  value={newMaterial}
                  onChange={(e) => setNewMaterial(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                >
                  <option value="Printed Circuit Boards (PCB)">Printed Circuit Boards (PCB)</option>
                  <option value="Copper Cables">Copper Cables</option>
                  <option value="Li-ion Batteries">Li-ion Batteries</option>
                  <option value="CRT Monitors">CRT Monitors</option>
                  <option value="Motors & Alternators">Motors &amp; Alternators</option>
                </select>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Weight (kg):</label>
                  <input
                    type="number"
                    min="1"
                    max="1000"
                    value={newWeight}
                    onChange={(e) => setNewWeight(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold text-slate-300 mb-1">Value (₹):</label>
                  <input
                    type="number"
                    min="1"
                    value={newValue}
                    onChange={(e) => setNewValue(Number(e.target.value))}
                    className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">Location:</label>
                <input
                  type="text"
                  value={newLocation}
                  onChange={(e) => setNewLocation(e.target.value)}
                  className="w-full bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs text-white"
                />
              </div>

              <div className="pt-2 flex space-x-2">
                <button
                  type="button"
                  onClick={() => setIsAddLotModalOpen(false)}
                  className="flex-1 py-2.5 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400"
                >
                  Save &amp; Broadcast
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
