'use client';

import React from 'react';

export interface EPRCertificateData {
  certificateId: string;
  lotRef: string;
  collectorName: string;
  collectorId: string;
  collectorGps: string;
  recyclerName: string;
  recyclerLicense: string;
  materialCategory: string;
  certifiedWeightKg: number;
  criticalMinerals: string[];
  toxinsAverted: string;
  issueDate: string;
  sha256Hash: string;
}

interface EPRCertificateModalProps {
  data: EPRCertificateData;
  isOpen: boolean;
  onClose: () => void;
}

export default function EPRCertificateModal({
  data,
  isOpen,
  onClose,
}: EPRCertificateModalProps) {
  if (!isOpen) return null;

  const handlePrint = () => {
    if (typeof window !== 'undefined') {
      window.print();
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/85 backdrop-blur-md overflow-y-auto">
      <div className="bg-slate-900 border border-slate-700 rounded-3xl max-w-2xl w-full p-6 sm:p-8 shadow-2xl relative my-8">
        {/* Modal Top Bar */}
        <div className="flex justify-between items-center pb-4 border-b border-slate-800">
          <div className="flex items-center space-x-2">
            <span className="w-2.5 h-2.5 rounded-full bg-emerald-400" />
            <span className="text-xs font-bold uppercase tracking-wider text-emerald-400">
              CPCB E-Waste Rules 2022 Digital Certificate
            </span>
          </div>
          <div className="flex items-center space-x-2">
            <button
              onClick={handlePrint}
              className="px-3 py-1.5 rounded-lg bg-emerald-500 hover:bg-emerald-400 text-slate-950 text-xs font-bold flex items-center space-x-1.5 shadow-md shadow-emerald-500/20"
            >
              <span>🖨️</span>
              <span>Print / Download</span>
            </button>
            <button
              onClick={onClose}
              className="p-1.5 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
            >
              ✕
            </button>
          </div>
        </div>

        {/* Certificate Printable Canvas */}
        <div className="mt-6 p-6 sm:p-8 rounded-2xl bg-white text-slate-900 shadow-inner relative border-4 border-double border-slate-300">
          {/* Official Emblem / Header */}
          <div className="text-center pb-6 border-b-2 border-slate-900/80">
            <div className="inline-block px-3 py-1 rounded bg-slate-100 border border-slate-300 text-[10px] font-black uppercase tracking-widest text-slate-700 mb-2">
              Government of India • Ministry of Environment, Forest & Climate Change
            </div>
            <h2 className="text-xl sm:text-2xl font-black uppercase tracking-tight text-slate-900">
              Central Pollution Control Board (CPCB)
            </h2>
            <h3 className="text-xs sm:text-sm font-bold text-emerald-800 tracking-wide mt-1 uppercase">
              Official Extended Producer Responsibility (EPR) Certificate of Custody
            </h3>
            <p className="text-[10px] text-slate-500 mt-1 italic">
              Issued under Rule 13(1) of E-Waste (Management) Rules, 2022 & Battery Waste Management Rules 2022
            </p>
          </div>

          {/* Certificate Metadata */}
          <div className="my-5 flex flex-wrap justify-between text-xs gap-3">
            <div>
              <span className="text-slate-500 font-semibold block text-[10px]">Certificate Serial No:</span>
              <span className="font-mono font-bold text-slate-900 text-xs">{data.certificateId}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block text-[10px]">Date of Certification:</span>
              <span className="font-bold text-slate-900 text-xs">{data.issueDate}</span>
            </div>
            <div>
              <span className="text-slate-500 font-semibold block text-[10px]">Lot Reference:</span>
              <span className="font-mono font-bold text-emerald-800 text-xs">{data.lotRef}</span>
            </div>
          </div>

          {/* Entity Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 text-xs">
            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Informal Collector (Origin Node)
              </span>
              <div className="font-black text-slate-900 text-sm">{data.collectorName}</div>
              <div className="text-slate-600 text-[11px]">SPCB ID: {data.collectorId}</div>
              <div className="text-slate-500 text-[10px] font-mono mt-0.5">GPS: {data.collectorGps}</div>
            </div>

            <div>
              <span className="text-[10px] font-bold text-slate-500 uppercase tracking-wider block mb-1">
                Authorized Recycler (Intake Facility)
              </span>
              <div className="font-black text-slate-900 text-sm">{data.recyclerName}</div>
              <div className="text-slate-600 text-[11px]">CPCB Reg: {data.recyclerLicense}</div>
              <div className="text-emerald-700 text-[10px] font-bold mt-0.5">✓ Geofence Verified (&lt;50m)</div>
            </div>
          </div>

          {/* Material & Mineral Recovery */}
          <div className="my-4 space-y-2 text-xs">
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-600 font-medium">Scrap Stream Certified:</span>
              <span className="font-black text-slate-900">{data.materialCategory}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-600 font-medium">Certified Scale Weight:</span>
              <span className="font-black text-emerald-700 text-sm">{data.certifiedWeightKg} kg</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-600 font-medium">Critical Minerals Recovered:</span>
              <span className="font-bold text-slate-800 text-right">{data.criticalMinerals.join(', ')}</span>
            </div>
            <div className="flex justify-between py-1.5 border-b border-slate-200">
              <span className="text-slate-600 font-medium">Backyard Toxins Averted:</span>
              <span className="font-semibold text-rose-700 text-right">{data.toxinsAverted}</span>
            </div>
          </div>

          {/* Cryptographic Proof & Watermark */}
          <div className="mt-6 pt-4 border-t-2 border-slate-200 flex items-center justify-between">
            <div className="max-w-xs">
              <span className="text-[9px] text-slate-400 uppercase font-mono block">
                SHA-256 Provenance Digest:
              </span>
              <span className="font-mono text-[9px] text-slate-600 break-all leading-tight block">
                {data.sha256Hash}
              </span>
            </div>

            <div className="text-center pl-4">
              <div className="w-16 h-16 rounded-full border-2 border-emerald-600 flex flex-col items-center justify-center text-emerald-700 text-[9px] font-black uppercase leading-tight rotate-12">
                <span>CPCB</span>
                <span>EPR</span>
                <span>VERIFIED</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
