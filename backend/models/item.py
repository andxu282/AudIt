from audit_types import ItemType, ItemCategory
from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
from typing import Optional

class ItemBase(SQLModel):
    name: str
    price: float
    type: ItemType
    category: ItemCategory
    frequency: int

class Item(ItemBase, table=True):
    __tablename__ = 'items'

    id: str = Field(primary_key=True)
    created_at: datetime = Field(default_factory=datetime.now(timezone.utc))
    user_id: str = Field(foreign_key='users.id')
    user: Optional["User"] = Relationship(back_populates="items")

class ItemCreate(ItemBase):
    pass

class ItemResponse(ItemBase):
    id: str
    created_at: datetime