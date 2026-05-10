from sqlalchemy import Column, Integer, String, ForeignKey
from app.models.base import Base, TimestampMixin


class Catalog(Base, TimestampMixin):
    __tablename__ = "catalog"

    id = Column(Integer, primary_key=True, autoincrement=True)
    source_id = Column(Integer, ForeignKey("source.id"), nullable=False)
    parent_id = Column(Integer, ForeignKey("catalog.id"), nullable=True)
    title = Column(String(500), nullable=False)
    sort_order = Column(Integer, default=0)
