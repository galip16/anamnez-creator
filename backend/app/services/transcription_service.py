from fastapi import UploadFile


async def transcribe(audio: UploadFile) -> str:

    return """
65 yaş erkek.

3 gündür öksürük.

Ateş tariflemiyor.

Dispne yok.
"""