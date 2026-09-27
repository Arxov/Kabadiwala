# ♻️ Kabadiwala Connect – Smart India Hackathon (SIH 2026)
### *Bringing the Informal Collector into the Formal Recycling Chain*

[![CPCB EPR Compliant](https://img.shields.io/badge/CPCB%20EPR-E--Waste%20Rules%202022-emerald?style=for-the-badge)](https://cpcb.nic.in)
[![Flutter Vernacular App](https://img.shields.io/badge/Mobile-Flutter%203%20%7C%20Drift%20SQLite%20%7C%20TTS-blue?style=for-the-badge)](https://flutter.dev)
[![Next.js 14 Portal](https://img.shields.io/badge/Web-Next.js%2014%20%7C%20Dexie%20IndexedDB%20%7C%20Leaflet-black?style=for-the-badge)](https://nextjs.org)
[![Zero Phantom Credits](https://img.shields.io/badge/Chain--of--Custody-Haversine%20GPS%20%2B%20SHA--256-purple?style=for-the-badge)](#)

---

## 📌 Executive Summary & Problem Context

India generates upwards of **1.71 million metric tonnes** of electronic waste annually, ranking among the top five e-waste generating nations globally. Despite progressive environmental legislation under the **E-Waste (Management) Rules 2022**, over **90% to 95% of domestic e-waste collection and dismantling remains trapped in the informal sector**.

This status quo produces four compounding crises:
1. **Economic Exploitation of Informal Collectors (*Kabadiwalas*)**: Local aggregators and informal middlemen exploit low-literacy collectors through rigged mechanical spring scales, opaque pricing, and arbitrary payment deductions, capturing up to 60% of the material's market value.
2. **Backyard Processing & Severe Health Disasters**: Informal handlers resort to hazardous open-air cable burning (emitting deadly polychlorinated dibenzo-p-dioxins and furans), open cyanide/acid leaching of PCBs into local rivers and soil, CRT vacuum implosions (releasing toxic lead and phosphor dust), and Li-ion battery punctures causing violent thermal runaway fires.
3. **National Critical Minerals Security**: Strategic critical minerals vital to India's semiconductor and electric vehicle missions—such as **Lithium (Li), Cobalt (Co), Neodymium (Nd), Tantalum (Ta), Gallium (Ga), and Indium (In)**—are permanently lost or contaminated in backyard acid dumps instead of being recovered at high yields by certified hydrometallurgical smelters.
4. **CPCB/SPCB Extended Producer Responsibility (EPR) Fraud**: Formal recyclers struggle to procure verified domestic feedstock to fulfill brand compliance quotas (e.g., Dell, HP, Samsung, Lenovo), leading to a parallel market of "phantom EPR paper certificates" with zero traceable physical scrap collection.

---

## 💡 The Solution: Kabadiwala Connect

**Kabadiwala Connect** provides an end-to-end digital and physical verification bridge linking informal collectors with government-authorized (CPCB/SPCB) recyclers through two synchronized platforms:

```
┌────────────────────────────────────────────────────────┐
│     📱 Low-Literacy Mobile Flutter App (Collector)     │
│   • Hindi, Marathi & English Vernacular Interface      │
│   • On-Device Speech Narration (flutter_tts)           │
│   • Tactile Weight Sliders & Preset Pills (5-50 kg)    │
│   • Camera Photo SHA-256 Fingerprinting                │
│   • Dynamic QR Code with GPS Coordinates & Timestamp   │
│   • Offline-First Resilience (Drift SQLite DB)         │
└───────────────────────────┬────────────────────────────┘
                            │
              Dynamic Proximity Handshake
                  (≤ 150m GPS Geofence)
                            │
┌───────────────────────────▼────────────────────────────┐
│      🌐 Next.js 14 Recycler & Telemetry Web Portal     │
│   • Leaflet GIS Spatial Scrap Clustering               │
│   • Digital Handover Verifier (Haversine Proximity)    │
│   • Industrial Scale Discrepancy Gate (±10% Bounds)   │
│   • CPCB Form 6 EPR Chain-of-Custody Certificates      │
│   • Multilingual Vernacular Audio Safety Hub           │
│   • SPCB/CPCB Real-Time Mass Balance & Anomaly Monitor │
└────────────────────────────────────────────────────────┘
```

---

## 📱 Deliverable 1: Mobile Flutter Application (`mobile/`)

Designed specifically for informal waste pickers with limited textual literacy:

| Feature | Low-Literacy Innovation & Technical Implementation |
|---|---|
| **Vernacular Audio** | One-tap Text-to-Speech (`flutter_tts`) narrating current scrap rates, lot valuations, and warnings in **Hindi, Marathi, and English**. |
| **AI Material Scanner** | On-device photo capture with **AI category classification (89% confidence)** and low-literacy human confirmation buttons (`[✓ सही है / Confirm]` / `[✎ बदलना है / Change]`). |
| **No-Type Lot Wizard** | Visual scrap picker (PCBs, Copper Cables, Li-ion Batteries, CRTs, Motors), on-device camera simulation with **SHA-256 photo hashing**, and tactile weight sliders with preset pills (`5kg`, `10kg`, `25kg`, `50kg`). |
| **Live Price Board** | Real-time market rates (₹/kg) across 7 e-waste categories with interactive 30-day graphical trend charts (`fl_chart`). |
| **Explainable Matching** | Distance-sorted directory of authorized CPCB facilities with **transparent recommendation score breakdowns** ("Why this recycler?") and instant one-touch phone dialers. |
| **Tamper-Proof Handover** | Generates dynamic HMAC-signed QR codes encoding Lot UUID, GPS lat/lng, accuracy radius, declared weight, and image hash. |
| **Visual Earnings Ledger** | High-contrast financial balance cards showing **+79% surplus over informal middlemen**, with transparent settlement badges (`Settled - Cash`, `Settled - UPI`, `Pending`). |
| **Pictorial Safety Hub** | High-impact danger cards with audio warnings alerting collectors to fatal backyard hazards (toxic fumes, acid burns, battery fires). |
| **Offline-First Drift DB** | Built on reactive SQLite (`drift`) with queued background sync (`workmanager`) guaranteeing zero data loss in remote collection scrap yards. |

---

## 🌐 Deliverable 2: Comprehensive Next.js 14 Platform (`recycler-portal/`)

A production-ready responsive web application addressing all stakeholder requirements:

### 1. Public Impact Hub & Solution Showcase (`/`)
- **Macro Impact Ticker**: Real-time counter of formal e-waste collected, registered collectors, and toxic dioxins diverted.
- **E-Waste Rules 2022 & Critical Minerals**: Interactive strategy explorer detailing the formal recovery of Gold (Au), Palladium (Pd), Lithium (Li), Cobalt (Co), and Neodymium (Nd).
- **Interactive 100 kg Unit Economics Calculator**: Live reactive weight slider demonstrating how collectors achieve a **+79.1% net income gain** (₹14,520 formal vs ₹7,475 informal middleman).
- **Public Live Price Board**: Searchable, city-filtered benchmark price board with Web Speech API audio narration.

### 2. Authorized Recycler Marketplace & Lot Discovery (`/portal` & `/recycler`)
- **Interactive Leaflet GIS Mapping**: Live visual map clustering available scrap lots, pickup radiuses, and authorized recycler facilities across Pune/Mumbai.
- **Explainable Recycler Matching**: Transparent compatibility scoring (e.g. 94% Match breakdown for CPCB license match, doorstep EV route, and high-purity feedstock).
- **9-Stage Transaction State Machine Visualizer (`TransactionTimeline.tsx`)**: Real-time lifecycle tracking across all 9 protocol stages from on-device Drift draft to CPCB Form 6 credit issuance.
- **Material & Weight Filtering**: Instant sorting by category (PCBs, Cables, Batteries, CRTs, Motors) and batch size.
- **Competitive Quoting Modal (`LotQuotingModal.tsx`)**: Enables licensed recyclers to place direct competitive purchase bids with doorstep EV pickup guarantees.

### 3. Digital Handover Verification Hub (`/handovers`)
- **Embedded Verifier Scanner (`QRVerifierScanner.tsx`)**: Decodes dynamic QR tokens from collectors' mobile devices.
- **Haversine GPS Geofencing**: Computes real-time physical distance between collector GPS and recycler facility; enforces a strict **≤150m proximity constraint** to eliminate phantom transactions.
- **Certified Scale Calibration**: Automatically validates declared weight vs industrial scale weight, flagging variances >10%.
- **Dual Confirmation Handshake**: Executes dual-party confirmation and signs immutable transaction receipts into local Dexie.js IndexedDB.
- **State Machine Progression**: Visual feedback through `TransactionTimeline` displaying active `HANDOVER_VERIFIED` stage status.

### 4. EPR Compliance & Digital Chain-of-Custody Register (`/epr-audit`)
- **Corporate Producer Target Tracking**: Real-time fulfillment progress for major electronics manufacturers (Dell: 87%, HP: 96%, Samsung: 87.5%, Lenovo: 88.5%).
- **Digital Chain-of-Custody Provenance**: Traces materials from original informal collection GPS coordinates to dismantling and hydrometallurgical smelting.
- **CPCB Certificate Generator (`EPRCertificateModal.tsx`)**: Generates and prints official Rule 13(1) Extended Producer Responsibility credit certificates complete with digital signatures and verification QR codes.

### 5. Vernacular Audio Safety Knowledge Hub (`/safety-hub`)
- **4 Fatal Backyard Hazards**: In-depth pictorial hazard breakdowns (Open Cable Burning, Acid Leaching, CRT Smashing, Li-ion Battery Puncture).
- **Web Speech Synthesis Audio Player**: Trilingual audio guidance in Hindi (`hi-IN`), Marathi (`mr-IN`), and English (`en-IN`).
- **Economic Loss Comparisons**: Highlights financial losses of backyard methods (e.g., burning copper loses 15% metal weight = ₹3,700 loss per 50 kg).
- **Safety Equipment Lending Library**: Free protective gear depots (respirators, thermal gloves, acid-resistant aprons).

### 6. SPCB / CPCB Regulatory Telemetry, Fraud Detection & Arbitration (`/admin`)
- **Real-Time Mass-Balance Model**: Tracks material balance across 4 stages (142.5 MT Ingestion → 141.8 MT Mechanical Dismantling → 138.2 MT Refined Minerals → 3.6 MT TSDF Inert Slag) to ensure zero unauthorized leakage.
- **Algorithmic Anomaly Outlier Table (`AnomalyMonitorTable.tsx`)**: Automated regulatory rules flagging weight variances >15%, price spikes >35%, and geofence breaches >150 meters.
- **Dispute Resolution & Arbitration Console (`DisputeResolutionPanel.tsx`)**: Regulatory oversight pipeline handling tickets across `OPEN`, `UNDER_REVIEW`, `RESOLVED`, and `REJECTED` states with investigation actions and formal notice issuance.
- **Structured Dataset & Provenance Inspector (`StructuredDatasetPanel.tsx`)**: Auditing inspector with explicit `FIELD | PLATFORM | DEMO` provenance tags, SHA-256 integrity verification, and one-click CSV/JSON export.
- **Audit Export**: One-click generation of CPCB compliance logs in CSV format.

---

## 📊 Comparative Unit Economics Model (100 kg Mixed E-Waste Batch)

| Parameter | Predatory Informal Middleman | Kabadiwala Connect Formal Chain | Net Gain / Impact |
|---|---|---|---|
| **Printed Circuit Boards (25 kg)** | ₹3,000 (₹120/kg flat) | ₹5,500 (₹220/kg high-grade) | **+₹2,500 (+83%)** |
| **Copper Cables (35 kg)** | ₹8,400 (₹240/kg after burning) | ₹16,800 (₹480/kg clean stripping) | **+₹8,400 (+100%)** |
| **Li-ion Batteries (15 kg)** | ₹750 (₹50/kg lead scrap rate) | ₹2,475 (₹165/kg black mass rate) | **+₹1,725 (+230%)** |
| **CRT / Displays (25 kg)** | -₹200 (dumping charge) | ₹625 (₹25/kg glass lead recovery) | **+₹825** |
| **Gross Collector Earnings** | ₹11,950 | ₹25,400 | **+₹13,450 (+112%)** |
| **Middleman Cut / Deductions** | -₹3,500 (29.3% arbitrary fee) | ₹0 (Zero middleman fee) | **₹3,500 saved** |
| **Transport / Health Cost** | -₹975 (self-cartage & toxic burns) | -₹1,200 (doorstep EV collection) | **Safe doorstep service** |
| **Net Income in Collector Pocket** | **₹7,475** | **₹24,200** | **+₹16,725 (+223% Realized Net)** |

---

## 🚀 Getting Started & Local Development

### Prerequisites
- **Node.js**: v18.17.0+ or v20.x
- **npm** or **pnpm**
- **Flutter SDK**: v3.19+ (with Android Studio / Xcode for mobile emulation)

### 1. Running the Recycler Portal (Web)
```bash
# Navigate to web platform directory
cd recycler-portal

# Install dependencies
npm install

# Start local Next.js development server
npm run dev

# Open in browser
# http://localhost:3000
```

### 2. Building the Web Platform for Production
```bash
cd recycler-portal
npm run build
npm run start
```

### 3. Running the Collector Mobile App (Flutter)
```bash
# Navigate to mobile application directory
cd mobile

# Fetch Flutter dependencies
flutter pub get

# Generate Drift SQLite and Localization models
dart run build_runner build --delete-conflicting-outputs
flutter gen-l10n

# Launch on connected mobile device or emulator
flutter run
```

---

## 🛡️ Regulatory & Environmental Compliance Standards
- **Government of India**: Ministry of Environment, Forest and Climate Change (MoEFCC).
- **CPCB Notification**: E-Waste (Management) Rules, 2022 (Schedule I & Schedule III).
- **Hazardous Waste**: Hazardous and Other Wastes (Management and Transboundary Movement) Rules, 2016.
- **Data Protection**: Digital Personal Data Protection Act (DPDP Act 2023) compliant client-side hashing.

---

*Developed for the **Smart India Hackathon (SIH 2026)**.*
