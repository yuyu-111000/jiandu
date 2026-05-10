import uuid
from pathlib import Path

from fastapi import APIRouter, UploadFile, File, Depends, HTTPException
from fastapi.responses import FileResponse
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.config import UPLOAD_DIR
from app.models.page_image import PageImage

router = APIRouter(prefix="/api/images", tags=["images"])

ALLOWED_EXTENSIONS = {".jpg", ".jpeg", ".png", ".webp"}


@router.post("/upload")
async def upload_image(file: UploadFile = File(...), db: AsyncSession = Depends(get_db)):
    ext = Path(file.filename).suffix.lower()
    if ext not in ALLOWED_EXTENSIONS:
        raise HTTPException(status_code=400, detail=f"Unsupported file type: {ext}")

    filename = f"{uuid.uuid4()}{ext}"
    file_path = UPLOAD_DIR / filename

    content = await file.read()
    file_path.write_bytes(content)

    image = PageImage(
        page_number=1,
        image_path=str(file_path),
    )
    db.add(image)
    await db.commit()
    await db.refresh(image)

    return {"id": image.id, "filename": filename, "url": f"/api/images/{image.id}"}


@router.get("/{image_id}")
async def get_image(image_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PageImage).where(PageImage.id == image_id))
    image = result.scalar_one_or_none()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    path = Path(image.image_path)
    if not path.exists():
        raise HTTPException(status_code=404, detail="Image file not found on disk")

    return FileResponse(path, media_type=f"image/{path.suffix.lstrip('.')}")


@router.delete("/{image_id}", status_code=204)
async def delete_image(image_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(PageImage).where(PageImage.id == image_id))
    image = result.scalar_one_or_none()
    if not image:
        raise HTTPException(status_code=404, detail="Image not found")

    path = Path(image.image_path)
    if path.exists():
        path.unlink()

    await db.delete(image)
    await db.commit()
