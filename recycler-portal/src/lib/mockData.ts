import { db, Lot } from './db';

export interface ScrapMaterial {
  id: string;
  name: string;
  hindiName: string;
  marathiName: string;
  currentPrice: number;
  minPrice: number;
  maxPrice: number;
  change24h: number;
  unit: string;
  criticalMinerals: string[];
  hazardAverted: string;
  eprCategory: string;
  historicalTrend: { day: string; price: number }[];
}

export const SCRAP_MATERIALS: ScrapMaterial[] = [
  {
    id: 'pcb',
    name: 'Printed Circuit Boards (PCB)',
    hindiName: 'सर्किट बोर्ड (PCB)',
    marathiName: 'सर्किट बोर्ड (PCB)',
    currentPrice: 220,
    minPrice: 185,
    maxPrice: 260,
    change24h: 12,
    unit: 'kg',
    criticalMinerals: ['Gold (Au)', 'Silver (Ag)', 'Palladium (Pd)', 'Tantalum (Ta)', 'Copper (Cu)'],
    hazardAverted: 'Cyanide & Nitric Acid Backyard Leaching into Groundwater',
    eprCategory: 'ITEW1 - Mainframe & Server PCBs',
    historicalTrend: [
      { day: 'Day 1', price: 195 },
      { day: 'Day 5', price: 200 },
      { day: 'Day 10', price: 205 },
      { day: 'Day 15', price: 210 },
      { day: 'Day 20', price: 214 },
      { day: 'Day 25', price: 218 },
      { day: 'Day 30', price: 220 },
    ],
  },
  {
    id: 'cables',
    name: 'Copper Cables & Wires',
    hindiName: 'तांबे के तार / केबल',
    marathiName: 'तांब्याच्या तारा / केबल्स',
    currentPrice: 480,
    minPrice: 440,
    maxPrice: 520,
    change24h: 25,
    unit: 'kg',
    criticalMinerals: ['High-Purity Electrolytic Copper (Cu 99.9%)'],
    hazardAverted: 'Open-Air Burning Toxic Dioxin & Furan Atmospheric Emissions',
    eprCategory: 'CEEW4 - Telecom & Power Transmission Wires',
    historicalTrend: [
      { day: 'Day 1', price: 435 },
      { day: 'Day 5', price: 445 },
      { day: 'Day 10', price: 458 },
      { day: 'Day 15', price: 465 },
      { day: 'Day 20', price: 472 },
      { day: 'Day 25', price: 476 },
      { day: 'Day 30', price: 480 },
    ],
  },
  {
    id: 'batteries',
    name: 'Lithium-Ion Battery Packs',
    hindiName: 'लिथियम बैटरी',
    marathiName: 'लिथियम बॅटरी',
    currentPrice: 140,
    minPrice: 115,
    maxPrice: 165,
    change24h: -5,
    unit: 'kg',
    criticalMinerals: ['Lithium (Li)', 'Cobalt (Co)', 'Nickel (Ni)', 'Manganese (Mn)'],
    hazardAverted: 'Uncontrolled Thermal Runaway Fire & Hydrofluoric Acid Vapor',
    eprCategory: 'BWMR 2022 - Portable Rechargeable Li-Ion',
    historicalTrend: [
      { day: 'Day 1', price: 148 },
      { day: 'Day 5', price: 145 },
      { day: 'Day 10', price: 144 },
      { day: 'Day 15', price: 141 },
      { day: 'Day 20', price: 139 },
      { day: 'Day 25', price: 138 },
      { day: 'Day 30', price: 140 },
    ],
  },
  {
    id: 'crt',
    name: 'CRT Monitors & Glass Tubes',
    hindiName: 'सीआरटी टीवी / मॉनिटर',
    marathiName: 'सीआरटी टीव्ही / मॉनिटर',
    currentPrice: 32,
    minPrice: 25,
    maxPrice: 38,
    change24h: 2,
    unit: 'kg',
    criticalMinerals: ['Lead (Pb) recovery', 'Barium Glass Cullet'],
    hazardAverted: 'Explosive Implosion & Airborne Toxic Lead Phosphor Inhalation',
    eprCategory: 'CEEW1 - Television Sets & Cathode Ray Displays',
    historicalTrend: [
      { day: 'Day 1', price: 28 },
      { day: 'Day 5', price: 29 },
      { day: 'Day 10', price: 30 },
      { day: 'Day 15', price: 30 },
      { day: 'Day 20', price: 31 },
      { day: 'Day 25', price: 31 },
      { day: 'Day 30', price: 32 },
    ],
  },
  {
    id: 'lcd',
    name: 'LCD / LED Display Panels',
    hindiName: 'एलसीडी / एलईडी स्क्रीन',
    marathiName: 'एलसीडी / एलईडी स्क्रीन',
    currentPrice: 78,
    minPrice: 65,
    maxPrice: 92,
    change24h: 4,
    unit: 'kg',
    criticalMinerals: ['Indium Tin Oxide (In)', 'Gallium (Ga) in Backlights'],
    hazardAverted: 'Mercury Lamp Vapor Release from CCFL Backlights',
    eprCategory: 'CEEW2 - Liquid Crystal Display Televisions',
    historicalTrend: [
      { day: 'Day 1', price: 71 },
      { day: 'Day 5', price: 73 },
      { day: 'Day 10', price: 74 },
      { day: 'Day 15', price: 75 },
      { day: 'Day 20', price: 76 },
      { day: 'Day 25', price: 77 },
      { day: 'Day 30', price: 78 },
    ],
  },
  {
    id: 'motors',
    name: 'E-Waste Motors & Alternators',
    hindiName: 'मोटर और ट्रांसफॉर्मर',
    marathiName: 'मोटार आणि ट्रान्सफॉर्मर',
    currentPrice: 105,
    minPrice: 85,
    maxPrice: 125,
    change24h: 8,
    unit: 'kg',
    criticalMinerals: ['Neodymium (Nd)', 'Dysprosium (Dy)', 'Copper Stator Winding'],
    hazardAverted: 'Acid washing of commutators and landfilling of heavy metals',
    eprCategory: 'LREE1 - Rare Earth Permanent Magnet Devices',
    historicalTrend: [
      { day: 'Day 1', price: 94 },
      { day: 'Day 5', price: 97 },
      { day: 'Day 10', price: 99 },
      { day: 'Day 15', price: 101 },
      { day: 'Day 20', price: 103 },
      { day: 'Day 25', price: 104 },
      { day: 'Day 30', price: 105 },
    ],
  },
  {
    id: 'plastics',
    name: 'Brominated Flame Retardant Plastics',
    hindiName: 'ई-कचरा प्लास्टिक',
    marathiName: 'ई-कचरा प्लास्टिक',
    currentPrice: 24,
    minPrice: 18,
    maxPrice: 30,
    change24h: 0,
    unit: 'kg',
    criticalMinerals: ['Engineering ABS / Polycarbonate Resins'],
    hazardAverted: 'Backyard Burning into Dioxins & Pelleting into Food Utensils',
    eprCategory: 'PLREC - High Impact Polystyrene & ABS',
    historicalTrend: [
      { day: 'Day 1', price: 23 },
      { day: 'Day 5', price: 24 },
      { day: 'Day 10', price: 24 },
      { day: 'Day 15', price: 23.5 },
      { day: 'Day 20', price: 24 },
      { day: 'Day 25', price: 24 },
      { day: 'Day 30', price: 24 },
    ],
  },
];

export interface RecyclerFacility {
  id: string;
  name: string;
  licenseNumber: string;
  authority: string;
  address: string;
  city: string;
  lat: number;
  lng: number;
  rating: number;
  capacityTonPerMonth: number;
  pickupAvailable: boolean;
  minPickupKg: number;
  contactPhone: string;
  acceptedMaterials: string[];
}

export const CPCB_RECYCLERS: RecyclerFacility[] = [
  {
    id: 'rec-cpcb-01',
    name: 'EcoMetals CPCB E-Waste Dismantling Hub',
    licenseNumber: 'CPCB-REG-2022-MH-892',
    authority: 'Central Pollution Control Board',
    address: 'Plot 42, Sector 7, Bhosari MIDC, Pune',
    city: 'Pune',
    lat: 18.6279,
    lng: 73.8345,
    rating: 4.9,
    capacityTonPerMonth: 250,
    pickupAvailable: true,
    minPickupKg: 20,
    contactPhone: '+91 98220 12345',
    acceptedMaterials: ['pcb', 'cables', 'batteries', 'motors'],
  },
  {
    id: 'rec-cpcb-02',
    name: 'Maharashtra GreenTech Urban Miners Pvt Ltd',
    licenseNumber: 'MPCB-DISM-2023-PUN-041',
    authority: 'Maharashtra Pollution Control Board',
    address: 'Plot 18, Phase II, Chakan Industrial Area, Pune',
    city: 'Pune',
    lat: 18.7562,
    lng: 73.8594,
    rating: 4.8,
    capacityTonPerMonth: 400,
    pickupAvailable: true,
    minPickupKg: 30,
    contactPhone: '+91 98220 98765',
    acceptedMaterials: ['pcb', 'crt', 'lcd', 'plastics'],
  },
  {
    id: 'rec-cpcb-03',
    name: 'Swachh Bharat Electronic Recyclers Ltd',
    licenseNumber: 'CPCB-EPR-2024-MH-119',
    authority: 'Central Pollution Control Board',
    address: 'Dhadge Industrial Estate, Pune-Solapur Road, Hadapsar, Pune',
    city: 'Pune',
    lat: 18.5089,
    lng: 73.9259,
    rating: 4.7,
    capacityTonPerMonth: 180,
    pickupAvailable: false,
    minPickupKg: 50,
    contactPhone: '+91 98220 33445',
    acceptedMaterials: ['cables', 'motors', 'batteries'],
  },
  {
    id: 'rec-cpcb-04',
    name: 'Western India E-Waste Refining Complex',
    licenseNumber: 'CPCB-REG-2021-MH-003',
    authority: 'Central Pollution Control Board',
    address: 'TTC Industrial Area, MIDC Turbhe, Navi Mumbai',
    city: 'Navi Mumbai',
    lat: 19.0688,
    lng: 73.0189,
    rating: 4.9,
    capacityTonPerMonth: 850,
    pickupAvailable: true,
    minPickupKg: 100,
    contactPhone: '+91 98200 44332',
    acceptedMaterials: ['pcb', 'batteries', 'cables', 'lcd', 'motors'],
  },
];

export interface SampleLotItem {
  id: string;
  lotRef: string;
  collectorName: string;
  collectorId: string;
  collectorPhone: string;
  materialType: string;
  categoryLabel: string;
  weightKg: number;
  estimatedValue: number;
  locationName: string;
  lat: number;
  lng: number;
  status: 'available' | 'quoted' | 'in_handover' | 'verified';
  bestQuote?: number;
  quotesCount: number;
  createdAt: string;
  photoUrl?: string;
  sha256Hash: string;
}

export const INITIAL_SAMPLE_LOTS: SampleLotItem[] = [
  {
    id: 'lot-8921',
    lotRef: 'LOT-2026-MH-8921',
    collectorName: 'Ramesh Shinde',
    collectorId: 'c-pun-0042',
    collectorPhone: '+91 98231 10042',
    materialType: 'pcb',
    categoryLabel: 'Printed Circuit Boards (PCB)',
    weightKg: 24.5,
    estimatedValue: 5390,
    locationName: 'Kasba Peth, Old Pune',
    lat: 18.5204,
    lng: 73.8567,
    status: 'available',
    bestQuote: 5450,
    quotesCount: 3,
    createdAt: '2026-09-27T08:30:00Z',
    sha256Hash: 'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855',
  },
  {
    id: 'lot-8922',
    lotRef: 'LOT-2026-MH-8922',
    collectorName: 'Anil Jadhav',
    collectorId: 'c-pun-0089',
    collectorPhone: '+91 98232 20089',
    materialType: 'cables',
    categoryLabel: 'Copper Cables',
    weightKg: 38.0,
    estimatedValue: 18240,
    locationName: 'Pimpri Market Yard',
    lat: 18.6298,
    lng: 73.8012,
    status: 'available',
    bestQuote: 18450,
    quotesCount: 4,
    createdAt: '2026-09-27T09:15:00Z',
    sha256Hash: 'a1b2c3d4e5f678901234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: 'lot-8923',
    lotRef: 'LOT-2026-MH-8923',
    collectorName: 'Sunita Patil',
    collectorId: 'c-pun-0112',
    collectorPhone: '+91 98233 30112',
    materialType: 'batteries',
    categoryLabel: 'Li-ion Batteries',
    weightKg: 15.0,
    estimatedValue: 2100,
    locationName: 'Khadki Bazar',
    lat: 18.5679,
    lng: 73.8341,
    status: 'quoted',
    bestQuote: 2175,
    quotesCount: 2,
    createdAt: '2026-09-27T10:00:00Z',
    sha256Hash: 'b2c3d4e5f6a178901234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: 'lot-8924',
    lotRef: 'LOT-2026-MH-8924',
    collectorName: 'Ganesh More',
    collectorId: 'c-pun-0055',
    collectorPhone: '+91 98234 40055',
    materialType: 'crt',
    categoryLabel: 'CRT Monitors',
    weightKg: 85.0,
    estimatedValue: 2720,
    locationName: 'Hadapsar Gadital',
    lat: 18.4988,
    lng: 73.9312,
    status: 'available',
    bestQuote: 2800,
    quotesCount: 1,
    createdAt: '2026-09-27T10:45:00Z',
    sha256Hash: 'c3d4e5f6a1b278901234567890abcdef1234567890abcdef1234567890abcdef',
  },
  {
    id: 'lot-8925',
    lotRef: 'LOT-2026-MH-8925',
    collectorName: 'Ramesh Shinde',
    collectorId: 'c-pun-0042',
    collectorPhone: '+91 98231 10042',
    materialType: 'motors',
    categoryLabel: 'Motors & Alternators',
    weightKg: 45.0,
    estimatedValue: 4725,
    locationName: 'Swargate Bus Depot Area',
    lat: 18.5018,
    lng: 73.8582,
    status: 'verified',
    bestQuote: 4850,
    quotesCount: 3,
    createdAt: '2026-09-26T15:20:00Z',
    sha256Hash: 'd4e5f6a1b2c378901234567890abcdef1234567890abcdef1234567890abcdef',
  },
];

export interface AnomalyRecord {
  id: string;
  lotRef: string;
  anomalyType: 'WEIGHT_VARIANCE' | 'PRICE_OUTLIER' | 'GEOFENCE_BREACH' | 'RAPID_SPIKE';
  severity: 'HIGH' | 'MEDIUM' | 'LOW';
  description: string;
  declaredValue: string;
  verifiedValue: string;
  timestamp: string;
  status: 'PENDING_AUDIT' | 'INVESTIGATING' | 'RESOLVED_REJECTED' | 'CLEARED';
}

export const ANOMALY_ALERTS: AnomalyRecord[] = [
  {
    id: 'anom-101',
    lotRef: 'LOT-2026-MH-8715',
    anomalyType: 'WEIGHT_VARIANCE',
    severity: 'HIGH',
    description: 'Scale weight 114.5 kg diverges by +48% from collector declaration of 77.0 kg',
    declaredValue: '77.0 kg',
    verifiedValue: '114.5 kg (+48.7%)',
    timestamp: '2026-09-27 10:14 AM',
    status: 'INVESTIGATING',
  },
  {
    id: 'anom-102',
    lotRef: 'LOT-2026-MH-8692',
    anomalyType: 'PRICE_OUTLIER',
    severity: 'MEDIUM',
    description: 'Offered quote of ₹720/kg for Cables exceeds CPCB prevailing cap of ₹520/kg by 38.4%',
    declaredValue: '₹480/kg benchmark',
    verifiedValue: '₹720/kg quote (+38.4%)',
    timestamp: '2026-09-27 09:30 AM',
    status: 'PENDING_AUDIT',
  },
  {
    id: 'anom-103',
    lotRef: 'LOT-2026-MH-8640',
    anomalyType: 'GEOFENCE_BREACH',
    severity: 'HIGH',
    description: 'Handover handshake GPS is 14.8 km away from lot registration coordinates',
    declaredValue: '18.5204 N, 73.8567 E',
    verifiedValue: '18.6512 N, 73.7421 E (14.8 km)',
    timestamp: '2026-09-26 04:55 PM',
    status: 'RESOLVED_REJECTED',
  },
  {
    id: 'anom-104',
    lotRef: 'LOT-2026-MH-8511',
    anomalyType: 'RAPID_SPIKE',
    severity: 'LOW',
    description: 'Single collector generated 8 separate lots within 12 minutes (rapid intake alert)',
    declaredValue: 'Normal: 1-2 lots/day',
    verifiedValue: '8 lots / 12 mins',
    timestamp: '2026-09-25 11:20 AM',
    status: 'CLEARED',
  },
];

export async function seedDatabaseIfEmpty() {
  if (typeof window === 'undefined') return;
  try {
    const count = await db.lots.count();
    if (count === 0) {
      const records: Lot[] = INITIAL_SAMPLE_LOTS.map((s) => ({
        id: s.id,
        status: s.status,
        updated_at: s.createdAt,
        collector_id: s.collectorId,
        material_type: s.materialType,
        estimated_weight_kg: s.weightKg,
        estimated_value_inr: s.estimatedValue,
        location_lat: s.lat,
        location_lng: s.lng,
      }));
      await db.lots.bulkAdd(records);
    }
  } catch (err) {
    console.warn('Dexie seeding notice:', err);
  }
}
