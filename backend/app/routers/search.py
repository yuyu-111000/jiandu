from fastapi import APIRouter, Depends, Query
from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy import select, func
from sqlalchemy.orm import selectinload

from app.database import get_db
from app.models.slip_item import SlipItem
from app.schemas.search import SearchResponse, AggregationBucket, OverviewStats
from app.schemas.slip_item import SlipItemBrief

router = APIRouter(prefix="/api", tags=["search"])


@router.get("/search", response_model=SearchResponse)
async def search(
    q: str | None = Query(None),
    location: str | None = Query(None),
    period: str | None = Query(None),
    case_type: str | None = Query(None),
    page: int = 1,
    size: int = 20,
    db: AsyncSession = Depends(get_db),
):
    stmt = select(SlipItem).options(selectinload(SlipItem.annotations))

    if q:
        stmt = stmt.where(SlipItem.text.ilike(f"%{q}%") | SlipItem.title.ilike(f"%{q}%"))
    if location:
        stmt = stmt.where(SlipItem.location == location)
    if period:
        stmt = stmt.where(SlipItem.period == period)
    if case_type:
        stmt = stmt.where(SlipItem.case_type == case_type)

    # Count
    count_stmt = select(func.count(SlipItem.id))
    if q:
        count_stmt = count_stmt.where(SlipItem.text.ilike(f"%{q}%") | SlipItem.title.ilike(f"%{q}%"))
    if location:
        count_stmt = count_stmt.where(SlipItem.location == location)
    if period:
        count_stmt = count_stmt.where(SlipItem.period == period)
    if case_type:
        count_stmt = count_stmt.where(SlipItem.case_type == case_type)
    total = (await db.execute(count_stmt)).scalar() or 0

    # Aggregations
    agg_location_stmt = select(SlipItem.location, func.count(SlipItem.id)).group_by(SlipItem.location)
    if q:
        agg_location_stmt = agg_location_stmt.where(SlipItem.text.ilike(f"%{q}%") | SlipItem.title.ilike(f"%{q}%"))
    agg_result = await db.execute(agg_location_stmt)
    location_agg = [AggregationBucket(key=row[0], count=row[1]) for row in agg_result.all() if row[0]]

    agg_period_stmt = select(SlipItem.period, func.count(SlipItem.id)).group_by(SlipItem.period)
    if q:
        agg_period_stmt = agg_period_stmt.where(SlipItem.text.ilike(f"%{q}%") | SlipItem.title.ilike(f"%{q}%"))
    period_result = await db.execute(agg_period_stmt)
    period_agg = [AggregationBucket(key=row[0], count=row[1]) for row in period_result.all() if row[0]]

    stmt = stmt.offset((page - 1) * size).limit(size).order_by(SlipItem.id)
    result = await db.execute(stmt)
    items = result.scalars().all()

    return SearchResponse(
        items=[SlipItemBrief.model_validate(item) for item in items],
        total=total,
        page=page,
        size=size,
        aggregations={"location": location_agg, "period": period_agg},
    )


@router.get("/stats/overview", response_model=OverviewStats)
async def overview_stats(db: AsyncSession = Depends(get_db)):
    from app.models.source import Source
    from app.models.annotation import Annotation

    total_items = (await db.execute(select(func.count(SlipItem.id)))).scalar() or 0
    total_sources = (await db.execute(select(func.count(Source.id)))).scalar() or 0
    total_annotations = (await db.execute(select(func.count(Annotation.id)))).scalar() or 0
    total_locations = (await db.execute(select(func.count(func.distinct(SlipItem.location))))).scalar() or 0

    return OverviewStats(
        total_items=total_items,
        total_sources=total_sources,
        total_annotations=total_annotations,
        total_locations=total_locations,
    )


@router.get("/search/stats")
async def search_stats(
    q: str | None = Query(None),
    db: AsyncSession = Depends(get_db),
):
    base_where = SlipItem
    if q:
        base_where = base_where.where(SlipItem.text.ilike(f"%{q}%") | SlipItem.title.ilike(f"%{q}%"))

    loc_stmt = select(SlipItem.location, func.count(SlipItem.id)).group_by(SlipItem.location)
    period_stmt = select(SlipItem.period, func.count(SlipItem.id)).group_by(SlipItem.period)

    loc_result = await db.execute(loc_stmt)
    period_result = await db.execute(period_stmt)

    return {
        "by_location": [{"name": row[0], "count": row[1]} for row in loc_result.all() if row[0]],
        "by_period": [{"name": row[0], "count": row[1]} for row in period_result.all() if row[0]],
    }
