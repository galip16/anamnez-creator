const API_URL = "http://127.0.0.1:8000";

export async function uploadAudio(audio: Blob) {
  const formData = new FormData();

  formData.append(
    "audio",
    audio,
    "recording.webm"
  );

  const response = await fetch(
    `${API_URL}/transcribe`,
    {
      method: "POST",
      body: formData,
    }
  );

  if (!response.ok) {
    throw new Error("Upload failed");
  }

  return response.json();
}

export async function getCurrentNote() {
  const response = await fetch(
    `${API_URL}/current-note`
  );

  if (!response.ok) {
    throw new Error("Request failed");
  }

  return response.json();
}