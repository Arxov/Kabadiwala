"use client";

import { useLiveQuery } from "dexie-react-hooks";
import { db } from "@/lib/db";
import { useEffect, useState } from "react";
import Link from "next/link";
import dynamic from "next/dynamic";

const LotsMap = dynamic(() => import('@/components/MapWrapper'), { 
  ssr: false, 
  loading: () => <div className="h-[450px] w-full rounded-xl authentic-panel animate-pulse flex items-center justify-center mb-12">Loading Map...</div> 
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
      location_lat: 18.5204 + (Math.random() - 0.5) * 0.15,
      location_lng: 73.8567 + (Math.random() - 0.5) * 0.15,
    };
    await db.lots.add(newLot);
    setIsModalOpen(false);
    setFormData({ material_type: '', estimated_weight_kg: '', estimated_value_inr: '' });
  };

  if (!mounted) return null;

  return (
    <main className="min-h-screen pb-16 font-sans">
      <nav className="sticky top-0 z-50 bg-[#0a0a0a]/90 backdrop-blur-md border-b border-[#262626] px-6 py-4 flex justify-between items-center">
        <div className="flex items-center gap-2">
          <div className="w-6 h-6 bg-[#ededed] rounded-sm flex items-center justify-center">
            <span className="text-[#0a0a0a] font-bold text-xs">K</span>
          </div>
          <h1 className="text-lg font-semibold tracking-tight text-[#ededed]">
            Kabadiwala
          </h1>
        </div>
        <div className="hidden md:flex space-x-8 text-sm font-medium">
          <Link href="/admin" className="text-[#a3a3a3] hover:text-[#ededed] transition-colors">Dashboard</Link>
          <Link href="/" className="text-[#ededed] transition-colors relative">
            Lots Browser
            <span className="absolute -bottom-[19px] left-0 w-full h-[2px] bg-[#ededed]"></span>
          </Link>
          <Link href="/handovers" className="text-[#a3a3a3] hover:text-[#ededed] transition-colors">Handovers</Link>
        </div>
      </nav>

      <div className="max-w-6xl mx-auto px-6 mt-16 animate-fade-in">
        <header className="flex flex-col md:flex-row justify-between items-start md:items-end mb-12 border-b border-[#262626] pb-8">
          <div className="max-w-2xl">
            <h2 className="text-3xl font-semibold mb-3 text-[#ededed] tracking-tight">Available Lots</h2>
            <p className="text-[#a3a3a3] text-base leading-relaxed">
              Explore localized e-waste materials prepared for recycling. Ensure your sync is active to receive real-time updates from field collectors.
            </p>
          </div>
          
          <div className="mt-6 md:mt-0 flex gap-4 items-center">
            <div className="flex items-center gap-2 px-3 py-1.5 rounded bg-[#141414] border border-[#262626] text-xs font-medium text-[#a3a3a3]">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
              Live Sync
            </div>
            <button 
              onClick={() => setIsModalOpen(true)}
              className="authentic-button px-5 py-2 rounded-md text-sm font-medium flex items-center gap-2 shadow-sm"
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 4v16m8-8H4"></path></svg>
              Add Lot
            </button>
          </div>
        </header>
        
        <LotsMap lots={lots || []} />
        
        <div className="mt-16">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-xl font-medium text-[#ededed]">Recent Entries</h3>
            {lots && lots.length > 0 && (
              <span className="text-sm text-[#a3a3a3]">{lots.length} total lots</span>
            )}
          </div>

          {!lots ? (
            <div className="flex justify-center items-center h-40">
              <div className="w-6 h-6 border-2 border-[#262626] border-t-[#ededed] rounded-full animate-spin"></div>
            </div>
          ) : lots.length === 0 ? (
            <div className="authentic-panel p-10 text-center rounded-xl flex flex-col items-center justify-center">
              <p className="text-[#a3a3a3] mb-6 text-sm">The local database is currently empty.</p>
              <div className="flex gap-4">
                <button 
                  onClick={() => setIsModalOpen(true)}
                  className="authentic-button px-5 py-2 rounded-md font-medium text-sm"
                >
                  Create Manual Entry
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
                  className="authentic-button-outline px-5 py-2 rounded-md font-medium text-sm">
                  Populate Demo Data
                </button>
              </div>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
              {lots.map((lot, idx) => (
                <div 
                  key={lot.id} 
                  className="authentic-panel rounded-xl p-5 group flex flex-col justify-between hover:border-[#404040]"
                >
                  <div>
                    <div className="flex justify-between items-start mb-4">
                      <h4 className="text-base font-semibold text-[#ededed] leading-snug">{lot.material_type}</h4>
                      <span className="bg-[#141414] border border-[#262626] text-[#a3a3a3] text-[11px] font-medium px-2 py-1 rounded">
                        {lot.estimated_weight_kg} kg
                      </span>
                    </div>
                    
                    <div className="space-y-2 mb-6">
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#737373]">Value</span>
                        <span className="text-[#ededed] font-medium">₹{lot.estimated_value_inr.toLocaleString()}</span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#737373]">Status</span>
                        <span className="text-[#ededed] capitalize flex items-center gap-1.5">
                          <span className="w-1.5 h-1.5 rounded-full bg-emerald-500"></span>
                          {lot.status.replace('_', ' ')}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-sm">
                        <span className="text-[#737373]">Location</span>
                        <span className="text-[#a3a3a3]">Pune Region</span>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full authentic-button-outline text-xs font-medium py-2.5 rounded-md flex justify-center items-center gap-1.5">
                    Prepare Quote
                    <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14 5l7 7m0 0l-7 7m7-7H3"></path></svg>
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>

      {isModalOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
          <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" onClick={() => setIsModalOpen(false)}></div>
          <div className="authentic-panel p-8 rounded-xl w-full max-w-md relative z-10 shadow-2xl animate-slide-up">
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold text-[#ededed]">New Lot Entry</h3>
              <button onClick={() => setIsModalOpen(false)} className="text-[#737373] hover:text-[#ededed] transition-colors p-1">
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12"></path></svg>
              </button>
            </div>
            
            <form onSubmit={handleAddLot} className="space-y-5">
              <div>
                <label className="block text-xs font-medium text-[#a3a3a3] mb-1.5 uppercase tracking-wide">Material Type</label>
                <input 
                  required
                  type="text" 
                  value={formData.material_type}
                  onChange={e => setFormData({...formData, material_type: e.target.value})}
                  className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-3 py-2 text-sm text-[#ededed] placeholder-[#737373] focus:outline-none focus:border-[#525252] transition-colors"
                  placeholder="e.g. Copper wire, Laptops"
                />
              </div>
              
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-medium text-[#a3a3a3] mb-1.5 uppercase tracking-wide">Weight (kg)</label>
                  <input 
                    required
                    type="number" 
                    min="0.1"
                    step="0.1"
                    value={formData.estimated_weight_kg}
                    onChange={e => setFormData({...formData, estimated_weight_kg: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-3 py-2 text-sm text-[#ededed] placeholder-[#737373] focus:outline-none focus:border-[#525252] transition-colors"
                    placeholder="0.0"
                  />
                </div>
                <div>
                  <label className="block text-xs font-medium text-[#a3a3a3] mb-1.5 uppercase tracking-wide">Value (₹)</label>
                  <input 
                    required
                    type="number" 
                    min="1"
                    value={formData.estimated_value_inr}
                    onChange={e => setFormData({...formData, estimated_value_inr: e.target.value})}
                    className="w-full bg-[#0a0a0a] border border-[#262626] rounded-md px-3 py-2 text-sm text-[#ededed] placeholder-[#737373] focus:outline-none focus:border-[#525252] transition-colors"
                    placeholder="0"
                  />
                </div>
              </div>
              
              <div className="pt-4 border-t border-[#262626] mt-6">
                <button type="submit" className="w-full authentic-button text-sm font-medium py-2.5 rounded-md">
                  Register Entry
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </main>
  );
}
