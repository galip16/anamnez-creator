from sqlalchemy.orm import Session

from app.models.note import Note


def create_note(db: Session):

    note = Note()

    db.add(note)

    db.commit()

    db.refresh(note)

    return note


def get_notes(db: Session):

    return db.query(Note).all()