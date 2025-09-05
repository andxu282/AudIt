from sqlmodel import SQLModel, Field, Relationship
from datetime import datetime, timezone
from typing import List

class UserBase(SQLModel):
    email: str = Field(unique=True)
    name: str

class User(UserBase, table=True):
    __tablename__ = 'users'

    id: str = Field(primary_key=True)
    password_hash: str
    created_at: datetime = Field(default_factory=datetime.now(timezone.utc))

    items: List["Item"] = Relationship(back_populates="user", cascade_delete=True)

class UserCreate(UserBase):
    password: str

class UserResponse(UserBase):
    id: str
    created_at: datetime