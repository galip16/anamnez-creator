from fastapi import APIRouter
from fastapi import Depends

from sqlalchemy.orm import Session

from app.db.database import get_db
from app.schemas.note import NoteResponse


from fastapi import UploadFile
from fastapi import File
from app.services.note_processing_service import process_audio
from app.services.current_note_service import get_current_note

router = APIRouter()


@router.get("/health")
def health():
    return {"status": "healthy"}

@router.get(
    "/current-note",
    response_model=NoteResponse,
)
def current_note(
    db: Session = Depends(get_db),
):
    return get_current_note(db)


@router.post(
    "/transcribe",
    response_model=NoteResponse,
)
async def transcribe_audio(
    audio: UploadFile = File(...),
    db: Session = Depends(get_db),
):

    return await process_audio(audio, db)