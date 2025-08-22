# app/routers/users.py
from fastapi import APIRouter, Depends, HTTPException, Request
from fastapi.security import OAuth2PasswordRequestForm
from sqlalchemy.orm import Session
from app import schemas, models, auth
from app.database import get_db
from app.models import User, Book


router = APIRouter(prefix="/users", tags=["Users"])

@router.post("/signup", response_model=schemas.UserOut)
def signup(user: schemas.UserCreate, db: Session = Depends(get_db)):
    db_user = db.query(models.User).filter(models.User.username == user.username).first()
    if db_user:
        raise HTTPException(status_code=400, detail="Username already registered")
    
    hashed_password = auth.get_password_hash(user.password)
    new_user = models.User(username=user.username, hashed_password=hashed_password)
    db.add(new_user)
    db.commit()
    db.refresh(new_user)
    return new_user


@router.post("/login", response_model=schemas.Token)
def login(form_data: OAuth2PasswordRequestForm = Depends(), db: Session = Depends(get_db)):
    user = db.query(models.User).filter(models.User.username == form_data.username).first()
    if not user or not auth.verify_password(form_data.password, user.hashed_password):
        raise HTTPException(status_code=401, detail="Invalid username or password")
    
    token = auth.create_access_token(data={"sub": user.username})
    return {"access_token": token, "token_type": "bearer", "user_id": user.id}

@router.get("/me", response_model=schemas.UserOut)
def get_current_user_info(current_user: models.User = Depends(auth.get_current_user)):
    return current_user

@router.get("/me/profile")
def get_profile(current_user: User = Depends(auth.get_current_user), db: Session = Depends(get_db)):
    book_count = db.query(Book).filter(Book.owner_id == current_user.id).count()
    return {
        "username": current_user.username,
        "hashed_password": current_user.hashed_password,  # For demo only; never return in real apps
        "book_count": book_count
    }

# User-specific book endpoints
@router.post("/{user_id}/books", response_model=schemas.BookOut)
def create_user_book(
    user_id: int,
    book: schemas.BookCreate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to create books for this user")
    
    new_book = models.Book(**book.dict(), owner_id=current_user.id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@router.get("/{user_id}/books", response_model=list[schemas.BookOut])
def get_user_books(
    user_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view books for this user")
    
    books = db.query(models.Book).filter(models.Book.owner_id == user_id).all()
    return books

@router.get("/{user_id}/books/{book_id}", response_model=schemas.BookOut)
def get_user_book(
    user_id: int,
    book_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to view books for this user")
    
    book = db.query(models.Book).filter(
        models.Book.id == book_id,
        models.Book.owner_id == user_id
    ).first()
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    return book

@router.put("/{user_id}/books/{book_id}", response_model=schemas.BookOut)
def update_user_book(
    user_id: int,
    book_id: int,
    updated_data: schemas.BookUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to update books for this user")
    
    book = db.query(models.Book).filter(
        models.Book.id == book_id,
        models.Book.owner_id == user_id
    ).first()
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(book, field, value)
    
    db.commit()
    db.refresh(book)
    return book

@router.delete("/{user_id}/books/{book_id}")
def delete_user_book(
    user_id: int,
    book_id: int,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(auth.get_current_user)
):
    if current_user.id != user_id:
        raise HTTPException(status_code=403, detail="Not authorized to delete books for this user")
    
    book = db.query(models.Book).filter(
        models.Book.id == book_id,
        models.Book.owner_id == user_id
    ).first()
    
    if not book:
        raise HTTPException(status_code=404, detail="Book not found")
    
    db.delete(book)
    db.commit()
    return {"detail": "Book deleted successfully"}

@router.get("/ping")
def ping():
    return {"msg": "Users router is working"}
