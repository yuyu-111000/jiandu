from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.annotation import Annotation
from pydantic import BaseModel

router = APIRouter(prefix="/api/annotations", tags=["annotations"])


class AnnotationCreate(BaseModel):
    item_id: int
    annotation_type: str | None = None
    word: str | None = None
    pos: str | None = None
    role: str | None = None
    ref_target: str | None = None
    start_pos: int | None = None
    end_pos: int | None = None


class AnnotationOut(BaseModel):
    id: int
    item_id: int
    annotation_type: str | None
    word: str | None
    pos: str | None
    role: str | None
    ref_target: str | None
    start_pos: int | None
    end_pos: int | None

    model_config = {"from_attributes": True}


@router.get("", response_model=list[AnnotationOut])
async def list_annotations(
    item_id: int | None = None,
    pos: str | None = None,
    role: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Annotation)
    if item_id:
        stmt = stmt.where(Annotation.item_id == item_id)
    if pos:
        stmt = stmt.where(Annotation.pos == pos)
    if role:
        stmt = stmt.where(Annotation.role == role)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.post("", response_model=AnnotationOut, status_code=201)
async def create_annotation(data: AnnotationCreate, db: AsyncSession = Depends(get_db)):
    ann = Annotation(**data.model_dump())
    db.add(ann)
    await db.commit()
    await db.refresh(ann)
    return ann


@router.delete("/{annotation_id}", status_code=204)
async def delete_annotation(annotation_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Annotation).where(Annotation.id == annotation_id))
    ann = result.scalar_one_or_none()
    if not ann:
        raise HTTPException(status_code=404)
    await db.delete(ann)
    await db.commit()
