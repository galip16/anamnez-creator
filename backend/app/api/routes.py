from fastapi import APIRouter
from fastapi import BackgroundTasks
from fastapi import Depends
from fastapi import File
from fastapi import UploadFile

from sqlalchemy.orm import Session

from app.db.database import SessionLocal
from app.db.database import get_db

from app.schemas.note import NoteResponse

from app.services.background_note_service import process_note
from app.services.current_note_service import get_current_note
from app.services.note_processing_service import create_uploaded_note

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
    background_tasks: BackgroundTasks,
    audio: UploadFile = File(...),
    db: Session = Depends(get_db),
):
    note, audio_path = await create_uploaded_note(
        audio,
        db,
    )

    note_id = note.id

    def run_background():
        background_db = SessionLocal()

        try:
            import asyncio

            asyncio.run(
                process_note(
                    note_id,
                    audio_path,
                    background_db,
                )
            )
        finally:
            background_db.close()

    background_tasks.add_task(run_background)

    return note