from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.slip_item import SlipItem
from app.schemas.slip_item import SlipItemCreate, SlipItemUpdate, SlipItemOut

router = APIRouter(prefix="/api/slip-items", tags=["slip-items"])


@router.get("")
async def list_items(
    location: str | None = None,
    period: str | None = None,
    case_type: str | None = None,
    page: int = 1,
    size: int = 20,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(SlipItem).options(selectinload(SlipItem.annotations))
    if location:
        stmt = stmt.where(SlipItem.location == location)
    if period:
        stmt = stmt.where(SlipItem.period == period)
    if case_type:
        stmt = stmt.where(SlipItem.case_type == case_type)

    count_stmt = select(SlipItem)
    if location:
        count_stmt = count_stmt.where(SlipItem.location == location)
    if period:
        count_stmt = count_stmt.where(SlipItem.period == period)

    from sqlalchemy import func
    total = (await db.execute(select(func.count()).select_from(count_stmt.subquery()))).scalar()

    stmt = stmt.offset((page - 1) * size).limit(size).order_by(SlipItem.id)
    result = await db.execute(stmt)
    items = result.scalars().all()

    return {"items": [SlipItemOut.model_validate(item) for item in items], "total": total, "page": page, "size": size}


@router.get("/{item_id}", response_model=SlipItemOut)
async def get_item(item_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(
        select(SlipItem).options(selectinload(SlipItem.annotations)).where(SlipItem.id == item_id)
    )
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    return SlipItemOut.model_validate(item)


@router.post("", response_model=SlipItemOut, status_code=201)
async def create_item(data: SlipItemCreate, db: AsyncSession = Depends(get_db)):
    item = SlipItem(**data.model_dump())
    db.add(item)
    await db.commit()
    await db.refresh(item)
    return SlipItemOut.model_validate(item)


@router.put("/{item_id}", response_model=SlipItemOut)
async def update_item(item_id: int, data: SlipItemUpdate, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SlipItem).where(SlipItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    for key, val in data.model_dump(exclude_unset=True).items():
        setattr(item, key, val)
    await db.commit()
    await db.refresh(item)
    return SlipItemOut.model_validate(item)


@router.delete("/{item_id}", status_code=204)
async def delete_item(item_id: int, db: AsyncSession = Depends(get_db)):
    result = await db.execute(select(SlipItem).where(SlipItem.id == item_id))
    item = result.scalar_one_or_none()
    if not item:
        raise HTTPException(status_code=404, detail="Item not found")
    await db.delete(item)
    await db.commit()
