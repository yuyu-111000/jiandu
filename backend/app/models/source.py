from sqlalchemy import Column, Integer, String, Text
from app.models.base import Base, TimestampMixin


class Source(Base, TimestampMixin):
    __tablename__ = "source"

    id = Column(Integer, primary_key=True, autoincrement=True)
    title = Column(String(500), nullable=False)
    author = Column(String(200))
    publisher = Column(String(200))
    description = Column(Text)
