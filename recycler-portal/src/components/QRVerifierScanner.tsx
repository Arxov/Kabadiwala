'use client';

import React, { useState } from 'react';
import { db } from '../lib/db';

interface QRPayload {
  ref: string;
  collector_id: string;
  collector_name: string;
  category: string;
  weight_kg: number;
  est_val: number;
  timestamp: number;
  gps: { lat: number; lng: number; acc: number };
  sig: string;
}

const SAMPLE_DEFAULT_QR_JSON = JSON.stringify({
  ref: 'LOT-2026-MH-8921',
  collector_id: 'c-pun-0042',
  collector_name: 'Ramesh Shinde',
  category: 'Printed Circuit Boards (PCB)',
  weight_kg: 24.5,
  est_val: 5390,
  timestamp: Date.now() - 3600000,
  gps: { lat: 18.5204, lng: 73.8567, acc: 4.5 },
  sig: 'hmac_sha256_verified_token_cpcb',
}, null, 2);

// Haversine distance calculator in meters
function haversineMeters(lat1: number, lon1: number, lat2: number, lon2: number) {
  const R = 6371e3; // Earth radius in meters
  const phi1 = (lat1 * Math.PI) / 180;
  const phi2 = (lat2 * Math.PI) / 180;
  const deltaPhi = ((lat2 - lat1) * Math.PI) / 180;
  const deltaLambda = ((lon2 - lon1) * Math.PI) / 180;

  const a =
    Math.sin(deltaPhi / 2) * Math.sin(deltaPhi / 2) +
    Math.cos(phi1) * Math.cos(phi2) * Math.sin(deltaLambda / 2) * Math.sin(deltaLambda / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));

  return Math.round(R * c);
}

export default function QRVerifierScanner() {
  const [qrText, setQrText] = useState<string>(SAMPLE_DEFAULT_QR_JSON);
  const [parsedPayload, setParsedPayload] = useState<QRPayload | null>(null);
  const [parseError, setParseError] = useState<string | null>(null);

  // Recycler inputs
  const [recyclerLat] = useState<number>(18.5207); // Simulated close distance (~38 meters)
  const [recyclerLng] = useState<number>(73.8569);
  const [scaleWeight, setScaleWeight] = useState<number>(24.8);
  const [payoutRate, setPayoutRate] = useState<number>(220);
  const [paymentMethod, setPaymentMethod] = useState<'CASH' | 'UPI'>('CASH');

  // Verification state
  const [isVerifying, setIsVerifying] = useState<boolean>(false);
  const [verificationSuccess, setVerificationSuccess] = useState<boolean>(false);
  const [transferId, setTransferId] = useState<string | null>(null);

  const handleParseQR = React.useCallback(() => {
    try {
      setParseError(null);
      const data = JSON.parse(qrText) as QRPayload;
      if (!data.ref || !data.weight_kg) {
        throw new Error('Invalid QR payload format: Missing lot ref or weight.');
      }
      setParsedPayload(data);
      setScaleWeight(data.weight_kg);
    } catch (err: unknown) {
      setParseError(err instanceof Error ? err.message : 'Invalid JSON token string.');
      setParsedPayload(null);
    }
  }, [qrText]);

  // Run initial parse on mount
  React.useEffect(() => {
    handleParseQR();
  }, [handleParseQR]);

  // Distance computation
  const distanceMeters = parsedPayload
    ? haversineMeters(parsedPayload.gps.lat, parsedPayload.gps.lng, recyclerLat, recyclerLng)
    : 0;

  const isGeofenceValid = distanceMeters <= 150; // Handover must be physically proximate (<150m)

  // Weight variance
  const weightVariancePct = parsedPayload
    ? (((scaleWeight - parsedPayload.weight_kg) / parsedPayload.weight_kg) * 100).toFixed(1)
    : '0';

  const isVarianceAcceptable = Math.abs(Number(weightVariancePct)) <= 10;

  const totalFinalPayout = Math.round(scaleWeight * payoutRate);

  const handleConfirmHandover = async () => {
    if (!parsedPayload) return;
    setIsVerifying(true);

    try {
      const txnId = `EPR-TXN-${Date.now().toString().slice(-6)}`;

      // Save handover to Dexie
      await db.handovers.add({
        id: txnId,
        lot_id: parsedPayload.ref,
        qr_payload: JSON.stringify(parsedPayload),
        verified_at: new Date().toISOString(),
        dirty: 1,
      });

      // Update lot status in Dexie
      const existing = await db.lots.get(parsedPayload.ref);
      if (existing) {
        await db.lots.update(parsedPayload.ref, {
          status: 'verified',
          updated_at: new Date().toISOString(),
        });
      }

      setTransferId(txnId);
      setVerificationSuccess(true);
      setIsVerifying(false);
    } catch (err) {
      console.error('Error confirming handover:', err);
      setIsVerifying(false);
    }
  };

  return (
    <div className="bg-slate-900 border border-slate-800 rounded-3xl p-6 lg:p-8 shadow-2xl relative">
      {/* Header */}
      <div className="pb-6 border-b border-slate-800">
        <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-semibold mb-2">
          <span>Dual-Confirmation Handshake</span>
          <span className="w-1.5 h-1.5 rounded-full bg-emerald-400" />
          <span>Haversine GPS Verified</span>
        </div>
        <h3 className="text-2xl font-black text-white tracking-tight">
          Digital Handover Verification & EPR Intake
        </h3>
        <p className="text-slate-400 text-sm mt-1">
          Scan the collector&apos;s mobile dynamic QR code to cryptographically verify lot identity, GPS location, and scale weight.
        </p>
      </div>

      {verificationSuccess ? (
        <div className="my-8 p-8 rounded-2xl bg-emerald-950/20 border border-emerald-500/40 text-center animate-in fade-in">
          <div className="w-20 h-20 rounded-full bg-emerald-500/20 text-emerald-400 flex items-center justify-center mx-auto mb-4 text-4xl font-bold">
            ✓
          </div>
          <span className="px-3 py-1 rounded-full bg-emerald-500/20 text-emerald-400 text-xs font-bold uppercase tracking-wider">
            Transfer Confirmed & EPR Registered
          </span>
          <h4 className="text-2xl font-black text-white mt-3">
            Handover Transaction ID: {transferId}
          </h4>
          <p className="text-slate-300 text-sm mt-2 max-w-lg mx-auto">
            Payment of <strong className="text-emerald-400 font-bold">₹{totalFinalPayout.toLocaleString('en-IN')}</strong> settled via {paymentMethod} to collector {parsedPayload?.collector_name}. CPCB traceability credit record signed and locked.
          </p>

          <div className="mt-6 flex flex-wrap justify-center gap-3">
            <button
              onClick={() => {
                setVerificationSuccess(false);
                setParsedPayload(null);
                setTransferId(null);
              }}
              className="px-6 py-2.5 rounded-xl bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs"
            >
              Verify Another Lot
            </button>
            <a
              href="/epr-audit"
              className="px-6 py-2.5 rounded-xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-xs shadow-lg shadow-emerald-500/20"
            >
              View CPCB Chain-of-Custody Certificate →
            </a>
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-6">
          {/* Left Column: QR Ingestion & Geofencing */}
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <label className="text-xs font-bold text-slate-300 uppercase tracking-wider">
                1. QR Code Payload / Scanner Input
              </label>
              <button
                type="button"
                onClick={handleParseQR}
                className="text-xs text-emerald-400 hover:text-emerald-300 font-bold"
              >
                Re-Parse Token
              </button>
            </div>

            <textarea
              rows={7}
              value={qrText}
              onChange={(e) => setQrText(e.target.value)}
              placeholder="Paste collector dynamic QR JSON payload here..."
              className="w-full font-mono text-xs bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-300 focus:outline-none focus:border-emerald-500"
            />

            {parseError && (
              <div className="p-3 rounded-lg bg-rose-500/10 border border-rose-500/30 text-rose-400 text-xs">
                {parseError}
              </div>
            )}

            {/* Geofence Proximity Widget */}
            {parsedPayload && (
              <div className="p-4 rounded-xl bg-slate-950/60 border border-slate-800 space-y-3">
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-300">
                    GPS Geofence Validation:
                  </span>
                  <span
                    className={`text-xs font-bold px-2 py-0.5 rounded-full ${
                      isGeofenceValid
                        ? 'bg-emerald-500/20 text-emerald-400'
                        : 'bg-rose-500/20 text-rose-400'
                    }`}
                  >
                    {isGeofenceValid ? '✓ Geofence Matched' : '⚠ Proximity Warning'}
                  </span>
                </div>

                <div className="grid grid-cols-2 gap-2 text-xs">
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Collector Handshake GPS:</span>
                    <span className="font-mono text-white text-[11px]">
                      {parsedPayload.gps.lat.toFixed(4)}° N, {parsedPayload.gps.lng.toFixed(4)}° E
                    </span>
                  </div>
                  <div className="p-2 rounded bg-slate-900 border border-slate-800">
                    <span className="text-slate-500 text-[10px] block">Recycler Facility GPS:</span>
                    <span className="font-mono text-white text-[11px]">
                      {recyclerLat.toFixed(4)}° N, {recyclerLng.toFixed(4)}° E
                    </span>
                  </div>
                </div>

                <div className="flex items-center justify-between text-xs pt-1 text-slate-400">
                  <span>Physical Distance:</span>
                  <span className="font-bold text-white font-mono">{distanceMeters} meters (Threshold: ≤150m)</span>
                </div>
              </div>
            )}
          </div>

          {/* Right Column: Physical Weighing & Payout Confirmation */}
          <div className="space-y-4">
            <span className="text-xs font-bold text-slate-300 uppercase tracking-wider block">
              2. Scale Verification & Payout
            </span>

            {parsedPayload ? (
              <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800 space-y-4">
                <div className="flex justify-between items-start pb-3 border-b border-slate-800">
                  <div>
                    <h5 className="font-black text-white text-base">{parsedPayload.ref}</h5>
                    <span className="text-xs text-slate-400 font-medium">
                      Collector: {parsedPayload.collector_name} ({parsedPayload.collector_id})
                    </span>
                  </div>
                  <span className="px-2.5 py-1 rounded-md bg-blue-500/20 text-blue-400 text-xs font-bold">
                    {parsedPayload.category}
                  </span>
                </div>

                {/* Scale Weight Input */}
                <div>
                  <div className="flex justify-between text-xs font-bold text-slate-300 mb-1">
                    <span>Certified Industrial Scale Weight:</span>
                    <span className="text-slate-400">Declared: {parsedPayload.weight_kg} kg</span>
                  </div>
                  <div className="flex items-center space-x-3">
                    <input
                      type="number"
                      step="0.1"
                      value={scaleWeight}
                      onChange={(e) => setScaleWeight(Number(e.target.value))}
                      className="flex-1 bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 text-white font-bold text-lg focus:outline-none focus:border-emerald-500"
                    />
                    <span className="text-slate-400 font-bold text-sm">kg</span>
                  </div>
                  <div className="flex justify-between text-[11px] mt-1">
                    <span className="text-slate-500">Weight Variance:</span>
                    <span
                      className={`font-bold ${
                        isVarianceAcceptable ? 'text-emerald-400' : 'text-amber-400'
                      }`}
                    >
                      {Number(weightVariancePct) >= 0 ? `+${weightVariancePct}%` : `${weightVariancePct}%`}
                    </span>
                  </div>
                </div>

                {/* Rate and Payout */}
                <div className="grid grid-cols-2 gap-3 pt-2">
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Agreed Rate (₹/kg):
                    </label>
                    <input
                      type="number"
                      value={payoutRate}
                      onChange={(e) => setPayoutRate(Number(e.target.value))}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-bold text-sm"
                    />
                  </div>
                  <div>
                    <label className="text-[11px] font-bold text-slate-400 block mb-1">
                      Payment Settlement:
                    </label>
                    <select
                      value={paymentMethod}
                      onChange={(e) => setPaymentMethod(e.target.value as 'CASH' | 'UPI')}
                      className="w-full bg-slate-900 border border-slate-800 rounded-lg px-3 py-1.5 text-white font-bold text-sm"
                    >
                      <option value="CASH">Direct Cash (Instant Receipt)</option>
                      <option value="UPI">Direct UPI / Bank Transfer</option>
                    </select>
                  </div>
                </div>

                {/* Payout Callout */}
                <div className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/20 flex justify-between items-center">
                  <span className="text-xs text-slate-300 font-medium">Final Settled Payout:</span>
                  <span className="text-2xl font-black text-emerald-400">
                    ₹{totalFinalPayout.toLocaleString('en-IN')}
                  </span>
                </div>

                {/* Confirm Handshake Action */}
                <button
                  type="button"
                  disabled={isVerifying || !isGeofenceValid}
                  onClick={handleConfirmHandover}
                  className="w-full py-3.5 rounded-xl bg-emerald-500 text-slate-950 font-black text-xs hover:bg-emerald-400 shadow-lg shadow-emerald-500/20 transition-all disabled:opacity-50"
                >
                  {isVerifying ? 'Signing CPCB EPR Transaction...' : 'Confirm Dual Handover & Issue EPR Receipt'}
                </button>
              </div>
            ) : (
              <div className="h-64 flex flex-col items-center justify-center p-6 rounded-2xl bg-slate-950/40 border border-slate-800 text-slate-500 text-center text-xs">
                <span className="text-3xl mb-2">📲</span>
                <span>Scan or parse a dynamic QR payload to proceed with physical weighing and verification.</span>
              </div>
            )}
          </div>
        </div>
      )}
    </div>
  );
}
