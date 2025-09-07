from pydantic import BaseModel, ConfigDict
from enum import Enum
from typing import Optional
from datetime import datetime

class ItemType(str, Enum):
    SUBSCRIPTION = 'Subscription'
    ITEM = 'Item'

class ItemCategory(str, Enum):
    DAILY_NEEDS = 'Daily Needs'
    MONTHLY = 'Monthly'
    YEARLY = 'Yearly'

class ItemBase(BaseModel):
    name: str
    amount: float
    type: ItemType
    category: ItemCategory
    frequency: int

    def __repr__(self):
        return f'name: {self.name}, amount: {self.amount}'

class ItemCreate(ItemBase):
    pass

class ItemSchema(ItemBase):
    id: str
    created_at: datetime
    updated_at: datetime

    model_config = ConfigDict(from_attributes=True)

class ItemUpdate(ItemBase):
    name: Optional[str] = None
    amount: Optional[float] = None
    type: Optional[ItemType] = None
    category: Optional[ItemCategory] = None
    frequency: Optional[int] = None