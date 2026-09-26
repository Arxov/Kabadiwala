from fastapi import APIRouter
from app.api.endpoints import collector, recycler, public

api_router = APIRouter()

api_router.include_router(collector.router, tags=["Collector APIs"])
api_router.include_router(recycler.router, prefix="/recycler", tags=["Recycler APIs"])
api_router.include_router(public.router, tags=["Public Verification APIs"])
