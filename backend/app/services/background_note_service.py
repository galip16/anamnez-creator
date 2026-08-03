from pathlib import Path

from sqlalchemy.orm import Session

from app.models.note import Note
from app.services.anamnesis_service import create_anamnesis
from app.services.transcription_service import transcribe


async def process_note(
    note_id: int,
    audio_path: str,
    db: Session,
):
    note = db.get(Note, note_id)

    if note is None:
        return

    try:
        note.status = "transcribing"
        db.commit()

        transcription = await transcribe(audio_path)

        note.transcription = transcription
        note.status = "creating_anamnesis"
        db.commit()

        anamnesis = await create_anamnesis(transcription)

        note.anamnesis = anamnesis
        note.status = "ready"

        db.commit()

    except Exception:
        note.status = "failed"
        db.commit()

    finally:
        Path(audio_path).unlink(missing_ok=True)