from sqlalchemy import Column, Integer, String, ForeignKey
from app.models.base import Base, TimestampMixin


class Annotation(Base, TimestampMixin):
    __tablename__ = "annotation"

    id = Column(Integer, primary_key=True, autoincrement=True)
    item_id = Column(Integer, ForeignKey("slip_item.id"), nullable=False, index=True)
    annotation_type = Column(String(50))  # 'syntax' or 'reference'
    word = Column(String(200))
    pos = Column(String(20), index=True)   # n, v, adj...
    role = Column(String(50), index=True)  # subject, object, predicate...
    ref_target = Column(String(200))
    start_pos = Column(Integer)
    end_pos = Column(Integer)
