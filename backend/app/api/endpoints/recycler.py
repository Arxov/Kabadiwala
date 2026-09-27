from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any
from app.db.session import get_db
from app.core.config import settings
import jwt
from datetime import datetime, timedelta, timezone
from app.models.all import MaterialLot, Transaction, HandoverRecord

router = APIRouter()

@router.get("/lots/incoming")
async def get_incoming_lots(status: str = None, material: str = None, db: Session = Depends(get_db)) -> Any:
    query = db.query(MaterialLot)
    if status:
        query = query.filter(MaterialLot.status == status)
    if material:
        query = query.filter(MaterialLot.category == material)
    return {"lots": query.all()}

@router.post("/lots/{lot_id}/quote")
async def send_quote_to_collector(lot_id: str, payload: dict, db: Session = Depends(get_db)) -> Any:
    new_txn = Transaction(
        lot_id=lot_id,
        quoted_price=payload.get("price"),
        status="quote_sent"
    )
    db.add(new_txn)
    db.commit()
    db.refresh(new_txn)
    return {"status": "quote_sent", "txn_id": str(new_txn.txn_id)}

@router.post("/handover/{handover_id}/confirm")
async def confirm_handover(handover_id: str, payload: dict, db: Session = Depends(get_db)) -> Any:
    handover = db.query(HandoverRecord).filter(HandoverRecord.handover_id == handover_id).first()
    if not handover:
        raise HTTPException(status_code=404, detail="Handover not found")
    handover.recycler_ok = True
    db.commit()
    return {"status": "handover_completed"}

@router.get("/analytics")
async def get_analytics(db: Session = Depends(get_db)) -> Any:
    return {"volumes": {}, "revenue": {}, "trend_charts": []}

@router.post("/handover/{txn_id}/generate-qr")
async def generate_handover_qr(txn_id: str, db: Session = Depends(get_db)) -> Any:
    # Generates a time-limited JWT for the collector to scan
    txn = db.query(Transaction).filter(Transaction.txn_id == txn_id).first()
    if not txn:
        raise HTTPException(status_code=404, detail="Transaction not found")
        
    payload = {
        "txn_id": txn_id,
        "recycler_id": str(txn.recycler_id),
        "exp": datetime.now(timezone.utc) + timedelta(minutes=15)
    }
    token = jwt.encode(payload, settings.SECRET_KEY, algorithm=settings.ALGORITHM)
    return {"qr_data": token}
