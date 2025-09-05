from enum import Enum

class ItemType(Enum):
    SUBSCRIPTION = 'Subscription'
    ITEM = 'Item'

class ItemCategory(Enum):
    DAILY_NEEDS = 'Daily Needs'
    MONTHLY = 'Monthly'
    YEARLY = 'Yearly'