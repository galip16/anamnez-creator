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
    note = Note(status="uploaded")

    db.add(note)
    db.commit()
    db.refresh(note)

    try:
        note.status = "transcribing"
        db.commit()

        transcription = await transcribe(audio)

        note.transcription = transcription
        note.status = "creating_anamnesis"
        db.commit()

        anamnesis = await create_anamnesis(transcription)

        note.anamnesis = anamnesis
        note.status = "ready"

        db.commit()
        db.refresh(note)

        return note

    except Exception:
        note.status = "failed"
        db.commit()
        raise