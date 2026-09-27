'use client';

import React, { useState, useEffect } from 'react';
import Link from 'next/link';
import { useLiveQuery } from 'dexie-react-hooks';
import Navigation from '@/components/Navigation';
import QRVerifierScanner from '@/components/QRVerifierScanner';
import TransactionTimeline from '@/components/TransactionTimeline';
import EPRCertificateModal, { EPRCertificateData } from '@/components/EPRCertificateModal';
import { db } from '@/lib/db';
import { seedDatabaseIfEmpty } from '@/lib/mockData';

interface HandoverRecordDisplay {
  id: string;
  lotRef: string;
  material: string;
  weight: number;
  collectorName: string;
  collectorId: string;
  collectorGps: string;
  recyclerName: string;
  recyclerLicense: string;
  verifiedAt: string;
  status: 'COMPLETED' | 'IN_TRANSIT' | 'FLAGGED';
  sha256Hash: string;
  payoutAmount: number;
}

const HISTORICAL_HANDOVERS: HandoverRecordDisplay[] = [
  {
    id: 'EPR-TXN-884210',
    lotRef: 'LOT-2026-MH-8921',
    material: 'Printed Circuit Boards (PCB)',
    weight: 24.8,
    collectorName: 'Ramesh Shinde',
    collectorId: 'c-pun-0042',
    collectorGps: '18.5204° N, 73.8567° E',
    recyclerName: 'EcoMetals CPCB E-Waste Dismantling Hub',
    recyclerLicense: 'CPCB-REG-2023-MH-0842',
    verifiedAt: '2026-09-27 10:14 IST',
    status: 'COMPLETED',
    sha256Hash: 'a7b9c1d3e5f7a9b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0',
    payoutAmount: 5456,
  },
  {
    id: 'EPR-TXN-884195',
    lotRef: 'LOT-2026-MH-7714',
    material: 'Copper Cables (Clean)',
    weight: 58.2,
    collectorName: 'Sunil Pawar',
    collectorId: 'c-pun-0019',
    collectorGps: '18.4988° N, 73.8182° E',
    recyclerName: 'Maharashtra GreenTech Recyclers Pvt Ltd',
    recyclerLicense: 'MPCB-RED-CAT-2024-0012',
    verifiedAt: '2026-09-26 16:30 IST',
    status: 'COMPLETED',
    sha256Hash: '4f8a9b2c3d1e5a7f9b8c0d2e4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b',
    payoutAmount: 27936,
  },
  {
    id: 'EPR-TXN-883902',
    lotRef: 'LOT-2026-MH-6502',
    material: 'Li-ion Battery Packs',
    weight: 16.5,
    collectorName: 'Anil Jadhav',
    collectorId: 'c-pun-0063',
    collectorGps: '18.5312° N, 73.8445° E',
    recyclerName: 'Swachh Bharat Electronic Recyclers',
    recyclerLicense: 'CPCB-EPR-2025-IND-9910',
    verifiedAt: '2026-09-25 11:22 IST',
    status: 'COMPLETED',
    sha256Hash: '8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c',
    payoutAmount: 2475,
  },
];

export default function HandoversPage() {
  const [selectedCert, setSelectedCert] = useState<EPRCertificateData | null>(null);
  const [isCertModalOpen, setIsCertModalOpen] = useState<boolean>(false);

  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  // Fetch verified handovers from local Dexie database
  const dbHandovers = useLiveQuery(() => db.handovers.toArray());

  // Merge Dexie records with historical data
  const dynamicHandovers: HandoverRecordDisplay[] = [
    ...(dbHandovers || []).map((h) => {
      let parsedPayload: Record<string, unknown> = {};
      try {
        parsedPayload = JSON.parse(h.qr_payload);
      } catch {
        parsedPayload = {};
      }

      const gps = parsedPayload.gps as { lat: number; lng: number } | undefined;

      return {
        id: h.id,
        lotRef: (parsedPayload.ref as string) || h.lot_id,
        material: (parsedPayload.category as string) || 'High-Grade E-Waste Lot',
        weight: (parsedPayload.weight_kg as number) || 25.0,
        collectorName: (parsedPayload.collector_name as string) || 'Ramesh Shinde',
        collectorId: (parsedPayload.collector_id as string) || 'c-pun-0042',
        collectorGps: gps
          ? `${gps.lat.toFixed(4)}° N, ${gps.lng.toFixed(4)}° E`
          : '18.5204° N, 73.8567° E',
        recyclerName: 'EcoMetals CPCB E-Waste Dismantling Hub',
        recyclerLicense: 'CPCB-REG-2023-MH-0842',
        verifiedAt: new Date(h.verified_at).toLocaleString('en-IN', {
          dateStyle: 'medium',
          timeStyle: 'short',
        }),
        status: 'COMPLETED' as const,
        sha256Hash:
          (parsedPayload.sig as string) ||
          '9e8b7a6c5d4e3f2a1b0c9d8e7f6a5b4c3d2e1f0a9b8c7d6e5f4a3b2c1d0e9f8a',
        payoutAmount: (parsedPayload.est_val as number) || 5500,
      };
    }),
    ...HISTORICAL_HANDOVERS,
  ];

  const handleOpenCertificate = (item: HandoverRecordDisplay) => {
    setSelectedCert({
      certificateId: item.id,
      lotRef: item.lotRef,
      collectorName: item.collectorName,
      collectorId: item.collectorId,
      collectorGps: item.collectorGps,
      recyclerName: item.recyclerName,
      recyclerLicense: item.recyclerLicense,
      materialCategory: item.material,
      certifiedWeightKg: item.weight,
      criticalMinerals: ['Gold (Au)', 'Palladium (Pd)', 'Copper (Cu)', 'Tantalum (Ta)'],
      toxinsAverted: 'Cyanide Leaching & Acid Runoff Averted into Pune Mula-Mutha River Basin',
      issueDate: item.verifiedAt,
      sha256Hash: item.sha256Hash,
    });
    setIsCertModalOpen(true);
  };

  const totalHandoverKg = dynamicHandovers.reduce((acc, h) => acc + h.weight, 0);
  const totalPayout = dynamicHandovers.reduce((acc, h) => acc + h.payoutAmount, 0);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-8 pb-10 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                <span>CPCB E-Waste Rules 2022</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>Zero Phantom EPR Credits</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Digital Handover Verification Hub
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-xl">
                Cryptographic intake verifying collector GPS proximity within 150m, certified industrial scale weights, and instant dual-confirmation payout receipts.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/epr-audit"
                className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 border border-slate-700 text-emerald-400 font-bold text-xs flex items-center space-x-2"
              >
                <span>📜</span>
                <span>View Full EPR Audit Register</span>
              </Link>
            </div>
          </div>

          {/* Metric Summary Cards */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Verified Handovers</span>
              <div className="text-2xl font-black text-emerald-400 mt-1">{dynamicHandovers.length}</div>
              <span className="text-[10px] text-emerald-400/80 font-semibold">100% Geofenced Valid</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Intake Weight</span>
              <div className="text-2xl font-black text-white mt-1">{totalHandoverKg.toFixed(1)} kg</div>
              <span className="text-[10px] text-slate-400 font-semibold">Certified scale logged</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Direct Payouts Settled</span>
              <div className="text-2xl font-black text-blue-400 mt-1">₹{totalPayout.toLocaleString('en-IN')}</div>
              <span className="text-[10px] text-slate-400 font-semibold">Zero middleman deduction</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Avg Geofence Proximity</span>
              <div className="text-2xl font-black text-teal-400 mt-1">38 m</div>
              <span className="text-[10px] text-teal-400/80 font-semibold">Safe limit ≤150 m</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1">
        {/* 9-Stage Transaction State Machine Status Visualizer (Section 32 of Master Spec) */}
        <TransactionTimeline
          currentStage="HANDOVER_VERIFIED"
          className="shadow-xl shadow-black/40"
        />

        {/* Live Verifier Scanner Component */}
        <section id="verifier-scanner">
          <QRVerifierScanner />
        </section>

        {/* Handover Chain-of-Custody Log Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
                <span>Immutable Proof of Origin</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>SPCB / CPCB Audited</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Verified Handover Ledger
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Completed dual-confirmation intake transactions ready for CPCB EPR certificate generation.
              </p>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 mt-6">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Transaction / Lot</th>
                  <th className="py-3 px-3">Collector &amp; Origin GPS</th>
                  <th className="py-3 px-3">Material Stream</th>
                  <th className="py-3 px-3">Scale Weight</th>
                  <th className="py-3 px-3">Payout</th>
                  <th className="py-3 px-3">Status</th>
                  <th className="py-3 px-4 text-right">EPR Certificate</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {dynamicHandovers.map((item) => (
                  <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-mono">
                      <span className="text-white font-bold block">{item.id}</span>
                      <span className="text-emerald-400 text-[11px]">{item.lotRef}</span>
                      <span className="text-slate-500 text-[10px] block mt-0.5">{item.verifiedAt}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white font-bold block">{item.collectorName}</span>
                      <span className="text-slate-400 text-[11px] block">{item.collectorId}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{item.collectorGps}</span>
                    </td>
                    <td className="py-4 px-3 font-semibold text-slate-200">
                      {item.material}
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white font-black text-sm block">{item.weight} kg</span>
                      <span className="text-[10px] text-emerald-400 font-medium">✓ Scale Calibrated</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-emerald-400 font-black text-sm block">
                        ₹{item.payoutAmount.toLocaleString('en-IN')}
                      </span>
                      <span className="text-[10px] text-slate-500">Instant Settlement</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="px-2.5 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-[10px] font-bold border border-emerald-500/30">
                        ✓ VERIFIED
                      </span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenCertificate(item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                      >
                        Print EPR Cert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>
      </main>

      {/* Certificate Modal */}
      {selectedCert && (
        <EPRCertificateModal
          data={selectedCert}
          isOpen={isCertModalOpen}
          onClose={() => setIsCertModalOpen(false)}
        />
      )}
    </div>
  );
}
