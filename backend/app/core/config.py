from pydantic_settings import BaseSettings

class Settings(BaseSettings):
    PROJECT_NAME: str = "E-Waste Connect"
    VERSION: str = "1.0.0"
    API_V1_STR: str = "/api/v1"
    
    POSTGRES_SERVER: str = "db"
    POSTGRES_USER: str = "ewaste"
    POSTGRES_PASSWORD: str = "ewaste_password"
    POSTGRES_DB: str = "ewaste_db"
    
    SECRET_KEY: str = "super_secret_key_change_in_production"
    ALGORITHM: str = "HS256"
    ACCESS_TOKEN_EXPIRE_MINUTES: int = 15
    REFRESH_TOKEN_EXPIRE_DAYS: int = 30
    
    REDIS_URL: str = "redis://redis:6379/0"
    
    # AWS Settings (stubbed)
    AWS_REGION: str = "ap-south-1"
    S3_BUCKET_NAME: str = "ewaste-connect-images"

    class Config:
        case_sensitive = True

settings = Settings()
