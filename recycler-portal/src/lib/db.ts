import Dexie, { Table } from 'dexie';

export interface Lot {
  id: string;
  status: string;
  updated_at: string;
  collector_id: string;
  material_type: string;
  estimated_weight_kg: number;
  estimated_value_inr: number;
}

export interface Quote {
  id: string;
  lot_id: string;
  status: string;
  updated_at: string;
  dirty: number; // 0 or 1 for boolean indexing
  price: number;
}

export interface Handover {
  id: string;
  lot_id: string;
  qr_payload: string;
  verified_at: string;
  dirty: number;
}

export interface SyncMeta {
  table_name: string;
  last_sync_token: string;
}

export class RecyclerDatabase extends Dexie {
  lots!: Table<Lot, string>;
  quotes!: Table<Quote, string>;
  handovers!: Table<Handover, string>;
  sync_meta!: Table<SyncMeta, string>;

  constructor() {
    super('RecyclerDB');
    this.version(1).stores({
      lots: 'id, status, updated_at, collector_id',
      quotes: 'id, lot_id, status, updated_at, dirty',
      handovers: 'id, lot_id, qr_payload, verified_at, dirty',
      sync_meta: 'table_name, last_sync_token'
    });
  }
}

export const db = new RecyclerDatabase();
