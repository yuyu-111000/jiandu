from sqlalchemy import Column, Integer, String
from app.models.base import Base


class Category(Base):
    __tablename__ = "category"

    id = Column(Integer, primary_key=True, autoincrement=True)
    category_type = Column(String(50), nullable=False)  # period, location, source, case_type
    name = Column(String(200), nullable=False)
    sort_order = Column(Integer, default=0)
