'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import EPRCertificateModal, { EPRCertificateData } from '@/components/EPRCertificateModal';

interface EPRTransactionRecord {
  certId: string;
  lotRef: string;
  collectorName: string;
  collectorId: string;
  collectorGps: string;
  recyclerName: string;
  recyclerLicense: string;
  category: string;
  weightKg: number;
  criticalMinerals: string[];
  toxinsAverted: string;
  issuedAt: string;
  sha256Hash: string;
  brandPartner: string;
}

const EPR_RECORDS: EPRTransactionRecord[] = [
  {
    certId: 'EPR-2026-MH-99014',
    lotRef: 'LOT-2026-MH-8921',
    collectorName: 'Ramesh Shinde',
    collectorId: 'c-pun-0042',
    collectorGps: '18.5204° N, 73.8567° E (Kasba Peth, Pune)',
    recyclerName: 'EcoMetals CPCB E-Waste Dismantling Hub',
    recyclerLicense: 'CPCB-REG-2023-MH-0842',
    category: 'ITEW1 - High-Yield Server PCBs',
    weightKg: 24.8,
    criticalMinerals: ['Gold (6.2g)', 'Silver (31.0g)', 'Palladium (1.2g)', 'Copper (4.8kg)'],
    toxinsAverted: 'Cyanide and Nitric Acid backyard leaching into city drains',
    issuedAt: '27 Sep 2026, 10:14 IST',
    sha256Hash: 'a7b9c1d3e5f7a9b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0',
    brandPartner: 'Dell India Pvt Ltd (EPR Target)',
  },
  {
    certId: 'EPR-2026-MH-99013',
    lotRef: 'LOT-2026-MH-7714',
    collectorName: 'Sunil Pawar',
    collectorId: 'c-pun-0019',
    collectorGps: '18.4988° N, 73.8182° E (Kothrud, Pune)',
    recyclerName: 'Maharashtra GreenTech Recyclers Pvt Ltd',
    recyclerLicense: 'MPCB-RED-CAT-2024-0012',
    category: 'ITEW3 - Telecommunication Copper Cables',
    weightKg: 58.2,
    criticalMinerals: ['Electrolytic Copper 99.9% (56.8kg)', 'Lead-Free Tin (0.9kg)'],
    toxinsAverted: 'Open-air burning avoided; 12.4 kg dioxin-heavy toxic fumes prevented',
    issuedAt: '26 Sep 2026, 16:30 IST',
    sha256Hash: '4f8a9b2c3d1e5a7f9b8c0d2e4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b',
    brandPartner: 'HP Enterprise India (EPR Fulfillment)',
  },
  {
    certId: 'EPR-2026-MH-99012',
    lotRef: 'LOT-2026-MH-6502',
    collectorName: 'Anil Jadhav',
    collectorId: 'c-pun-0063',
    collectorGps: '18.5312° N, 73.8445° E (Shivajinagar, Pune)',
    recyclerName: 'Swachh Bharat Electronic Recyclers',
    recyclerLicense: 'CPCB-EPR-2025-IND-9910',
    category: 'BWMR2 - Lithium-Ion Battery Packs',
    weightKg: 16.5,
    criticalMinerals: ['Lithium Carbonate (1.1kg)', 'Cobalt (3.3kg)', 'Nickel (2.8kg)'],
    toxinsAverted: 'Thermal runaway fire hazard & toxic cobalt leachate prevented',
    issuedAt: '25 Sep 2026, 11:22 IST',
    sha256Hash: '8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c',
    brandPartner: 'Samsung India Electronics (Battery EPR)',
  },
  {
    certId: 'EPR-2026-MH-99011',
    lotRef: 'LOT-2026-MH-5409',
    collectorName: 'Ganesh Shinde',
    collectorId: 'c-pun-0081',
    collectorGps: '18.5089° N, 73.8644° E (Swargate, Pune)',
    recyclerName: 'EcoMetals CPCB E-Waste Dismantling Hub',
    recyclerLicense: 'CPCB-REG-2023-MH-0842',
    category: 'CEEW1 - CRT Television & Monitor Funnel Glass',
    weightKg: 95.0,
    criticalMinerals: ['Lead Bullion 98% (21.5kg)', 'Barium-Strontium Glass (70.2kg)'],
    toxinsAverted: 'Backyard hammer smashing & lead dust atmospheric dispersal averted',
    issuedAt: '24 Sep 2026, 14:05 IST',
    sha256Hash: '3a5b7c9d1e3f5a7b9c1d3e5f7a9b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b',
    brandPartner: 'Lenovo India Pvt Ltd (E-Waste Compliance)',
  },
];

const PRODUCER_TARGETS = [
  { brand: 'Dell India Pvt Ltd', category: 'ITEW1 (Mainframe/PCBs)', targetMT: 450, fulfilledMT: 392, progress: 87 },
  { brand: 'HP Enterprise India', category: 'ITEW3 (Telecom/Cables)', targetMT: 600, fulfilledMT: 580, progress: 96 },
  { brand: 'Samsung Electronics', category: 'BWMR2 (Li-ion Batteries)', targetMT: 280, fulfilledMT: 245, progress: 87.5 },
  { brand: 'Lenovo India Pvt Ltd', category: 'CEEW1 (Displays/Monitors)', targetMT: 350, fulfilledMT: 310, progress: 88.5 },
];

export default function EPRAuditPage() {
  const [selectedCert, setSelectedCert] = useState<EPRCertificateData | null>(null);
  const [isModalOpen, setIsModalOpen] = useState<boolean>(false);
  const [selectedFilter, setSelectedFilter] = useState<string>('ALL');

  const handleOpenCertificate = (rec: EPRTransactionRecord) => {
    setSelectedCert({
      certificateId: rec.certId,
      lotRef: rec.lotRef,
      collectorName: rec.collectorName,
      collectorId: rec.collectorId,
      collectorGps: rec.collectorGps,
      recyclerName: rec.recyclerName,
      recyclerLicense: rec.recyclerLicense,
      materialCategory: rec.category,
      certifiedWeightKg: rec.weightKg,
      criticalMinerals: rec.criticalMinerals,
      toxinsAverted: rec.toxinsAverted,
      issueDate: rec.issuedAt,
      sha256Hash: rec.sha256Hash,
    });
    setIsModalOpen(true);
  };

  const filteredRecords = selectedFilter === 'ALL'
    ? EPR_RECORDS
    : EPR_RECORDS.filter((r) => r.category.toLowerCase().includes(selectedFilter.toLowerCase()));

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Header */}
      <section className="pt-8 pb-10 border-b border-slate-800 bg-slate-900/40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-2">
                <span>E-Waste (Management) Rules 2022 • Rule 13(1)</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>CPCB End-to-End Traceability</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black text-white tracking-tight">
                Extended Producer Responsibility (EPR) Audit Register
              </h1>
              <p className="text-slate-400 text-sm mt-1 max-w-2xl">
                Cryptographically verifiable chain of custody linking informal collector origin GPS to certified dismantling and hydrometallurgical mineral recovery. Zero phantom credits.
              </p>
            </div>

            <div className="flex items-center space-x-3">
              <Link
                href="/handovers"
                className="px-4 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20 flex items-center space-x-2"
              >
                <span>📲</span>
                <span>Verify Intake QR</span>
              </Link>
            </div>
          </div>

          {/* KPI Strip */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-8">
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">EPR Credits Generated</span>
              <div className="text-2xl font-black text-white mt-1">142,500 kg</div>
              <span className="text-[10px] text-emerald-400 font-semibold">100% CPCB Verified</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Critical Gold Recovered</span>
              <div className="text-2xl font-black text-amber-400 mt-1">3,480 g</div>
              <span className="text-[10px] text-slate-400 font-semibold">99.8% pure bullion</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Battery Lithium Recovered</span>
              <div className="text-2xl font-black text-cyan-400 mt-1">1,240 kg</div>
              <span className="text-[10px] text-slate-400 font-semibold">Battery grade Li2CO3</span>
            </div>
            <div className="p-4 rounded-2xl bg-slate-900/80 border border-slate-800">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Backyard Cyanide Averted</span>
              <div className="text-2xl font-black text-rose-400 mt-1">4,820 L</div>
              <span className="text-[10px] text-slate-400 font-semibold">Zero water pollution</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Area */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 space-y-12 flex-1">

        {/* Brand / Producer EPR Obligation Tracking */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-blue-500/10 border border-blue-500/20 text-blue-400 text-xs font-semibold mb-2">
                <span>Producer EPR Compliance Fulfillment</span>
                <span className="w-1.5 h-1.5 rounded-full bg-blue-400" />
                <span>Financial Year 2026-27</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Electronics Brand EPR Target Fulfillments
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Major producers purchasing formalized scrap feedstock credits to meet mandatory CPCB EPR recycling quotas.
              </p>
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6">
            {PRODUCER_TARGETS.map((p, idx) => (
              <div key={idx} className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 flex flex-col justify-between">
                <div>
                  <span className="text-xs font-bold text-slate-400 block">{p.brand}</span>
                  <span className="text-[11px] text-emerald-400 font-mono block mt-0.5">{p.category}</span>
                  <div className="flex justify-between items-baseline mt-4">
                    <span className="text-xl font-black text-white">{p.fulfilledMT} MT</span>
                    <span className="text-xs text-slate-500">Target: {p.targetMT} MT</span>
                  </div>
                </div>

                <div className="mt-4">
                  <div className="flex justify-between text-[11px] font-bold mb-1">
                    <span className="text-slate-400">CPCB Target Achieved:</span>
                    <span className="text-emerald-400">{p.progress}%</span>
                  </div>
                  <div className="h-2 w-full bg-slate-800 rounded-full overflow-hidden">
                    <div
                      className="h-full bg-emerald-500 rounded-full transition-all"
                      style={{ width: `${p.progress}%` }}
                    />
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Chain-of-Custody Provenance Table */}
        <section className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
            <div>
              <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
                <span>Immutable Proof-of-Recycling</span>
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
                <span>SPCB Audited</span>
              </div>
              <h3 className="text-2xl font-black text-white tracking-tight">
                Traceable Chain of Custody &amp; Certificate Registry
              </h3>
              <p className="text-slate-400 text-sm mt-1">
                Every kilogram of feedstock is anchored to its informal collector source node with SHA-256 digital seals.
              </p>
            </div>

            {/* Filter */}
            <div className="flex items-center space-x-2 bg-slate-950 border border-slate-800 rounded-xl px-3 py-2 text-xs">
              <span className="text-slate-400 font-medium">Filter Stream:</span>
              <select
                value={selectedFilter}
                onChange={(e) => setSelectedFilter(e.target.value)}
                className="bg-transparent text-white font-bold focus:outline-none cursor-pointer"
              >
                <option value="ALL" className="bg-slate-900 text-white">All Streams</option>
                <option value="PCB" className="bg-slate-900 text-amber-400">Server PCBs (Gold/Pd)</option>
                <option value="Cables" className="bg-slate-900 text-blue-400">Copper Cables</option>
                <option value="Battery" className="bg-slate-900 text-cyan-400">Li-ion Batteries</option>
                <option value="CRT" className="bg-slate-900 text-rose-400">CRT Glass (Lead)</option>
              </select>
            </div>
          </div>

          <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 mt-6">
            <table className="w-full text-left text-xs text-slate-300">
              <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
                <tr>
                  <th className="py-3 px-4">Certificate ID &amp; Lot</th>
                  <th className="py-3 px-3">Collector Origin (Node)</th>
                  <th className="py-3 px-3">Certified Recycler</th>
                  <th className="py-3 px-3">Material &amp; Minerals</th>
                  <th className="py-3 px-3">Weight</th>
                  <th className="py-3 px-3">Brand Obligation</th>
                  <th className="py-3 px-4 text-right">Official Document</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-800/60">
                {filteredRecords.map((item) => (
                  <tr key={item.certId} className="hover:bg-slate-900/40 transition-colors">
                    <td className="py-4 px-4 font-mono">
                      <span className="text-emerald-400 font-bold block">{item.certId}</span>
                      <span className="text-slate-400 text-[11px]">{item.lotRef}</span>
                      <span className="text-slate-500 text-[10px] block mt-0.5">{item.issuedAt}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white font-bold block">{item.collectorName}</span>
                      <span className="text-slate-400 text-[11px] block">{item.collectorId}</span>
                      <span className="text-slate-500 font-mono text-[10px]">{item.collectorGps}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white font-semibold block">{item.recyclerName}</span>
                      <span className="text-slate-500 text-[10px] font-mono">{item.recyclerLicense}</span>
                    </td>
                    <td className="py-4 px-3">
                      <span className="text-white font-bold block">{item.category}</span>
                      <span className="text-emerald-400 text-[11px] font-semibold block mt-0.5">
                        {item.criticalMinerals.slice(0, 2).join(' • ')}
                      </span>
                    </td>
                    <td className="py-4 px-3 font-mono">
                      <span className="text-white font-black text-sm block">{item.weightKg} kg</span>
                      <span className="text-[10px] text-slate-500">Certified Net</span>
                    </td>
                    <td className="py-4 px-3 text-[11px]">
                      <span className="text-slate-300 font-medium">{item.brandPartner}</span>
                    </td>
                    <td className="py-4 px-4 text-right">
                      <button
                        type="button"
                        onClick={() => handleOpenCertificate(item)}
                        className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-bold text-xs shadow-md shadow-emerald-500/20"
                      >
                        Print CPCB Cert
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* E-Waste Rules 2022 Legal Architecture Card */}
        <section className="p-8 rounded-3xl bg-slate-900/60 border border-slate-800">
          <div className="max-w-3xl mb-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              Regulatory Framework Architecture
            </span>
            <h3 className="text-2xl font-black text-white tracking-tight mt-1">
              How Kabadiwala Connect Fully Complies with E-Waste Rules 2022
            </h3>
            <p className="text-slate-400 text-sm mt-1">
              Under the revised gazette notification, informal channel formalization is recognized as the foundational tier for producer EPR compliance.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-xs text-slate-300">
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-emerald-400 font-bold text-sm mb-2">Rule 4 &amp; 5: Producer EPR Mandates</div>
              <p className="text-slate-400 leading-relaxed">
                Electronics manufacturers must procure certified recycling certificates through formal online portals. Kabadiwala Connect provides audited provenance ensuring producers never purchase fraudulent paper certificates.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-cyan-400 font-bold text-sm mb-2">Rule 13: Recycler Verification</div>
              <p className="text-slate-400 leading-relaxed">
                Authorized recyclers must account for material mass balance (feedstock weight in = dismantled streams out). Geofenced dual handshakes verify physical delivery at the facility gate.
              </p>
            </div>
            <div className="p-5 rounded-2xl bg-slate-950 border border-slate-800">
              <div className="text-amber-400 font-bold text-sm mb-2">Battery Waste Rules 2022</div>
              <p className="text-slate-400 leading-relaxed">
                Requires mandatory recovery of battery-grade Lithium (Au, Co, Ni) with strict prohibitions against acid bath leaching. Certified recyclers receive intact insulated battery packs directly.
              </p>
            </div>
          </div>
        </section>

      </main>

      {/* Official Certificate Modal */}
      {selectedCert && (
        <EPRCertificateModal
          data={selectedCert}
          isOpen={isModalOpen}
          onClose={() => setIsModalOpen(false)}
        />
      )}
    </div>
  );
}
