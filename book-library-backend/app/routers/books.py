from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from app import models, schemas
from app.database import SessionLocal, get_db
from app.auth import get_current_user

router = APIRouter(prefix="/books", tags=["Books"])

# Dependency to get DB session
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

@router.post("/", response_model=schemas.BookOut)
def create_book(book: schemas.BookCreate, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    new_book = models.Book(**book.dict(), owner_id=current_user.id)
    db.add(new_book)
    db.commit()
    db.refresh(new_book)
    return new_book

@router.get("/", response_model=list[schemas.BookOut])
def get_all_books(db: Session = Depends(get_db)):
    books = db.query(models.Book).all()
    return books

@router.put("/{book_id}", response_model=schemas.BookOut)
def update_book(
    book_id: int,
    updated_data: schemas.BookUpdate,
    db: Session = Depends(get_db),
    current_user: models.User = Depends(get_current_user)
):
    book = db.query(models.Book).filter(models.Book.id == book_id).first()

    if not book:
        raise HTTPException(status_code=404, detail="Book not found")

    if book.owner_id != current_user.id:
        raise HTTPException(status_code=403, detail="Not authorized to update this book")

    for field, value in updated_data.dict(exclude_unset=True).items():
        setattr(book, field, value)

    db.commit()
    db.refresh(book)
    return book

@router.delete("/{book_id}")
def delete_book(book_id: int, db: Session = Depends(get_db), current_user: models.User = Depends(get_current_user)):
    book = db.query(models.Book).filter(models.Book.id == book_id, models.Book.owner_id == current_user.id).first()
    if not book:
        raise HTTPException(status_code=404, detail="Book not found or not authorized to delete")
    
    db.delete(book)
    db.commit()
    return {"detail": "Book deleted successfully"}
