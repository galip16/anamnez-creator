from datetime import datetime

from pydantic import BaseModel


class NoteResponse(BaseModel):
    id: int
    status: str
    anamnesis: str | None
    created_at: datetime

    model_config = {
        "from_attributes": True
    }