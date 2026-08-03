from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.note import NoteResponse
from app.services.note_service import create_note
from app.services.note_service import get_notes

from fastapi import UploadFile
from fastapi import File
from app.services.note_processing_service import process_audio


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


@router.post(
    "/transcribe",
    response_model=NoteResponse,
)
async def transcribe_audio(
    audio: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    return await process_audio(audio, db)