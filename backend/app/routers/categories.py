from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.category import Category
from pydantic import BaseModel

router = APIRouter(prefix="/api/categories", tags=["categories"])


class CategoryCreate(BaseModel):
    category_type: str
    name: str
    sort_order: int = 0


class CategoryOut(BaseModel):
    id: int
    category_type: str
    name: str
    sort_order: int

    model_config = {"from_attributes": True}


@router.get("", response_model=list[CategoryOut])
async def list_categories(
    category_type: str | None = None,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Category)
    if category_type:
        stmt = stmt.where(Category.category_type == category_type)
    stmt = stmt.order_by(Category.sort_order)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.post("", response_model=CategoryOut, status_code=201)
async def create_category(data: CategoryCreate, db: AsyncSession = Depends(get_db)):
    cat = Category(**data.model_dump())
    db.add(cat)
    await db.commit()
    await db.refresh(cat)
    return cat


@router.delete("/{category_id}", status_code=204)
async def delete_category(category_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Category).where(Category.id == category_id))
    cat = result.scalar_one_or_none()
    if not cat:
        raise HTTPException(status_code=404)
    await db.delete(cat)
    await db.commit()
