from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime


class AnnotationOut(BaseModel):
    id: int
    annotation_type: Optional[str]
    word: Optional[str]
    pos: Optional[str]
    role: Optional[str]
    ref_target: Optional[str]
    start_pos: Optional[int]
    end_pos: Optional[int]

    model_config = {"from_attributes": True}


class SlipItemBase(BaseModel):
    code: str
    title: Optional[str] = None
    text: str
    period: Optional[str] = None
    location: Optional[str] = None
    case_type: Optional[str] = None
    page_number: Optional[int] = None


class SlipItemCreate(SlipItemBase):
    source_id: Optional[int] = None
    image_id: Optional[int] = None


class SlipItemUpdate(BaseModel):
    code: Optional[str] = None
    title: Optional[str] = None
    text: Optional[str] = None
    period: Optional[str] = None
    location: Optional[str] = None
    case_type: Optional[str] = None
    page_number: Optional[int] = None
    source_id: Optional[int] = None
    image_id: Optional[int] = None


class SlipItemOut(SlipItemBase):
    id: int
    source_id: Optional[int] = None
    image_id: Optional[int] = None
    created_at: Optional[datetime] = None
    updated_at: Optional[datetime] = None
    annotations: List[AnnotationOut] = []

    model_config = {"from_attributes": True}


class SlipItemBrief(BaseModel):
    id: int
    code: str
    title: Optional[str]
    period: Optional[str]
    location: Optional[str]
    case_type: Optional[str]
    page_number: Optional[int]

    model_config = {"from_attributes": True}
