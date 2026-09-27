import asyncio
from app.db.session import engine
from app.models.all import Base
import logging

logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

def init_db():
    logger.info("Creating database tables...")
    # SQLite does not support Geometry type. We need to mock it if using standard SQLite.
    # For now, let's just let it fail or we can use spatialite if installed.
    # Actually, SQLAlchemy GeoAlchemy2 will throw an error without Spatialite.
    # Let's wrap it in a try-except and patch Geometry for SQLite if needed.
    # Since we can't easily install spatialite, we might just comment out Geometry for local test
    # or just use postgresql via a local install.
    Base.metadata.create_all(bind=engine)
    logger.info("Database tables created.")

if __name__ == "__main__":
    init_db()
