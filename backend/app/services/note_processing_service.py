import shutil
import tempfile

from fastapi import UploadFile
from sqlalchemy.orm import Session

from app.models.note import Note


async def create_uploaded_note(
    audio: UploadFile,
    db: Session,
):
    db.query(Note).delete()
    db.commit()

    suffix = ".webm"

    if audio.filename:
        suffix = "." + audio.filename.split(".")[-1]

    temp = tempfile.NamedTemporaryFile(
        delete=False,
        suffix=suffix,
    )

    with temp:
        shutil.copyfileobj(audio.file, temp)

    note = Note(status="uploaded")

    db.add(note)
    db.commit()
    db.refresh(note)

    return note, temp.name