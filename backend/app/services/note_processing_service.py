from sqlalchemy.orm import Session

from app.models.note import Note
from app.services.anamnesis_service import create_anamnesis
from app.services.transcription_service import transcribe


async def process_audio(audio, db: Session):

    note = Note()

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