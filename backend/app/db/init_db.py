from app.db.database import Base
from app.db.database import engine

import app.models


def init_db():

    Base.metadata.create_all(bind=engine)