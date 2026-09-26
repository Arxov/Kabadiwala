from fastapi import APIRouter
from typing import Any

router = APIRouter()

@router.get("/verify/{reference_number}")
async def verify_handover(reference_number: str) -> Any:
    # Publicly verify handover record without auth
    return {"reference_number": reference_number, "status": "verified", "data": {}}
