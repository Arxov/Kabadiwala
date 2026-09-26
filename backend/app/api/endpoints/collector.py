from fastapi import APIRouter, Depends, HTTPException
from typing import Any, List
from pydantic import BaseModel

router = APIRouter()

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
async def get_price_board(category: str = None, lat: float = None, lng: float = None, radius_km: int = 50) -> Any:
    # Stub: Price board logic
    return {"prices": []}

@router.get("/prices/trends")
async def get_price_trends(category: str, days: int = 30, lat: float = None, lng: float = None) -> Any:
    return {"trends": []}

@router.post("/lots")
async def create_lot(payload: dict) -> Any:
    return {"lot_id": "stub_lot_uuid"}

@router.get("/lots")
async def list_lots() -> Any:
    return {"lots": []}

@router.get("/lots/{lot_id}")
async def get_lot(lot_id: str) -> Any:
    return {"lot_id": lot_id}

@router.put("/lots/{lot_id}")
async def update_lot(lot_id: str, payload: dict) -> Any:
    return {"status": "updated"}

@router.post("/lots/{lot_id}/images")
async def upload_lot_image(lot_id: str) -> Any:
    return {"image_id": "stub_image_uuid"}

@router.post("/lots/{lot_id}/classify")
async def classify_lot(lot_id: str) -> Any:
    return {"ml_category": "PCB", "confidence": 0.92}

@router.get("/lots/{lot_id}/estimate")
async def estimate_lot_price(lot_id: str) -> Any:
    return {"estimate": [130, 150, 180], "unit": "kg"}

@router.get("/recyclers")
async def get_nearby_recyclers(lat: float, lng: float, material: str = None, radius_km: int = 50) -> Any:
    return {"recyclers": []}

@router.post("/recyclers/{recycler_id}/quote")
async def request_quote(recycler_id: str, payload: dict) -> Any:
    return {"status": "quote_requested"}

@router.get("/transactions")
async def get_transactions() -> Any:
    return {"transactions": []}

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

@router.get("/sync")
async def sync_pull(since: str = None) -> Any:
    return {"delta": {"prices": [], "recyclers": [], "transactions": []}}

@router.post("/sync/push")
async def sync_push(payload: dict) -> Any:
    # Stub: Process offline sync queue
    return {"server_ts": "2024-01-15T10:05:00Z", "op_results": []}
