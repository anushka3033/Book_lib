# app/schemas.py
from pydantic import BaseModel

class UserCreate(BaseModel):
    username: str
    password: str

class UserOut(BaseModel):
    id: int
    username: str

    class Config:
        from_attributes = True

class Token(BaseModel):
    access_token: str
    token_type: str
    user_id: int

class BookBase(BaseModel):
    title: str
    author: str
    description: str
    published_year: int

class BookCreate(BookBase):
    pass

class BookOut(BaseModel):
    id: int
    title: str
    author: str
    description: str
    published_year: int
    owner_id: int

    class Config:
        from_attributes = True  # formerly orm_mode in Pydantic v1


class BookUpdate(BaseModel):
    title: str | None = None
    author: str | None = None
    description: str | None = None
    published_year: int | None = None

