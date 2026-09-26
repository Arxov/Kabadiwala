import uuid
from datetime import datetime
from sqlalchemy import Column, String, Boolean, DateTime, Float, ForeignKey, Integer, Text, Date
from sqlalchemy.dialects.postgresql import UUID, JSONB
from sqlalchemy.orm import declarative_base, relationship
from geoalchemy2 import Geometry

Base = declarative_base()

class Collector(Base):
    __tablename__ = 'collectors'
    collector_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    phone_hash = Column(String(64), unique=True, nullable=False)
    preferred_lang = Column(String(6), default='hi')
    operating_area = Column(Geometry('POINT', srid=4326))
    area_name = Column(String(255))
    fcm_token = Column(String(512))
    is_active = Column(Boolean, default=True)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    last_active_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    lots = relationship("MaterialLot", back_populates="collector")

class MaterialLot(Base):
    __tablename__ = 'material_lots'
    lot_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    reference_code = Column(String(20), unique=True, nullable=False)
    collector_id = Column(UUID(as_uuid=True), ForeignKey('collectors.collector_id'))
    category = Column(String(40), nullable=False)
    subcategory = Column(String(100))
    weight_kg = Column(Float)
    condition = Column(String(20))
    source_type = Column(String(50))
    est_value_min = Column(Float)
    est_value_max = Column(Float)
    ml_category = Column(String(40))
    ml_confidence = Column(Float)
    status = Column(String(30), default='draft')
    location = Column(Geometry('POINT', srid=4326))
    location_address = Column(Text)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)
    synced_at = Column(DateTime(timezone=True))

    collector = relationship("Collector", back_populates="lots")
    images = relationship("LotImage", back_populates="lot", cascade="all, delete-orphan")

class LotImage(Base):
    __tablename__ = 'lot_images'
    image_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lot_id = Column(UUID(as_uuid=True), ForeignKey('material_lots.lot_id', ondelete='CASCADE'))
    s3_key = Column(String(1024), nullable=False)
    cdn_url = Column(String(1024))
    image_hash = Column(String(64))
    is_primary = Column(Boolean, default=False)
    ml_processed = Column(Boolean, default=False)
    ml_output = Column(JSONB)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

    lot = relationship("MaterialLot", back_populates="images")

class Recycler(Base):
    __tablename__ = 'recyclers'
    recycler_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    name = Column(String(255), nullable=False)
    location = Column(Geometry('POINT', srid=4326), nullable=False)
    address = Column(Text)
    city = Column(String(100))
    state = Column(String(100))
    pincode = Column(String(10))
    materials_accepted = Column(JSONB)
    auth_number = Column(String(100))
    auth_authority = Column(String(255))
    auth_status = Column(String(30))
    auth_expiry = Column(Date)
    gstin = Column(String(20))
    contact_phone = Column(String(20))
    pickup_available = Column(Boolean, default=False)
    pickup_radius_km = Column(Integer)
    service_area = Column(Geometry('POLYGON', srid=4326))
    offered_rates = Column(JSONB)
    min_lot_weight_kg = Column(Float)
    rating = Column(Float, default=0)
    is_verified = Column(Boolean, default=False)
    is_active = Column(Boolean, default=True)
    updated_at = Column(DateTime(timezone=True), default=datetime.utcnow, onupdate=datetime.utcnow)

class PriceData(Base):
    __tablename__ = 'price_data'
    price_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    category = Column(String(40), nullable=False)
    subcategory = Column(String(100))
    location = Column(Geometry('POINT', srid=4326), nullable=False)
    city = Column(String(100))
    state = Column(String(100))
    date_recorded = Column(Date, nullable=False)
    buying_price = Column(Float)
    selling_price = Column(Float)
    unit = Column(String(20), default='kg')
    recycler_id = Column(UUID(as_uuid=True), ForeignKey('recyclers.recycler_id'))
    source = Column(String(30))
    is_verified = Column(Boolean, default=False)
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

class Transaction(Base):
    __tablename__ = 'transactions'
    txn_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lot_id = Column(UUID(as_uuid=True), ForeignKey('material_lots.lot_id'))
    collector_id = Column(UUID(as_uuid=True), ForeignKey('collectors.collector_id'))
    recycler_id = Column(UUID(as_uuid=True), ForeignKey('recyclers.recycler_id'))
    quoted_price = Column(Float)
    final_price = Column(Float)
    payment_method = Column(String(30))
    payment_status = Column(String(30), default='pending')
    payment_ref = Column(String(255))
    handover_loc = Column(Geometry('POINT', srid=4326))
    scheduled_at = Column(DateTime(timezone=True))
    completed_at = Column(DateTime(timezone=True))
    status = Column(String(30), default='initiated')
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)

class HandoverRecord(Base):
    __tablename__ = 'handover_records'
    handover_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    txn_id = Column(UUID(as_uuid=True), ForeignKey('transactions.txn_id'))
    reference_number = Column(String(30), unique=True, nullable=False)
    qr_jwt_payload = Column(Text, nullable=False)
    photographs = Column(JSONB)
    actual_weight_kg = Column(Float)
    gps_location = Column(Geometry('POINT', srid=4326))
    gps_accuracy_m = Column(Integer)
    collector_ok = Column(Boolean, default=False)
    recycler_ok = Column(Boolean, default=False)
    recycler_ok_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

class TraceabilityEvent(Base):
    __tablename__ = 'traceability_events'
    event_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    lot_id = Column(UUID(as_uuid=True), ForeignKey('material_lots.lot_id'))
    txn_id = Column(UUID(as_uuid=True))
    event_type = Column(String(50), nullable=False)
    event_data = Column(JSONB)
    actor_type = Column(String(20))
    actor_id = Column(UUID(as_uuid=True))
    location = Column(Geometry('POINT', srid=4326))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow, nullable=False)

class SyncQueue(Base):
    __tablename__ = 'sync_queue'
    queue_id = Column(UUID(as_uuid=True), primary_key=True, default=uuid.uuid4)
    collector_id = Column(UUID(as_uuid=True), nullable=False)
    op_type = Column(String(20))
    entity_type = Column(String(40))
    entity_id = Column(UUID(as_uuid=True))
    payload = Column(JSONB, nullable=False)
    client_ts = Column(DateTime(timezone=True))
    status = Column(String(20), default='pending')
    retry_count = Column(Integer, default=0)
    error_msg = Column(Text)
    processed_at = Column(DateTime(timezone=True))
    created_at = Column(DateTime(timezone=True), default=datetime.utcnow)
