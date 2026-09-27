from app.db.session import SessionLocal
from app.models.all import HandoverRecord, Recycler, SyncQueue
import uuid
import datetime

def seed_db():
    db = SessionLocal()
    
    # Check if seeded
    if db.query(Recycler).count() > 0:
        db.close()
        return

    # Add dummy Recyclers
    for i in range(142):
        r = Recycler(name=f"Recycler {i}", location="POINT(77.2090 28.6139)", is_active=True)
        db.add(r)
        
    # Add dummy HandoverRecords to simulate 12450 kg
    h1 = HandoverRecord(reference_number="REF001", qr_jwt_payload="{}", actual_weight_kg=10000, gps_location="POINT(77.2090 28.6139)")
    h2 = HandoverRecord(reference_number="REF002", qr_jwt_payload="{}", actual_weight_kg=2450, gps_location="POINT(77.2090 28.6139)")
    db.add(h1)
    db.add(h2)

    # Add dummy SyncQueue Anomalies
    for i in range(8):
        s = SyncQueue(collector_id=uuid.uuid4(), payload={"test": "data"}, status="failed")
        db.add(s)

    db.commit()
    db.close()
    print("Database seeded!")

if __name__ == "__main__":
    seed_db()
