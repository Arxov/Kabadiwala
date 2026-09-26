"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LotsMap = dynamic(() => import('@/components/MapWrapper'), { 
  ssr: false, 
  loading: () => <div className="h-[450px] w-full rounded-2xl glass-panel animate-pulse flex items-center justify-center mb-12 border border-slate-700/50">Loading Map...</div> 
});

export default function Home() {
  const lots = useLiveQuery(() => db.lots.toArray());
  const [mounted, setMounted] = useState(false);

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [formData, setFormData] = useState({ material_type: '', estimated_weight_kg: '', estimated_value_inr: '' });

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
      // Randomize location around Pune slightly
      location_lat: 18.5204 + (Math.random() - 0.5) * 0.15,
      location_lng: 73.8567 + (Math.random() - 0.5) * 0.15,
    };
    await db.lots.add(newLot);
    setIsModalOpen(false);
    setFormData({ material_type: '', estimated_weight_kg: '', estimated_value_inr: '' });
  };

  if (!mounted) return null; // Prevent hydration mismatch

  return (
    <main className="min-h-screen text-slate-200 pb-12 relative">
      <nav className="glass-header sticky top-0 z-50 px-6 py-4 flex justify-between items-center">
        <h1 className="text-2xl font-bold tracking-tight text-gradient">
          E-Waste Connect
        </h1>
        <div className="hidden md:flex space-x-6 text-sm font-medium">
          <Link href="/admin" className="text-emerald-400 hover:text-emerald-300 transition">Dashboard</Link>
          <Link href="/" className="text-white font-semibold transition border-b-2 border-emerald-500 pb-1">Lots Browser</Link>
          <Link href="/handovers" className="text-slate-300 hover:text-white transition">Handovers</Link>
        </div>
      </nav>

      <div className="max-w-7xl mx-auto px-6 mt-12 animate-slide-up">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-10">
          <div>
            <h2 className="text-4xl font-extrabold mb-2 text-white tracking-tight">Available Lots</h2>
            <p className="text-slate-400 text-lg">Browse nearby materials ready for recycling</p>
          </div>
          
          <div className="mt-4 md:mt-0 flex gap-4 items-center">
            <button 
              onClick={() => setIsModalOpen(true)}
              className="glass-button px-5 py-2.5 rounded-full text-sm font-bold text-white flex items-center gap-2 shadow-lg"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Add New Lot
            </button>
            <div className="glass-panel px-4 py-2.5 rounded-full text-sm font-medium flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse"></span>
              Live Sync Active
            </div>
          </div>
        </div>
        
        {/* Always render map, even if empty, for better UI feel */}
        <LotsMap lots={lots || []} />
        
        {!lots ? (
          <div className="flex justify-center items-center h-64">
            <div className="w-10 h-10 border-4 border-emerald-500 border-t-transparent rounded-full animate-spin"></div>
          </div>
        ) : lots.length === 0 ? (
          <div className="glass-panel p-12 text-center rounded-2xl flex flex-col items-center justify-center">
            <svg className="w-16 h-16 text-slate-500 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 11H5m14 0a2 2 0 012 2v6a2 2 0 01-2 2H5a2 2 0 01-2-2v-6a2 2 0 012-2m14 0V9a2 2 0 00-2-2M5 11V9a2 2 0 002-2m0 0V5a2 2 0 012-2h6a2 2 0 012 2v2M7 7h10"></path></svg>
            <h3 className="text-xl font-semibold text-white mb-2">No lots available</h3>
            <p className="text-slate-400">There are no materials in your area at the moment. Try syncing.</p>
            <div className="flex gap-4 mt-6">
              <button 
                onClick={() => setIsModalOpen(true)}
                className="glass-button px-6 py-2 rounded-lg font-medium text-white shadow-lg"
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
                className="bg-slate-800 hover:bg-slate-700 border border-slate-600 px-6 py-2 rounded-lg font-medium text-white transition">
                Load SIH Demo Data
              </button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {lots.map((lot, idx) => (
              <div 
                key={lot.id} 
                className="glass-panel rounded-2xl p-6 relative overflow-hidden group hover:-translate-y-1 transition-transform duration-300"
                style={{ animationDelay: `${idx * 100}ms` }}
              >
                {/* Decorative gradient orb */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-emerald-500/20 rounded-full blur-3xl group-hover:bg-emerald-500/30 transition duration-500"></div>
                
                <div className="relative z-10">
                  <div className="flex justify-between items-start mb-5">
                    <div>
                      <h3 className="text-2xl font-bold text-white mb-1">{lot.material_type}</h3>
                      <p className="text-emerald-400 text-sm font-medium">Local Collector • Pune</p>
                    </div>
                    <span className="glass-panel border-emerald-500/30 bg-emerald-500/10 text-emerald-300 text-xs font-bold px-3 py-1.5 rounded-full">
                      {lot.estimated_weight_kg} kg
                    </span>
                  </div>
                  
                  <div className="space-y-3 mb-8">
                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                      <span className="text-slate-400 text-sm">Estimated Value</span>
                      <span className="text-white font-semibold">₹{lot.estimated_value_inr.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between items-center border-b border-slate-700/50 pb-3">
                      <span className="text-slate-400 text-sm">Status</span>
                      <span className="text-slate-200 capitalize">{lot.status.replace('_', ' ')}</span>
                    </div>
                  </div>
                  
                  <button className="w-full glass-button text-white font-semibold py-3.5 rounded-xl shadow-lg flex justify-center items-center gap-2">
                    <span>Prepare Quote</span>
                    <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path></svg>
                  </button>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>

      {/* Add Lot Modal */}
      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-slate-900/80 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="glass-panel p-8 rounded-2xl w-full max-w-md relative z-10 animate-slide-up border border-slate-700 shadow-2xl">
            <button onClick={() => setIsModalOpen(false)} className="absolute top-4 right-4 text-slate-400 hover:text-white transition">
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
            </button>
            <h3 className="text-2xl font-bold text-white mb-6">Create New Lot</h3>
            
            <form onSubmit={handleAddLot} className="space-y-5">
              <div>
                <label className="block text-sm font-medium text-slate-300 mb-1">Material Type</label>
                <input 
                  required
                  type="text" 
                  value={formData.material_type}
                  onChange={e => setFormData({...formData, material_type: e.target.value})}
                  className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                  placeholder="e.g. Copper wire, Laptops"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Weight (kg)</label>
                  <input 
                    required
                    type="number" 
                    min="0.1"
                    step="0.1"
                    value={formData.estimated_weight_kg}
                    onChange={e => setFormData({...formData, estimated_weight_kg: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-300 mb-1">Value (₹)</label>
                  <input 
                    required
                    type="number" 
                    min="1"
                    value={formData.estimated_value_inr}
                    onChange={e => setFormData({...formData, estimated_value_inr: e.target.value})}
                    className="w-full bg-slate-800/50 border border-slate-600 rounded-lg px-4 py-2.5 text-white placeholder-slate-500 focus:outline-none focus:border-emerald-500 focus:ring-1 focus:ring-emerald-500 transition"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="pt-2">
                <button type="submit" className="w-full glass-button text-white font-bold py-3 rounded-xl shadow-lg">
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
