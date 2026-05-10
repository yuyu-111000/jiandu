from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select

from app.database import get_db
from app.models.catalog import Catalog
from pydantic import BaseModel

router = APIRouter(prefix="/api/catalogs", tags=["catalogs"])


class CatalogCreate(BaseModel):
    source_id: int
    parent_id: int | None = None
    title: str
    sort_order: int = 0


class CatalogUpdate(BaseModel):
    title: str | None = None
    sort_order: int | None = None


class CatalogOut(BaseModel):
    id: int
    source_id: int
    parent_id: int | None
    title: str
    sort_order: int

    model_config = {"from_attributes": True}


@router.get("", response_model=list[CatalogOut])
async def list_catalogs(
    source_id: int | None = None,
    parent_id: int | None = None,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(Catalog)
    if source_id is not None:
        stmt = stmt.where(Catalog.source_id == source_id)
    if parent_id is not None:
        stmt = stmt.where(Catalog.parent_id == parent_id)
    stmt = stmt.order_by(Catalog.sort_order)
    result = await db.execute(stmt)
    return result.scalars().all()


@router.post("", response_model=CatalogOut, status_code=201)
async def create_catalog(data: CatalogCreate, db: AsyncSession = Depends(get_db)):
    catalog = Catalog(**data.model_dump())
    db.add(catalog)
    await db.commit()
    await db.refresh(catalog)
    return catalog


@router.put("/{catalog_id}", response_model=CatalogOut)
async def update_catalog(catalog_id: int, data: CatalogUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Catalog).where(Catalog.id == catalog_id))
    catalog = result.scalar_one_or_none()
    if not catalog:
        raise HTTPException(status_code=404)
    for key, val in data.model_dump(exclude_unset=True).items():
        setattr(catalog, key, val)
    await db.commit()
    await db.refresh(catalog)
    return catalog


@router.delete("/{catalog_id}", status_code=204)
async def delete_catalog(catalog_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(Catalog).where(Catalog.id == catalog_id))
    catalog = result.scalar_one_or_none()
    if not catalog:
        raise HTTPException(status_code=404)
    await db.delete(catalog)
    await db.commit()
