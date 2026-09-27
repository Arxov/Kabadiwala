from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any, List
from pydantic import BaseModel
import uuid
from app.db.session import get_db
from app.core.config import settings
import jwt
from app.models.all import Collector, MaterialLot, PriceData, Recycler, Transaction

router = APIRouter()

from pydantic import BaseModel, Field
from typing import Optional

class LotCreate(BaseModel):
    reference_code: Optional[str] = None
    collector_id: str
    category: str = "OTHER"
    subcategory: Optional[str] = None
    weight_kg: float = Field(default=0.0, ge=0.0)
    condition: str = "mixed"
    source_type: str = "residential"


class OTPRequest(BaseModel):
    phone_number: str

class OTPVerify(BaseModel):
    phone_number: str
    otp: str

@router.post("/auth/otp/send")
async def send_otp(req: OTPRequest) -> Any:
    # Stub: Send OTP via MSG91
    return {"status": "success", "message": "OTP sent"}

@router.post("/auth/otp/verify")
async def verify_otp(req: OTPVerify) -> Any:
    # Stub: Verify OTP and return tokens
    return {
        "access_token": "stub_access_token",
        "refresh_token": "stub_refresh_token"
    }

@router.post("/auth/refresh")
async def refresh_tokens() -> Any:
    return {"access_token": "new_stub_token"}

@router.get("/prices/board")
async def get_price_board(category: str = None, lat: float = None, lng: float = None, radius_km: int = 50, db: Session = Depends(get_db)) -> Any:
    query = db.query(PriceData)
    if category:
        query = query.filter(PriceData.category == category)
    prices = query.all()
    return {"prices": prices}

@router.get("/prices/trends")
async def get_price_trends(category: str, days: int = 30, lat: float = None, lng: float = None) -> Any:
    return {"trends": []}

@router.post("/lots")
async def create_lot(payload: LotCreate, db: Session = Depends(get_db)) -> Any:
    """
    Create a new material lot.
    Validates payload to prevent type errors (e.g., string for weight_kg) and negative weights.
    """
    try:
        new_lot = MaterialLot(
            reference_code=payload.reference_code or str(uuid.uuid4())[:8],
            collector_id=payload.collector_id,
            category=payload.category,
            subcategory=payload.subcategory,
            weight_kg=payload.weight_kg,
            condition=payload.condition,
            source_type=payload.source_type,
            status="draft"
        )
    except Exception as e:
        raise HTTPException(status_code=400, detail=f"Invalid data: {str(e)}")
    db.add(new_lot)
    db.commit()
    db.refresh(new_lot)
    return {"lot_id": str(new_lot.lot_id)}

@router.get("/lots")
async def list_lots(db: Session = Depends(get_db)) -> Any:
    lots = db.query(MaterialLot).all()
    return {"lots": lots}

@router.get("/lots/{lot_id}")
async def get_lot(lot_id: str, db: Session = Depends(get_db)) -> Any:
    lot = db.query(MaterialLot).filter(MaterialLot.lot_id == lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")
    return lot

@router.put("/lots/{lot_id}")
async def update_lot(lot_id: str, payload: dict, db: Session = Depends(get_db)) -> Any:
    lot = db.query(MaterialLot).filter(MaterialLot.lot_id == lot_id).first()
    if not lot:
        raise HTTPException(status_code=404, detail="Lot not found")
    # FIX: Prevent mass assignment vulnerability
    allowed_fields = {"category", "subcategory", "weight_kg", "condition", "source_type"}
    for k, v in payload.items():
        if k in allowed_fields:
            setattr(lot, k, v)
    db.commit()
    db.refresh(lot)
    return lot

@router.post("/lots/{lot_id}/images")
async def upload_lot_image(lot_id: str) -> Any:
    return {"image_id": "stub_image_uuid"}

@router.post("/lots/{lot_id}/classify")
async def classify_lot(lot_id: str) -> Any:
    return {"ml_category": "PCB", "confidence": 0.92}

@router.get("/lots/{lot_id}/estimate")
async def estimate_lot_price(lot_id: str) -> Any:
    return {"estimate": [130, 150, 180], "unit": "kg"}

import math

def calculate_haversine(lat1: float, lon1: float, lat2: float, lon2: float) -> float:
    # Earth radius in kilometers
    R = 6371.0
    dlat = math.radians(lat2 - lat1)
    dlon = math.radians(lon2 - lon1)
    a = math.sin(dlat / 2)**2 + math.cos(math.radians(lat1)) * math.cos(math.radians(lat2)) * math.sin(dlon / 2)**2
    c = 2 * math.atan2(math.sqrt(a), math.sqrt(1 - a))
    return R * c

@router.get("/recyclers")
async def get_nearby_recyclers(lat: float, lng: float, material: str = None, radius_km: int = 50, db: Session = Depends(get_db)) -> Any:
    """
    Geospatial matching: Finds CPCB-authorized recyclers within the requested radius.
    Sorts them from closest to furthest.
    """
    query = db.query(Recycler).filter(Recycler.is_active == True)
    if material:
        # Filter by material using JSON contains or simple ILIKE for demo purposes
        query = query.filter(Recycler.materials_accepted.ilike(f"%{material}%"))
        
    all_recyclers = query.all()
    matched = []
    
    for r in all_recyclers:
        if not r.location:
            continue
        try:
            # Parse 'lat,lng' string
            r_lat, r_lng = map(float, r.location.split(','))
            dist = calculate_haversine(lat, lng, r_lat, r_lng)
            
            if dist <= radius_km:
                r_dict = r.__dict__.copy()
                r_dict.pop('_sa_instance_state', None)
                r_dict['distance_km'] = round(dist, 2)
                matched.append(r_dict)
        except Exception:
            pass # Skip malformed locations

    # Sort by closest distance
    matched.sort(key=lambda x: x['distance_km'])
    
    return {"recyclers": matched, "search_radius_km": radius_km, "match_count": len(matched)}

@router.post("/recyclers/{recycler_id}/quote")
async def request_quote(recycler_id: str, payload: dict) -> Any:
    return {"status": "quote_requested"}

@router.get("/transactions")
async def get_transactions(db: Session = Depends(get_db)) -> Any:
    txns = db.query(Transaction).all()
    return {"transactions": txns}

@router.post("/transactions/{txn_id}/confirm-handover")
async def confirm_handover(txn_id: str, payload: dict) -> Any:
    return {"status": "handover_confirmed"}

@router.get("/earnings/summary")
async def get_earnings_summary() -> Any:
    return {"total_earned": 5000, "pending": 1500}

@router.get("/earnings/ledger")
async def get_earnings_ledger() -> Any:
    return {"entries": []}

@router.get("/safety/guides")
async def get_safety_guides(lang: str = "hi", category: str = "BATTERY") -> Any:
    return {"guides": []}

from dateutil.parser import isoparse

@router.get("/sync")
async def sync_pull(since: str = None, db: Session = Depends(get_db)) -> Any:
    # FIX: Implemented actual 'since' filtering to prevent massive payload bombs on mobile app
    price_query = db.query(PriceData)
    recycler_query = db.query(Recycler).filter(Recycler.is_active == True)
    txn_query = db.query(Transaction)

    if since:
        try:
            since_dt = isoparse(since)
            # FIX: Properly fallback to created_at since PriceData lacks updated_at
            if hasattr(PriceData, 'updated_at'):
                price_query = price_query.filter(PriceData.updated_at >= since_dt)
            elif hasattr(PriceData, 'created_at'):
                price_query = price_query.filter(PriceData.created_at >= since_dt)
                
            if hasattr(Recycler, 'updated_at'):
                recycler_query = recycler_query.filter(Recycler.updated_at >= since_dt)
            elif hasattr(Recycler, 'created_at'):
                recycler_query = recycler_query.filter(Recycler.created_at >= since_dt)
                
            if hasattr(Transaction, 'updated_at'):
                txn_query = txn_query.filter(Transaction.updated_at >= since_dt)
            elif hasattr(Transaction, 'created_at'):
                txn_query = txn_query.filter(Transaction.created_at >= since_dt)
        except ValueError:
            pass # Ignore invalid date formats and return all for fallback

    # Add a hard limit to prevent OOM errors on large syncs
    prices = price_query.limit(200).all()
    recyclers = recycler_query.limit(100).all()
    txns = txn_query.limit(100).all()
    return {
        "delta": {
            "prices": prices,
            "recyclers": recyclers,
            "transactions": txns
        }
    }

@router.post("/sync/push")
async def sync_push(payload: dict, db: Session = Depends(get_db)) -> Any:
    ops = payload.get("pending_ops", [])
    results = []
    for op in ops:
        entity = op.get("entity")
        action = op.get("op")
        data = op.get("payload")
        
        try:
            if entity == "lot" and action == "create":
                new_lot = MaterialLot(
                    reference_code=data.get("reference_code", str(uuid.uuid4())[:8]),
                    collector_id=data.get("collector_id"), # FIX: Prevent orphaned lots on sync
                    category=data.get("category", "OTHER"),
                    subcategory=data.get("subcategory"),
                    weight_kg=data.get("weight_kg", 0.0),
                    status="draft"
                )
                db.add(new_lot)
                db.commit()
                results.append({"id": op.get("id"), "status": "success", "server_id": new_lot.lot_id})
            elif entity == "lot" and action == "update":
                lot = db.query(MaterialLot).filter(MaterialLot.lot_id == data.get("lot_id")).first()
                if lot:
                    # FIX: Prevent mass assignment vulnerability in sync
                    allowed_fields = {"category", "subcategory", "weight_kg", "condition", "source_type"}
                    for k, v in data.items():
                        if k in allowed_fields:
                            setattr(lot, k, v)
                    db.commit()
                    results.append({"id": op.get("id"), "status": "success"})
                else:
                    results.append({"id": op.get("id"), "status": "failed", "reason": "Not found"})
            else:
                results.append({"id": op.get("id"), "status": "ignored", "reason": "Unknown operation"})
        except Exception as e:
            db.rollback()
            results.append({"id": op.get("id"), "status": "failed", "reason": str(e)})

    from datetime import datetime, timezone
    return {"server_ts": datetime.now(timezone.utc).isoformat(), "op_results": results}

from pydantic import BaseModel
class QRScan(BaseModel):
    qr_data: str

@router.post("/handover/scan-qr")
async def scan_handover_qr(payload: QRScan, db: Session = Depends(get_db)) -> Any:
    try:
        from datetime import datetime, timezone
        data = jwt.decode(payload.qr_data, settings.SECRET_KEY, algorithms=[settings.ALGORITHM])
        txn_id = data.get("txn_id")
        
        txn = db.query(Transaction).filter(Transaction.txn_id == txn_id).first()
        if not txn:
            raise HTTPException(status_code=404, detail="Transaction not found")
            
        # Complete the handover
        txn.status = "completed"
        txn.completed_at = datetime.now(timezone.utc)
        
        # Log traceability event
        event = TraceabilityEvent(
            lot_id=txn.lot_id,
            txn_id=txn.txn_id,
            event_type="HANDOVER_COMPLETED",
            event_data={"method": "qr_scan", "recycler_id": str(txn.recycler_id)}
        )
        db.add(event)
        db.commit()
        return {"status": "success", "message": "Handover verified cryptographically."}
    except jwt.ExpiredSignatureError:
        raise HTTPException(status_code=400, detail="QR Code expired. Ask recycler to generate a new one.")
    except jwt.InvalidTokenError:
        raise HTTPException(status_code=400, detail="Invalid QR Code.")
