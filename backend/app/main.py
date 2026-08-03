from fastapi import FastAPI

from app.api.routes import router
from app.db.init_db import init_db
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="Anamnez Creator API",
    version="0.1.0",
)

app.add_middleware(
    CORSMiddleware,
    allow_origins=[
        "http://localhost:3000",
    ],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

init_db()

app.include_router(router)


@app.get("/")
async def root():
    return {
        "status": "running"
    }