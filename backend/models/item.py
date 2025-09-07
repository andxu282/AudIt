from sqlalchemy import Column, String, Double, DateTime, Enum, Integer
from models.base import Base
from datetime import datetime, timezone
from schemas import ItemType, ItemCategory


class Item(Base):
    __tablename__ = 'items'

    id = Column(String(36), primary_key=True)
    name = Column(String(32), nullable=False)
    amount = Column(Double, nullable=False)
    type = Column(Enum(ItemType), nullable=False)
    category = Column(Enum(ItemCategory), nullable=False)
    frequency = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))
    updated_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'category': self.category.value,
            'type': self.type.value,
            'frequency': self.frequency,
            'created_at': self.created_at.isoformat(),
            'updated_at': self.updated_at.isoformat()
        }
    
    def __repr__(self):
        return f'name: {self.name}, amount: {self.amount}'