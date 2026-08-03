from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.note import Note
from app.services.anamnesis_service import create_anamnesis
from app.services.transcription_service import transcribe


async def process_audio(
    audio: UploadFile,
    db: Session,
):

    # Eski kaydı sil
    db.query(Note).delete()
    db.commit()

    # Yeni kaydı oluştur
    note = Note(status="processing")

    db.add(note)
    db.commit()
    db.refresh(note)

    transcription = await transcribe(audio)

    anamnesis = await create_anamnesis(transcription)

    note.transcription = transcription
    note.anamnesis = anamnesis
    note.status = "ready"

    db.commit()
    db.refresh(note)

    return note