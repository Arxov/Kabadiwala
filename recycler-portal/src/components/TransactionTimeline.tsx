'use client';

import React from 'react';

export type TransactionStage =
  | 'DRAFT'
  | 'CREATED'
  | 'MATCHED'
  | 'OFFER_RECEIVED'
  | 'ACCEPTED'
  | 'PICKUP_SCHEDULED'
  | 'HANDOVER_PENDING'
  | 'HANDOVER_VERIFIED'
  | 'COMPLETED'
  | 'DISPUTED'
  | 'REJECTED';

interface StageMeta {
  key: TransactionStage;
  label: string;
  description: string;
  icon: string;
}

const STAGES: StageMeta[] = [
  { key: 'DRAFT', label: '1. Draft', description: 'Created on-device (Drift SQLite)', icon: '📝' },
  { key: 'CREATED', label: '2. Created', description: 'SHA-256 Photo Fingerprint Synced', icon: '🔒' },
  { key: 'MATCHED', label: '3. Matched', description: 'CPCB Recycler Compatibility Engine', icon: '⚡' },
  { key: 'OFFER_RECEIVED', label: '4. Quoted', description: 'Competitive Price Offer Placed', icon: '🏷️' },
  { key: 'ACCEPTED', label: '5. Accepted', description: 'Collector Approved Minimum Rate', icon: '🤝' },
  { key: 'PICKUP_SCHEDULED', label: '6. Scheduled', description: 'Doorstep EV Logistics Route Set', icon: '🚚' },
  { key: 'HANDOVER_PENDING', label: '7. Proximity', description: 'Geofence Check (≤150m Proximity)', icon: '📍' },
  { key: 'HANDOVER_VERIFIED', label: '8. Verified', description: 'Dual QR & Industrial Scale Pass (±10%)', icon: '⚖️' },
  { key: 'COMPLETED', label: '9. Completed', description: 'Instant UPI/Cash & Form 6 EPR Credit', icon: '✅' },
];

interface Props {
  currentStage: TransactionStage;
  disputeReason?: string;
  className?: string;
}

export default function TransactionTimeline({ currentStage, disputeReason, className = '' }: Props) {
  const isDisputed = currentStage === 'DISPUTED';
  const isRejected = currentStage === 'REJECTED';

  const currentIndex = STAGES.findIndex((s) => s.key === currentStage);

  return (
    <div className={`p-5 rounded-2xl bg-slate-900/90 border border-slate-800 ${className}`}>
      <div className="flex items-center justify-between mb-4">
        <div>
          <span className="text-[10px] font-mono uppercase tracking-wider text-slate-400 font-bold block">
            CPCB Lifecycle Protocol • Section 32 State Machine
          </span>
          <h4 className="text-base font-black text-white flex items-center gap-2 mt-0.5">
            <span>Transaction State Machine</span>
            <span
              className={`text-xs px-2.5 py-0.5 rounded-full font-bold font-mono ${
                isDisputed
                  ? 'bg-rose-500/20 text-rose-400 border border-rose-500/30'
                  : isRejected
                  ? 'bg-amber-500/20 text-amber-400 border border-amber-500/30'
                  : 'bg-emerald-500/20 text-emerald-400 border border-emerald-500/30'
              }`}
            >
              {currentStage}
            </span>
          </h4>
        </div>
        <div className="text-right text-xs text-slate-400">
          Step <span className="text-emerald-400 font-bold">{currentIndex >= 0 ? currentIndex + 1 : '!'}</span> of 9
        </div>
      </div>

      {/* Exception Banner if Disputed or Rejected */}
      {isDisputed && (
        <div className="mb-4 p-3 rounded-xl bg-rose-500/10 border border-rose-500/30 text-rose-300 text-xs flex items-center space-x-2">
          <span className="text-base">⚠️</span>
          <div>
            <strong className="font-bold">Transaction Paused in DISPUTED State:</strong>{' '}
            {disputeReason || 'Scale weight variance exceeded ±10% threshold. SPCB regulatory inspection triggered.'}
          </div>
        </div>
      )}

      {isRejected && (
        <div className="mb-4 p-3 rounded-xl bg-amber-500/10 border border-amber-500/30 text-amber-300 text-xs flex items-center space-x-2">
          <span className="text-base">🛑</span>
          <div>
            <strong className="font-bold">Transaction REJECTED:</strong> Contaminated hazardous batch or unverified collector credentials.
          </div>
        </div>
      )}

      {/* 9-Stage Stepper Container */}
      <div className="grid grid-cols-3 sm:grid-cols-5 lg:grid-cols-9 gap-2">
        {STAGES.map((stage, idx) => {
          const isPassed = currentIndex > idx;
          const isCurrent = currentIndex === idx;

          let badgeColor = 'bg-slate-950 text-slate-600 border-slate-800';
          let textColor = 'text-slate-500';

          if (isPassed) {
            badgeColor = 'bg-emerald-500/20 text-emerald-400 border-emerald-500/40 shadow-sm';
            textColor = 'text-slate-300';
          } else if (isCurrent) {
            badgeColor = isDisputed
              ? 'bg-rose-500 text-white border-rose-400 animate-pulse'
              : 'bg-blue-600 text-white border-blue-400 shadow-md shadow-blue-600/30 ring-2 ring-blue-500/30';
            textColor = 'text-white font-bold';
          }

          return (
            <div
              key={stage.key}
              className={`p-2.5 rounded-xl border flex flex-col justify-between transition-all ${badgeColor}`}
            >
              <div>
                <div className="flex items-center justify-between text-xs mb-1">
                  <span>{stage.icon}</span>
                  <span className="text-[10px] font-mono opacity-80">#{idx + 1}</span>
                </div>
                <div className={`text-[11px] leading-tight font-black ${textColor}`}>
                  {stage.label.split('. ')[1]}
                </div>
              </div>
              <div className="text-[9px] text-slate-400 mt-2 leading-tight hidden xl:block">
                {stage.description}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
