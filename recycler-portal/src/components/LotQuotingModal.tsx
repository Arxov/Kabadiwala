'use client';

import React, { useState } from 'react';
import { db } from '../lib/db';
import { SampleLotItem } from '../lib/mockData';

interface LotQuotingModalProps {
  lot: SampleLotItem;
  isOpen: boolean;
  onClose: () => void;
  onQuoteSubmitted?: (lotId: string, quoteAmount: number) => void;
}

export default function LotQuotingModal({
  lot,
  isOpen,
  onClose,
  onQuoteSubmitted,
}: LotQuotingModalProps) {
  const [offeredRate, setOfferedRate] = useState<number>(225);
  const [pickupAvailable, setPickupAvailable] = useState<boolean>(true);
  const [vehicleNumber, setVehicleNumber] = useState<string>('MH-12-TR-9021 (Electric 3W)');
  const [pickupSlot, setPickupSlot] = useState<string>('Today, 02:00 PM - 04:00 PM');
  const [submitting, setSubmitting] = useState<boolean>(false);
  const [submitted, setSubmitted] = useState<boolean>(false);

  if (!isOpen) return null;

  const totalPayout = Math.round(lot.weightKg * offeredRate);

  const handleSubmitQuote = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);

    try {
      // Save quote to Dexie.js
      await db.quotes.add({
        id: `quote-${Date.now()}`,
        lot_id: lot.id,
        price: totalPayout,
        status: 'submitted',
        updated_at: new Date().toISOString(),
        dirty: 1,
      });

      // Update lot status if needed
      await db.lots.update(lot.id, {
        status: 'quoted',
        updated_at: new Date().toISOString(),
      });

      setSubmitted(true);
      if (onQuoteSubmitted) {
        onQuoteSubmitted(lot.id, totalPayout);
      }

      setTimeout(() => {
        setSubmitted(false);
        setSubmitting(false);
        onClose();
      }, 1500);
    } catch (err) {
      console.error('Error submitting quote:', err);
      setSubmitting(false);
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-sm animate-in fade-in">
      <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 max-w-lg w-full shadow-2xl relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-5 right-5 text-slate-400 hover:text-white p-2 rounded-full hover:bg-slate-800"
        >
          ✕
        </button>

        {submitted ? (
          <div className="py-12 text-center">
            <div className="w-16 h-16 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-3xl">
              ✓
            </div>
            <h4 className="text-2xl font-bold text-white mb-2">Quote Submitted!</h4>
            <p className="text-slate-400 text-sm">
              Your purchase quote of <strong className="text-emerald-400">₹{totalPayout.toLocaleString('en-IN')}</strong> has been transmitted to collector {lot.collectorName}.
            </p>
          </div>
        ) : (
          <form onSubmit={handleSubmitQuote}>
            <div className="mb-6">
              <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider">
                Recycler Purchase Quote
              </span>
              <h3 className="text-xl font-black text-white mt-1">
                Quote on {lot.lotRef}
              </h3>
              <p className="text-xs text-slate-400 mt-1">
                Collector: <strong className="text-slate-200">{lot.collectorName}</strong> ({lot.locationName})
              </p>
            </div>

            {/* Lot Summary Box */}
            <div className="p-4 rounded-2xl bg-slate-950/60 border border-slate-800 mb-5 space-y-2 text-xs">
              <div className="flex justify-between">
                <span className="text-slate-400">Scrap Category:</span>
                <span className="font-bold text-white">{lot.categoryLabel}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Declared Weight:</span>
                <span className="font-bold text-emerald-400">{lot.weightKg} kg</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">Collector Value Estimate:</span>
                <span className="font-bold text-white">₹{lot.estimatedValue.toLocaleString('en-IN')}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-400">On-Device Photo Hash:</span>
                <span className="font-mono text-[10px] text-slate-500 truncate max-w-[200px]">
                  {lot.sha256Hash}
                </span>
              </div>
            </div>

            {/* Quoting Inputs */}
            <div className="space-y-4 mb-6">
              <div>
                <label className="block text-xs font-bold text-slate-300 mb-1">
                  Offered Purchase Rate (₹ / kg):
                </label>
                <div className="flex items-center space-x-2">
                  <input
                    type="number"
                    min="1"
                    max="2000"
                    value={offeredRate}
                    onChange={(e) => setOfferedRate(Number(e.target.value))}
                    className="flex-1 bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-base font-bold text-white focus:outline-none focus:border-emerald-500"
                  />
                  <div className="text-xs text-slate-400 font-medium">
                    = <span className="text-emerald-400 font-black text-sm">₹{totalPayout.toLocaleString('en-IN')}</span> total
                  </div>
                </div>
              </div>

              {/* Pickup Option */}
              <div className="p-3 rounded-xl bg-slate-950/40 border border-slate-800">
                <label className="flex items-center space-x-3 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={pickupAvailable}
                    onChange={(e) => setPickupAvailable(e.target.checked)}
                    className="w-4 h-4 rounded text-emerald-500 accent-emerald-500 cursor-pointer"
                  />
                  <span className="text-xs font-semibold text-slate-200">
                    Include Doorstep Vehicle Pickup
                  </span>
                </label>

                {pickupAvailable && (
                  <div className="mt-3 space-y-2 pt-2 border-t border-slate-800/80">
                    <div>
                      <span className="text-[11px] text-slate-400">Dispatch Vehicle:</span>
                      <input
                        type="text"
                        value={vehicleNumber}
                        onChange={(e) => setVehicleNumber(e.target.value)}
                        className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                    <div>
                      <span className="text-[11px] text-slate-400">Scheduled Time Window:</span>
                      <input
                        type="text"
                        value={pickupSlot}
                        onChange={(e) => setPickupSlot(e.target.value)}
                        className="w-full mt-1 bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-xs text-white"
                      />
                    </div>
                  </div>
                )}
              </div>
            </div>

            {/* Actions */}
            <div className="flex space-x-3">
              <button
                type="button"
                onClick={onClose}
                className="flex-1 py-3 rounded-xl bg-slate-800 text-slate-300 font-bold text-xs hover:bg-slate-700 transition-colors"
              >
                Cancel
              </button>
              <button
                type="submit"
                disabled={submitting}
                className="flex-1 py-3 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
              >
                {submitting ? 'Submitting...' : `Submit Quote (₹${totalPayout})`}
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}
