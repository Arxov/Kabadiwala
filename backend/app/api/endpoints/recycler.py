from fastapi import APIRouter
from typing import Any

router = APIRouter()

@router.get("/lots/incoming")
async def get_incoming_lots(status: str = None, material: str = None) -> Any:
    return {"lots": []}

@router.post("/lots/{lot_id}/quote")
async def send_quote_to_collector(lot_id: str, payload: dict) -> Any:
    return {"status": "quote_sent"}

@router.post("/handover/{handover_id}/confirm")
async def confirm_handover(handover_id: str, payload: dict) -> Any:
    return {"status": "handover_completed"}

@router.get("/analytics")
async def get_analytics() -> Any:
    return {"volumes": {}, "revenue": {}, "trend_charts": []}
