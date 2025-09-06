from pydantic import BaseModel, ConfigDict
from enum import Enum

class ItemType(Enum):
    SUBSCRIPTION = 'Subscription'
    ITEM = 'Item'

class ItemCategory(Enum):
    DAILY_NEEDS = 'Daily Needs'
    MONTHLY = 'Monthly'
    YEARLY = 'Yearly'

class UserSchema(BaseModel):
    id: str
    name: str
    email: str
    
    model_config = ConfigDict(from_attributes=True)

class ItemSchema(BaseModel):
    id: str
    name: str
    amount: float
    type: ItemType
    category: ItemCategory
    frequency: int
    
    model_config = ConfigDict(from_attributes=True)