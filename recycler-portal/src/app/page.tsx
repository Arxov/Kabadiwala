'use client';

import React, { useEffect } from 'react';
import Link from 'next/link';
import Navigation from '@/components/Navigation';
import UnitEconomicsCalculator from '@/components/UnitEconomicsCalculator';
import PublicPriceBoard from '@/components/PublicPriceBoard';
import { seedDatabaseIfEmpty } from '@/lib/mockData';

export default function HomePage() {
  useEffect(() => {
    seedDatabaseIfEmpty();
  }, []);

  return (
    <div className="min-h-screen bg-slate-950 text-slate-100 flex flex-col">
      <Navigation />

      {/* Hero Section */}
      <section className="relative overflow-hidden pt-12 pb-20 border-b border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="text-center max-w-3xl mx-auto">
            <div className="inline-flex items-center space-x-2 px-3.5 py-1.5 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-400 text-xs font-bold mb-6">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-ping" />
              <span>Smart India Hackathon 2026</span>
              <span className="text-slate-500">•</span>
              <span>CPCB EPR & Critical Minerals Mission</span>
            </div>

            <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black text-white tracking-tight leading-tight">
              Bringing Informal Collectors into India&apos;s{' '}
              <span className="bg-gradient-to-r from-emerald-400 via-teal-300 to-cyan-400 bg-clip-text text-transparent">
                Formal E-Waste Chain
              </span>
            </h1>

            <p className="mt-6 text-base sm:text-lg text-slate-400 max-w-2xl mx-auto leading-relaxed">
              India generates 1.71 million metric tonnes of e-waste annually, but 95% is trapped in predatory informal middlemen rings and hazardous backyard recycling. Kabadiwala Connect bridges informal collectors to CPCB-authorized dismantlers with verifiable digital handovers and fair market rates.
            </p>

            {/* CTAs */}
            <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/portal"
                className="px-6 py-3.5 rounded-2xl bg-emerald-500 hover:bg-emerald-400 text-slate-950 font-black text-sm shadow-xl shadow-emerald-500/20 transition-all transform hover:-translate-y-0.5"
              >
                Explore Recycler Marketplace →
              </Link>
              <Link
                href="/handovers"
                className="px-6 py-3.5 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm border border-slate-700 transition-all"
              >
                Verify Digital Handover QR
              </Link>
              <Link
                href="/epr-audit"
                className="px-6 py-3.5 rounded-2xl bg-slate-900/60 hover:bg-slate-800 text-emerald-400 font-bold text-sm border border-emerald-500/30 transition-all"
              >
                EPR Traceability Certificates
              </Link>
            </div>
          </div>

          {/* National Macro Impact Ticker */}
          <div className="mt-16 grid grid-cols-2 lg:grid-cols-5 gap-4">
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">India E-Waste</span>
              <div className="text-2xl lg:text-3xl font-black text-white mt-1">1.71M MT</div>
              <span className="text-[11px] text-rose-400 font-semibold">95% in informal sector</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Collector Income</span>
              <div className="text-2xl lg:text-3xl font-black text-emerald-400 mt-1">+79.1%</div>
              <span className="text-[11px] text-emerald-300 font-semibold">Net formal surplus</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Collectors Formalized</span>
              <div className="text-2xl lg:text-3xl font-black text-blue-400 mt-1">4,280+</div>
              <span className="text-[11px] text-slate-400 font-semibold">Mapped & SPCB registered</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Feedstock Channeled</span>
              <div className="text-2xl lg:text-3xl font-black text-teal-400 mt-1">142.5 T</div>
              <span className="text-[11px] text-teal-300 font-semibold">To CPCB refineries</span>
            </div>
            <div className="p-5 rounded-2xl bg-slate-900/60 border border-slate-800/80 backdrop-blur-sm col-span-2 lg:col-span-1">
              <span className="text-[11px] font-bold text-slate-500 uppercase tracking-wider block">Toxins Averted</span>
              <div className="text-2xl lg:text-3xl font-black text-amber-400 mt-1">18,420 kg</div>
              <span className="text-[11px] text-amber-300 font-semibold">Dioxins, cyanide & lead</span>
            </div>
          </div>
        </div>
      </section>

      {/* Main Content Sections */}
      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 space-y-20 flex-1">

        {/* Section 1: Unit Economics Calculator */}
        <section id="economics">
          <div className="mb-6">
            <span className="text-xs font-bold text-emerald-400 uppercase tracking-wider block">
              1. The Economic Incentive Engine
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              Why Formalization Works: Guaranteed Income Uplift
            </h2>
          </div>
          <UnitEconomicsCalculator />
        </section>

        {/* Section 2: Critical Minerals Strategy under E-Waste Rules 2022 */}
        <section id="critical-minerals" className="p-8 rounded-3xl bg-slate-900/80 border border-slate-800 relative">
          <div className="max-w-3xl mb-8">
            <div className="inline-flex items-center space-x-2 px-3 py-1 rounded-full bg-cyan-500/10 border border-cyan-500/20 text-cyan-400 text-xs font-bold mb-3">
              <span>National Mineral Security</span>
              <span className="w-1.5 h-1.5 rounded-full bg-cyan-400" />
              <span>Ministry of Mines Priority</span>
            </div>
            <h2 className="text-3xl font-black text-white tracking-tight">
              E-Waste Rules 2022 &amp; Critical Minerals Recovery
            </h2>
            <p className="text-slate-400 text-sm mt-2">
              India imports over 90% of its critical minerals. Modern electronic waste contains up to 40 times higher concentrations of precious metals than raw ore. Formalizing the informal collection channel is India&apos;s most accessible domestic mine.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-amber-400 uppercase tracking-wider">Gold &amp; Palladium</div>
              <div className="text-lg font-black text-white mt-1">Printed Circuit Boards</div>
              <p className="text-xs text-slate-400 mt-2">
                1 tonne of server PCBs yields ~250g of Gold (Au) and ~50g of Palladium (Pd). Formal hydrometallurgical refining recovers 98% with zero cyanide leaching into city soil.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-emerald-400 uppercase tracking-wider">Lithium, Cobalt &amp; Nickel</div>
              <div className="text-lg font-black text-white mt-1">Li-ion Battery Packs</div>
              <p className="text-xs text-slate-400 mt-2">
                Under the Battery Waste Management Rules 2022, safe sorting and shredding under inert atmosphere preserves battery-grade Lithium Carbonate and Cobalt cathode active material.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-blue-400 uppercase tracking-wider">High-Purity Copper 99.9%</div>
              <div className="text-lg font-black text-white mt-1">Telecommunication Wires</div>
              <p className="text-xs text-slate-400 mt-2">
                Mechanical wire strippers replace open-air burning, recovering 100% of electrolytic copper wire without oxidization and eliminating cancer-causing dioxin emissions.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-purple-400 uppercase tracking-wider">Rare Earths (Nd &amp; Dy)</div>
              <div className="text-lg font-black text-white mt-1">Motors &amp; Permanent Magnets</div>
              <p className="text-xs text-slate-400 mt-2">
                Hard drives and high-efficiency electric motors contain Neodymium (NdFeB) magnets essential for EV drivetrains and renewable wind turbines.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-teal-400 uppercase tracking-wider">Indium &amp; Gallium</div>
              <div className="text-lg font-black text-white mt-1">LCD Displays &amp; LEDs</div>
              <p className="text-xs text-slate-400 mt-2">
                Indium Tin Oxide (ITO) thin films recovered from flat panels secure domestic supply for semiconductor display manufacturing under the India Semiconductor Mission.
              </p>
            </div>

            <div className="p-5 rounded-2xl bg-slate-950/60 border border-slate-800">
              <div className="text-xs font-bold text-rose-400 uppercase tracking-wider">Lead-Barium Glass</div>
              <div className="text-lg font-black text-white mt-1">CRT TV Screens &amp; Monitors</div>
              <p className="text-xs text-slate-400 mt-2">
                Furnace separation prevents implosions and extracts heavy lead bullion, preventing millions of litres of groundwater from lead poisoning.
              </p>
            </div>
          </div>
        </section>

        {/* Section 3: Live Transparent Public Price Board */}
        <section id="price-board">
          <div className="mb-6">
            <span className="text-xs font-bold text-blue-400 uppercase tracking-wider block">
              2. Price Transparency &amp; Market Equity
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              Live E-Waste Rates Across Indian Metro Hubs
            </h2>
          </div>
          <PublicPriceBoard />
        </section>

        {/* Section 4: 4 Fatal Backyard Hazards vs Clean Formalization */}
        <section id="safety-comparison" className="p-8 rounded-3xl bg-slate-900 border border-slate-800">
          <div className="max-w-3xl mb-8">
            <span className="text-xs font-bold text-rose-400 uppercase tracking-wider block">
              3. Occupational Health &amp; Environment
            </span>
            <h2 className="text-3xl font-black text-white tracking-tight mt-1">
              Ending Backyard Toxicity with Clean Formal Technology
            </h2>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="p-6 rounded-2xl bg-rose-950/20 border border-rose-900/40">
              <div className="flex items-center space-x-2 text-rose-400 font-bold text-sm mb-3">
                <span>❌</span>
                <span>Informal Backyard Extraction Reality</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Open Cable Burning:</strong> Thick black smoke releases carcinogenic dioxins; vaporizes 15% copper.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Acid PCB Leaching:</strong> Boiling in nitric acid causes chemical skin burns, lung edema, and acid dumping in sewers.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>CRT Smashing:</strong> Hammering causes explosive vacuum implosion and toxic airborne lead dust.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-rose-500 font-bold">•</span>
                  <span><strong>Battery Puncturing:</strong> Causes thermal runaway fires reaching 800°C releasing poisonous gas.</span>
                </li>
              </ul>
            </div>

            <div className="p-6 rounded-2xl bg-emerald-950/20 border border-emerald-900/40">
              <div className="flex items-center space-x-2 text-emerald-400 font-bold text-sm mb-3">
                <span>✅</span>
                <span>Kabadiwala Connect Formal Technology</span>
              </div>
              <ul className="space-y-3 text-xs text-slate-300">
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Automated Mechanical Strippers:</strong> Peels insulation intact; earns full ₹480/kg rate with zero fumes.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Closed-Loop Hydrometallurgy:</strong> High-yield precious metal recovery with zero toxic gas or liquid effluent.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Lead Separation Furnaces:</strong> Safely separates funnel glass from neck lead with sealed dust filtration.</span>
                </li>
                <li className="flex items-start space-x-2">
                  <span className="text-emerald-500 font-bold">•</span>
                  <span><strong>Insulated Taped Storage:</strong> Direct cold delivery to certified battery shredders under argon blanket.</span>
                </li>
              </ul>
            </div>
          </div>

          <div className="mt-6 text-center">
            <Link
              href="/safety-hub"
              className="inline-flex items-center space-x-2 text-xs font-bold text-emerald-400 hover:text-emerald-300"
            >
              <span>Explore the Vernacular Audio Safety Knowledge Hub</span>
              <span>→</span>
            </Link>
          </div>
        </section>

      </main>

      {/* Footer */}
      <footer className="border-t border-slate-800 bg-slate-950 py-10 text-xs text-slate-500">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center space-x-3">
            <div className="w-8 h-8 rounded-lg bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
              ♻️
            </div>
            <div>
              <span className="font-bold text-slate-300 block">Kabadiwala Connect Platform</span>
              <span>Smart India Hackathon 2026 Solution • CPCB EPR Compliant</span>
            </div>
          </div>

          <div className="flex flex-wrap gap-6 text-slate-400 font-medium">
            <Link href="/portal" className="hover:text-emerald-400">Recycler Marketplace</Link>
            <Link href="/handovers" className="hover:text-emerald-400">Handover Verifier</Link>
            <Link href="/epr-audit" className="hover:text-emerald-400">EPR Certificates</Link>
            <Link href="/safety-hub" className="hover:text-emerald-400">Safety Hub</Link>
            <Link href="/admin" className="hover:text-emerald-400">SPCB Telemetry</Link>
          </div>
        </div>
      </footer>
    </div>
  );
}
