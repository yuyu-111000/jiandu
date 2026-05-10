import os
from pathlib import Path

BASE_DIR = Path(__file__).resolve().parent.parent

DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "mysql+aiomysql://jiandu:jiandu@localhost:3306/jiandu_db",
)

UPLOAD_DIR = BASE_DIR / "uploads" / "images"
UPLOAD_DIR.mkdir(parents=True, exist_ok=True)

CORS_ORIGINS = ["http://localhost:3000", "http://localhost:5173"]
