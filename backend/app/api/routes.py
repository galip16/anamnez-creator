from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.note import NoteResponse
from app.services.note_service import create_note
from app.services.note_service import get_notes

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "healthy"}


@router.post("/notes", response_model=NoteResponse)
def create(db: Session = Depends(get_db)):
    return create_note(db)


@router.get("/notes", response_model=list[NoteResponse])
def list_notes(db: Session = Depends(get_db)):
    return get_notes(db)