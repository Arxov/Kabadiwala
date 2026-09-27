from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from sqlalchemy import func
from app.db.session import get_db
from app.models.all import HandoverRecord, Recycler, SyncQueue, MaterialLot

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

@router.get("/dashboard/impact-metrics")
def get_impact_metrics(db: Session = Depends(get_db)):
    # Calculate total weight from all completed handovers
    total_volume = db.query(func.sum(HandoverRecord.actual_weight_kg)).scalar() or 0.0
    
    # E-waste impact conversion factors
    co2_saved_kg = total_volume * 1.44
    toxic_metals_diverted_kg = total_volume * 0.05
    trees_equivalent = co2_saved_kg / 21.0
    
    return {
        "total_volume_kg": round(total_volume, 2),
        "co2_saved_kg": round(co2_saved_kg, 2),
        "toxic_metals_diverted_kg": round(toxic_metals_diverted_kg, 2),
        "trees_equivalent": round(trees_equivalent, 1)
    }

@router.get("/dashboard/leaderboard")
def get_collector_leaderboard(db: Session = Depends(get_db)):
    # Get top 5 collectors by total weight (mocking collector names for demo simplicity)
    top_lots = db.query(
        MaterialLot.collector_id, 
        func.sum(MaterialLot.weight_kg).label("total_weight")
    ).group_by(MaterialLot.collector_id).order_by(func.sum(MaterialLot.weight_kg).desc()).limit(5).all()
    
    # Assign pseudo-random badges based on position and weight
    badges = ["Green Warrior 🌿", "Recycle Hero ♻️", "Copper King 🪙", "Earth Defender 🌎", "Eco Pioneer 💡"]
    
    leaderboard = []
    for idx, (collector_id, weight) in enumerate(top_lots):
        leaderboard.append({
            "rank": idx + 1,
            "collector_id": str(collector_id),
            "collector_name": f"Collector_{str(collector_id)[:4]}", # Pseudo-anonymized name for demo
            "total_weight_kg": round(weight or 0.0, 2),
            "badge": badges[idx] if idx < len(badges) else "Participant"
        })
        
    return {"leaderboard": leaderboard}
