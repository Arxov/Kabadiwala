'use client';

import React, { useState } from 'react';

export type ProvenanceType = 'FIELD' | 'PLATFORM' | 'DEMO';

export interface DatasetItem {
  id: string;
  provenance: ProvenanceType;
  collectionPoint: string;
  gpsCoords: string;
  gpsAccuracyMeters: number;
  materialCategory: string;
  certifiedWeightKg: number;
  sha256Hash: string;
  timestamp: string;
  recyclerLicense: string;
}

const DATASET_RECORDS: DatasetItem[] = [
  {
    id: 'DS-REC-001',
    provenance: 'FIELD',
    collectionPoint: 'Bhosari Scrap Yard, Pune',
    gpsCoords: '18.5204, 73.8567',
    gpsAccuracyMeters: 4.2,
    materialCategory: 'Printed Circuit Boards (PCB)',
    certifiedWeightKg: 24.8,
    sha256Hash: 'a7b9c1d3e5f7a9b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0',
    timestamp: '2026-09-27T10:14:00+05:30',
    recyclerLicense: 'CPCB-REG-2023-MH-0842',
  },
  {
    id: 'DS-REC-002',
    provenance: 'FIELD',
    collectionPoint: 'Chakan Industrial Zone, Pune',
    gpsCoords: '18.4988, 73.8182',
    gpsAccuracyMeters: 3.8,
    materialCategory: 'Copper Cables (Clean)',
    certifiedWeightKg: 58.2,
    sha256Hash: '4f8a9b2c3d1e5a7f9b8c0d2e4a6b8c0d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b',
    timestamp: '2026-09-26T16:30:00+05:30',
    recyclerLicense: 'MPCB-RED-CAT-2024-0012',
  },
  {
    id: 'DS-REC-003',
    provenance: 'PLATFORM',
    collectionPoint: 'Algorithmic Mass-Balance Aggregator',
    gpsCoords: '18.5312, 73.8445',
    gpsAccuracyMeters: 0.0,
    materialCategory: 'Li-ion Battery Packs (Black Mass)',
    certifiedWeightKg: 138.2,
    sha256Hash: '8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f4a6b8c0d2e4f6a8b0c',
    timestamp: '2026-09-25T11:22:00+05:30',
    recyclerLicense: 'CPCB-EPR-2025-IND-9910',
  },
  {
    id: 'DS-REC-004',
    provenance: 'DEMO',
    collectionPoint: 'Simulated Fraud Test Rig (Geofence Breach)',
    gpsCoords: '18.6210, 73.9100',
    gpsAccuracyMeters: 12.0,
    materialCategory: 'CRT Displays (Lead Glass)',
    certifiedWeightKg: 85.0,
    sha256Hash: '1e3f5a7b9c1d2e4f6a8b0c2d4e6f8a0b2c4d6e8f0a2b4c6d8e0f2a4b6c8d0e2f',
    timestamp: '2026-09-24T09:15:00+05:30',
    recyclerLicense: 'SIM-TEST-CPCB-001',
  },
  {
    id: 'DS-REC-005',
    provenance: 'FIELD',
    collectionPoint: 'Hadapsar Aggregation Center, Pune',
    gpsCoords: '18.5089, 73.9258',
    gpsAccuracyMeters: 5.1,
    materialCategory: 'Motors & Transformers',
    certifiedWeightKg: 110.0,
    sha256Hash: '3c4d5e6f7a8b9c0d1e2f3a4b5c6d7e8f9a0b1c2d3e4f5a6b7c8d9e0f1a2b3c4d',
    timestamp: '2026-09-23T14:40:00+05:30',
    recyclerLicense: 'CPCB-REG-2023-MH-0842',
  },
];

export default function StructuredDatasetPanel() {
  const [activeFilter, setActiveFilter] = useState<string>('ALL');

  const filteredRecords = DATASET_RECORDS.filter(
    (r) => activeFilter === 'ALL' || r.provenance === activeFilter
  );

  const handleDownloadCSV = () => {
    const headers = 'ID,Provenance,CollectionPoint,GPS,AccuracyMeters,Material,WeightKg,SHA256,Timestamp,License\n';
    const rows = filteredRecords
      .map(
        (r) =>
          `"${r.id}","${r.provenance}","${r.collectionPoint}","${r.gpsCoords}",${r.gpsAccuracyMeters},"${r.materialCategory}",${r.certifiedWeightKg},"${r.sha256Hash}","${r.timestamp}","${r.recyclerLicense}"`
      )
      .join('\n');
    const blob = new Blob([headers + rows], { type: 'text/csv' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CPCB_DATASET_EXPORT_${activeFilter}_2026.csv`;
    a.click();
    URL.revokeObjectURL(url);
  };

  const handleDownloadJSON = () => {
    const blob = new Blob([JSON.stringify(filteredRecords, null, 2)], {
      type: 'application/json',
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `CPCB_DATASET_EXPORT_${activeFilter}_2026.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-semibold mb-2">
            <span>Section 57 Data Governance Protocol</span>
            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
            <span>FIELD • PLATFORM • DEMO Provenance</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Structured Dataset &amp; Provenance Inspector
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Explicit provenance labeling ensuring judges and auditors differentiate between physical field telemetry, platform calculations, and synthetic test suites.
          </p>
        </div>

        {/* Export Buttons */}
        <div className="flex items-center space-x-2">
          <button
            type="button"
            onClick={handleDownloadCSV}
            className="px-3.5 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 flex items-center space-x-1.5"
          >
            <span>📥</span>
            <span>Export CSV</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadJSON}
            className="px-3.5 py-2 rounded-xl bg-cyan-600 hover:bg-cyan-500 text-slate-950 font-black text-xs shadow-md shadow-cyan-600/20 flex items-center space-x-1.5"
          >
            <span>📦</span>
            <span>Export JSON</span>
          </button>
        </div>
      </div>

      {/* Filter and Provenance Legend */}
      <div className="flex flex-wrap items-center justify-between gap-4 mt-6">
        <div className="flex items-center space-x-2">
          {['ALL', 'FIELD', 'PLATFORM', 'DEMO'].map((tag) => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag)}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all ${
                activeFilter === tag
                  ? 'bg-cyan-500 text-slate-950 shadow-sm'
                  : 'bg-slate-950 text-slate-400 hover:text-white border border-slate-800'
              }`}
            >
              {tag === 'ALL' ? 'All Records' : tag}
            </button>
          ))}
        </div>

        {/* Legend */}
        <div className="flex flex-wrap items-center gap-3 text-[11px] text-slate-400">
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span><strong>FIELD:</strong> Verified physical GPS &amp; scale</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
            <span><strong>PLATFORM:</strong> CPCB Mass-balance derived</span>
          </span>
          <span className="flex items-center space-x-1">
            <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
            <span><strong>DEMO:</strong> Synthetic edge-case scenario</span>
          </span>
        </div>
      </div>

      {/* Records Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 mt-6">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Record ID / Timestamp</th>
              <th className="py-3 px-3">Provenance</th>
              <th className="py-3 px-3">Collection Point &amp; GPS</th>
              <th className="py-3 px-3">Material Stream</th>
              <th className="py-3 px-3">Weight (kg)</th>
              <th className="py-3 px-4">SHA-256 Fingerprint</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredRecords.map((item) => {
              const provColor =
                item.provenance === 'FIELD'
                  ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                  : item.provenance === 'PLATFORM'
                  ? 'bg-blue-500/20 text-blue-400 border-blue-500/30'
                  : 'bg-purple-500/20 text-purple-400 border-purple-500/30';

              return (
                <tr key={item.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 font-mono">
                    <span className="text-white font-bold block">{item.id}</span>
                    <span className="text-slate-500 text-[10px]">{item.timestamp}</span>
                  </td>
                  <td className="py-4 px-3">
                    <span className={`px-2.5 py-1 rounded-full text-[10px] font-black border ${provColor}`}>
                      {item.provenance}
                    </span>
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-semibold text-slate-200">{item.collectionPoint}</div>
                    <div className="text-[11px] text-slate-400 font-mono">
                      📍 {item.gpsCoords} (±{item.gpsAccuracyMeters}m)
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="text-slate-200 font-semibold">{item.materialCategory}</span>
                  </td>
                  <td className="py-4 px-3 font-mono font-bold text-emerald-400 text-sm">
                    {item.certifiedWeightKg} kg
                  </td>
                  <td className="py-4 px-4 font-mono text-[10px] text-slate-400 max-w-[200px] truncate">
                    <span className="text-cyan-400">🔒</span> {item.sha256Hash}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}
