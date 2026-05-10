from sqlalchemy import Column, Integer, String, ForeignKey
from app.models.base import Base, TimestampMixin


class PageImage(Base, TimestampMixin):
    __tablename__ = "page_image"

    id = Column(Integer, primary_key=True, autoincrement=True)
    source_id = Column(Integer, ForeignKey("source.id"), nullable=False)
    catalog_id = Column(Integer, ForeignKey("catalog.id"), nullable=True)
    page_number = Column(Integer, nullable=False)
    image_path = Column(String(1000))
    sort_order = Column(Integer, default=0)
