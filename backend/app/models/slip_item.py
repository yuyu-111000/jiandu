from sqlalchemy import Column, Integer, String, Text, ForeignKey
from sqlalchemy.orm import relationship
from app.models.base import Base, TimestampMixin


class SlipItem(Base, TimestampMixin):
    __tablename__ = "slip_item"

    id = Column(Integer, primary_key=True, autoincrement=True)
    code = Column(String(50), unique=True, nullable=False, index=True)
    title = Column(String(500))
    text = Column(Text, nullable=False)
    period = Column(String(100), index=True)
    location = Column(String(200), index=True)
    source_id = Column(Integer, ForeignKey("source.id"), nullable=True)
    case_type = Column(String(100), index=True)
    image_id = Column(Integer, ForeignKey("page_image.id"), nullable=True)
    page_number = Column(Integer)

    annotations = relationship("Annotation", lazy="selectin")
