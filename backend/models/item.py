from sqlalchemy import Column, String, Double, DateTime, Enum, Integer, ForeignKey
from sqlalchemy.orm import relationship
from models.base import Base
from datetime import datetime, timezone
from schemas import ItemType, ItemCategory


class Item(Base):
    __tablename__ = 'items'

    id = Column(String(36), primary_key=True)
    name = Column(String(32), nullable=False)
    price = Column(Double, nullable=False)
    type = Column(Enum(ItemType), nullable=False)
    category = Column(Enum(ItemCategory), nullable=False)
    frequency = Column(Integer, nullable=False)
    created_at = Column(DateTime, nullable=False, default=datetime.now(timezone.utc))

    user_id = Column(String(36), ForeignKey('users.id'), nullable=False)
    user = relationship('User', back_populates='items')

    def to_dict(self):
        return {
            'id': self.id,
            'name': self.name,
            'amount': self.amount,
            'category': self.category.value,
            'type': self.type.value,
            'frequency': self.frequency,
            'date': self.date.isoformat(),
            'user_id': self.user_id
        }