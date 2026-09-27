'use client';

import React, { useState } from 'react';

export interface DisputeTicket {
  id: string;
  transactionId: string;
  collectorName: string;
  collectorId: string;
  recyclerName: string;
  category: string;
  disputeType: 'WEIGHT_VARIANCE' | 'CONTAMINATION' | 'PAYOUT_DELAY' | 'GEOFENCE_MISMATCH';
  declaredWeightKg: number;
  scaleWeightKg: number;
  variancePercent: number;
  reportedAt: string;
  status: 'OPEN' | 'UNDER_REVIEW' | 'RESOLVED' | 'REJECTED';
  notes: string;
}

const INITIAL_DISPUTES: DisputeTicket[] = [
  {
    id: 'DISP-2026-081',
    transactionId: 'EPR-TXN-884219',
    collectorName: 'Prakash Kamble',
    collectorId: 'c-pun-0088',
    recyclerName: 'Maharashtra GreenTech Recyclers Pvt Ltd',
    category: 'Copper Cables',
    disputeType: 'WEIGHT_VARIANCE',
    declaredWeightKg: 42.0,
    scaleWeightKg: 34.5,
    variancePercent: -17.8,
    reportedAt: '2026-09-27 09:45 IST',
    status: 'OPEN',
    notes: 'Collector declares 42kg bagged copper wire; industrial scale registered 34.5kg. Collector claims scale tare offset error.',
  },
  {
    id: 'DISP-2026-079',
    transactionId: 'EPR-TXN-884102',
    collectorName: 'Sanjay More',
    collectorId: 'c-pun-0051',
    recyclerName: 'EcoMetals CPCB E-Waste Dismantling Hub',
    category: 'Li-ion Batteries',
    disputeType: 'CONTAMINATION',
    declaredWeightKg: 25.0,
    scaleWeightKg: 25.0,
    variancePercent: 0.0,
    reportedAt: '2026-09-26 14:10 IST',
    status: 'UNDER_REVIEW',
    notes: 'Recycler detected 6kg swollen/punctured pouch cells violating CPCB Rule 14 fire transport guidelines.',
  },
  {
    id: 'DISP-2026-074',
    transactionId: 'EPR-TXN-883988',
    collectorName: 'Ganesh Shinde',
    collectorId: 'c-pun-0034',
    recyclerName: 'Swachh Bharat Electronic Recyclers',
    category: 'Printed Circuit Boards (PCB)',
    disputeType: 'PAYOUT_DELAY',
    declaredWeightKg: 18.0,
    scaleWeightKg: 18.2,
    variancePercent: +1.1,
    reportedAt: '2026-09-25 18:20 IST',
    status: 'RESOLVED',
    notes: 'UPI payout gateway timeout. Recycler manually disbursed ₹3,960 cash with thumbprint receipt stamped.',
  },
  {
    id: 'DISP-2026-068',
    transactionId: 'EPR-TXN-883710',
    collectorName: 'Vijay Jadhav',
    collectorId: 'c-pun-0012',
    recyclerName: 'EcoMetals CPCB E-Waste Dismantling Hub',
    category: 'CRT Monitors',
    disputeType: 'GEOFENCE_MISMATCH',
    declaredWeightKg: 50.0,
    scaleWeightKg: 50.0,
    variancePercent: 0.0,
    reportedAt: '2026-09-24 11:05 IST',
    status: 'REJECTED',
    notes: 'QR scan attempted 850m outside registered facility geofence. Automated fraud check triggered.',
  },
];

export default function DisputeResolutionPanel() {
  const [disputes, setDisputes] = useState<DisputeTicket[]>(INITIAL_DISPUTES);
  const [filterStatus, setFilterStatus] = useState<string>('ALL');
  const [activeModalTicket, setActiveModalTicket] = useState<DisputeTicket | null>(null);

  const filteredDisputes = disputes.filter(
    (d) => filterStatus === 'ALL' || d.status === filterStatus
  );

  const handleUpdateStatus = (id: string, newStatus: DisputeTicket['status']) => {
    setDisputes((prev) =>
      prev.map((d) => (d.id === id ? { ...d, status: newStatus } : d))
    );
    if (activeModalTicket && activeModalTicket.id === id) {
      setActiveModalTicket((prev) => (prev ? { ...prev, status: newStatus } : null));
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between pb-6 border-b border-slate-800 gap-4">
        <div>
          <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-amber-500/10 border border-amber-500/20 text-amber-400 text-xs font-semibold mb-2">
            <span>CPCB Section 44 Regulatory Arbitration</span>
            <span className="w-1.5 h-1.5 rounded-full bg-amber-400" />
            <span>Fraud Prevention &amp; Dispute Pipeline</span>
          </div>
          <h3 className="text-2xl font-black text-white tracking-tight">
            Dispute Resolution &amp; Arbitration Console
          </h3>
          <p className="text-slate-400 text-sm mt-1">
            Independent SPCB oversight for weight discrepancies, contamination claims, and geofence violations.
          </p>
        </div>

        {/* Status Filter Chips */}
        <div className="flex items-center space-x-1.5 bg-slate-950 p-1.5 rounded-2xl border border-slate-800">
          {['ALL', 'OPEN', 'UNDER_REVIEW', 'RESOLVED', 'REJECTED'].map((st) => (
            <button
              key={st}
              onClick={() => setFilterStatus(st)}
              className={`px-3 py-1 rounded-xl text-xs font-bold transition-all ${
                filterStatus === st
                  ? 'bg-amber-500 text-slate-950 shadow-sm'
                  : 'text-slate-400 hover:text-white'
              }`}
            >
              {st}
            </button>
          ))}
        </div>
      </div>

      {/* Disputes Table */}
      <div className="overflow-x-auto rounded-2xl border border-slate-800 bg-slate-950/40 mt-6">
        <table className="w-full text-left text-xs text-slate-300">
          <thead className="bg-slate-900/80 text-slate-400 font-bold uppercase text-[11px] border-b border-slate-800">
            <tr>
              <th className="py-3 px-4">Ticket / Transaction</th>
              <th className="py-3 px-3">Collector &amp; Recycler</th>
              <th className="py-3 px-3">Type &amp; Category</th>
              <th className="py-3 px-3">Weight Discrepancy</th>
              <th className="py-3 px-3">Status</th>
              <th className="py-3 px-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-800/60">
            {filteredDisputes.map((ticket) => {
              const isWeight = ticket.disputeType === 'WEIGHT_VARIANCE';
              return (
                <tr key={ticket.id} className="hover:bg-slate-900/40 transition-colors">
                  <td className="py-4 px-4 font-mono">
                    <span className="text-amber-400 font-bold block">{ticket.id}</span>
                    <span className="text-slate-500 text-[11px]">{ticket.transactionId}</span>
                    <span className="text-[10px] text-slate-500 block mt-0.5">{ticket.reportedAt}</span>
                  </td>
                  <td className="py-4 px-3">
                    <div className="font-bold text-white">{ticket.collectorName}</div>
                    <div className="text-[11px] text-slate-400 truncate max-w-[180px]">
                      🏢 {ticket.recyclerName}
                    </div>
                  </td>
                  <td className="py-4 px-3">
                    <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-slate-800 text-slate-300 border border-slate-700 block w-fit mb-1">
                      {ticket.disputeType.replace('_', ' ')}
                    </span>
                    <span className="text-slate-300">{ticket.category}</span>
                  </td>
                  <td className="py-4 px-3 font-mono">
                    {isWeight ? (
                      <div>
                        <span className="text-slate-400">Dec: {ticket.declaredWeightKg}kg</span>
                        <br />
                        <span className="text-slate-200">Scale: {ticket.scaleWeightKg}kg</span>
                        <span
                          className={`ml-1 text-[11px] font-bold ${
                            ticket.variancePercent < -10 ? 'text-rose-400' : 'text-amber-400'
                          }`}
                        >
                          ({ticket.variancePercent}%)
                        </span>
                      </div>
                    ) : (
                      <span className="text-slate-500 font-sans">N/A (Categorical)</span>
                    )}
                  </td>
                  <td className="py-4 px-3">
                    <span
                      className={`text-[10px] font-black px-2.5 py-1 rounded-full border ${
                        ticket.status === 'OPEN'
                          ? 'bg-rose-500/20 text-rose-400 border-rose-500/30'
                          : ticket.status === 'UNDER_REVIEW'
                          ? 'bg-amber-500/20 text-amber-400 border-amber-500/30'
                          : ticket.status === 'RESOLVED'
                          ? 'bg-emerald-500/20 text-emerald-400 border-emerald-500/30'
                          : 'bg-slate-700/20 text-slate-400 border-slate-700/30'
                      }`}
                    >
                      {ticket.status}
                    </span>
                  </td>
                  <td className="py-4 px-4 text-right">
                    <button
                      type="button"
                      onClick={() => setActiveModalTicket(ticket)}
                      className="px-3 py-1.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs border border-slate-700 transition-all"
                    >
                      Investigate 🔍
                    </button>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>

      {/* Investigation Modal */}
      {activeModalTicket && (
        <div className="fixed inset-0 z-50 bg-black/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-3xl max-w-xl w-full p-6 space-y-6 shadow-2xl animate-in fade-in zoom-in-95">
            <div className="flex items-center justify-between pb-4 border-b border-slate-800">
              <div>
                <span className="text-xs font-mono text-amber-400 font-bold block">
                  SPCB ARBITRATION CASE
                </span>
                <h4 className="text-lg font-black text-white">{activeModalTicket.id}</h4>
              </div>
              <button
                onClick={() => setActiveModalTicket(null)}
                className="w-8 h-8 rounded-full bg-slate-800 text-slate-400 hover:text-white flex items-center justify-center font-bold"
              >
                ✕
              </button>
            </div>

            <div className="space-y-4 text-xs">
              <div className="p-3 rounded-xl bg-slate-950 border border-slate-800 space-y-1">
                <div className="text-slate-400">Transaction ID: <span className="text-white font-mono">{activeModalTicket.transactionId}</span></div>
                <div className="text-slate-400">Collector: <span className="text-white font-semibold">{activeModalTicket.collectorName} ({activeModalTicket.collectorId})</span></div>
                <div className="text-slate-400">Recycler Facility: <span className="text-white font-semibold">{activeModalTicket.recyclerName}</span></div>
                <div className="text-slate-400">Material Category: <span className="text-white font-semibold">{activeModalTicket.category}</span></div>
              </div>

              <div className="p-3 rounded-xl bg-amber-500/10 border border-amber-500/20 text-amber-300">
                <span className="font-bold block mb-1">Inspection Notes &amp; Claim Evidence:</span>
                {activeModalTicket.notes}
              </div>

              {/* Regulatory Audit Actions */}
              <div className="space-y-2">
                <span className="font-bold text-slate-300 block">SPCB Compliance Actions:</span>
                <div className="grid grid-cols-2 gap-2">
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(activeModalTicket.id, 'UNDER_REVIEW')}
                    className="p-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-400 border border-amber-500/30 font-bold text-center"
                  >
                    Set Under Review
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(activeModalTicket.id, 'RESOLVED')}
                    className="p-2.5 rounded-xl bg-emerald-500/20 hover:bg-emerald-500/30 text-emerald-400 border border-emerald-500/30 font-bold text-center"
                  >
                    Resolve &amp; Release Payout
                  </button>
                  <button
                    type="button"
                    onClick={() => handleUpdateStatus(activeModalTicket.id, 'REJECTED')}
                    className="p-2.5 rounded-xl bg-rose-500/20 hover:bg-rose-500/30 text-rose-400 border border-rose-500/30 font-bold text-center"
                  >
                    Reject Fraudulent Claim
                  </button>
                  <button
                    type="button"
                    onClick={() => {
                      alert(`Regulatory Notice SPCB/CPCB-PENALTY-${Date.now().toString().slice(-4)} issued to ${activeModalTicket.recyclerName}`);
                    }}
                    className="p-2.5 rounded-xl bg-purple-500/20 hover:bg-purple-500/30 text-purple-400 border border-purple-500/30 font-bold text-center"
                  >
                    Issue Regulatory Notice
                  </button>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t border-slate-800 text-right">
              <button
                type="button"
                onClick={() => setActiveModalTicket(null)}
                className="px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
              >
                Close Window
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
