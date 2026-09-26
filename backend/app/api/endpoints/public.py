from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import Any
from app.db.session import get_db
from app.models.all import HandoverRecord

router = APIRouter()

@router.get("/verify/{reference_number}")
async def verify_handover(reference_number: str, db: Session = Depends(get_db)) -> Any:
    # Publicly verify handover record without auth
    record = db.query(HandoverRecord).filter(HandoverRecord.reference_number == reference_number).first()
    if not record:
        raise HTTPException(status_code=404, detail="Record not found")
    
    return {
        "reference_number": record.reference_number, 
        "status": "verified" if record.recycler_ok else "pending", 
        "data": {
            "weight": record.actual_weight_kg,
            "created_at": record.created_at
        }
    }
