from pydantic import BaseModel
from typing import Optional, List
from app.schemas.slip_item import SlipItemBrief


class SearchParams(BaseModel):
    q: Optional[str] = None
    location: Optional[str] = None
    period: Optional[str] = None
    case_type: Optional[str] = None
    page: int = 1
    size: int = 20


class AggregationBucket(BaseModel):
    key: str
    count: int


class SearchResponse(BaseModel):
    items: List[SlipItemBrief]
    total: int
    page: int
    size: int
    aggregations: dict[str, List[AggregationBucket]] = {}


class OverviewStats(BaseModel):
    total_items: int
    total_sources: int
    total_annotations: int
    total_locations: int
