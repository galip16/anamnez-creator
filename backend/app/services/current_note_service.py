from sqlalchemy.orm import Session

from app.models.note import Note


def get_current_note(db: Session):

    return (
        db.query(Note)
        .order_by(Note.created_at.desc())
        .first()
    )