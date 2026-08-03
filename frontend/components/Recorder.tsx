"use client";

import useRecorder from "@/hooks/useRecorder";

export default function Recorder() {

  const {
    state,
    toggleRecording,
  } = useRecorder();

  const buttonText =
    state === "idle"
      ? "🎤"
      : state === "recording"
      ? "⏹"
      : "⏳";

  const label =
    state === "idle"
      ? "Kayda Başla"
      : state === "recording"
      ? "Kaydı Bitir"
      : "İşleniyor...";

  return (
    <div className="flex flex-col items-center gap-6">

      <button
        onClick={toggleRecording}
        disabled={state === "processing"}
        className="
          h-36
          w-36
          rounded-full
          bg-red-600
          text-6xl
          text-white
          transition
          hover:bg-red-700
          disabled:opacity-50
        "
      >
        {buttonText}
      </button>

      <p className="text-xl font-semibold">
        {label}
      </p>

    </div>
  );
}