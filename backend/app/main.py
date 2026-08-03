from fastapi import FastAPI

from app.api.routes import router
from app.db.init_db import init_db

app = FastAPI(
    title="Anamnez Creator API",
    version="0.1.0",
)

init_db()

app.include_router(router)


@app.get("/")
async def root():
    return {
        "status": "running"
    }