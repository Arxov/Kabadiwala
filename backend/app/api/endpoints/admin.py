from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.all import HandoverRecord, Recycler, SyncQueue

router = APIRouter()

@router.get("/dashboard/stats")
def get_dashboard_stats(db: Session = Depends(get_db)):
    # Total handover volume (kg)
    total_volume = db.query(func.sum(HandoverRecord.actual_weight_kg)).scalar() or 0
    
    # Active recyclers
    active_recyclers = db.query(Recycler).filter(Recycler.is_active == True).count()
    
    # Anomalies detected (e.g. sync errors)
    anomalies = db.query(SyncQueue).filter(SyncQueue.status == 'failed').count()
    
    return {
        "totalHandoverVolume": total_volume,
        "activeRecyclers": active_recyclers,
        "anomaliesDetected": anomalies
    }
