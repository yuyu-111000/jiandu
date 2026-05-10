from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from fastapi.staticfiles import StaticFiles

from app.config import CORS_ORIGINS, UPLOAD_DIR
from app.routers import slip_items, search, images, catalogs, categories, annotations

app = FastAPI(title="法律案例类出土简牍数据库 API", version="0.1.0")

app.add_middleware(
    CORSMiddleware,
    allow_origins=CORS_ORIGINS,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.mount("/uploads", StaticFiles(directory=str(UPLOAD_DIR)), name="uploads")

app.include_router(slip_items.router)
app.include_router(search.router)
app.include_router(images.router)
app.include_router(catalogs.router)
app.include_router(categories.router)
app.include_router(annotations.router)


@app.get("/api/health")
async def health():
    return {"status": "ok"}
