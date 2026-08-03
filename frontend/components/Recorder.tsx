"use client";

import useRecorder from "@/hooks/useRecorder";

export default function Recorder() {
  const { state, toggleRecording } = useRecorder();

  const isRecording = state === "recording";
  const isUploading = state === "uploading";

  const icon =
    state === "idle"
      ? "🎤"
      : state === "recording"
        ? "⏹"
        : state === "uploading"
          ? "⬆️"
          : state === "success"
            ? "✅"
            : "❌";

  const title =
    state === "idle"
      ? "Kayda Başla"
      : state === "recording"
        ? "Kaydı Bitir"
        : state === "uploading"
          ? "Yükleniyor..."
          : state === "success"
            ? "Gönderildi"
            : "Hata";

  const subtitle =
    state === "idle"
      ? "Dokunarak yeni kayıt başlatın."
      : state === "recording"
        ? "İşiniz bitince tekrar dokunun."
        : state === "uploading"
          ? "Ses kaydı sunucuya gönderiliyor."
          : state === "success"
            ? "Yeni kayıt için hazırsınız."
            : "Bir hata oluştu. Lütfen tekrar deneyin.";

  return (
    <div className="flex flex-col items-center">

      <button
        onClick={toggleRecording}
        disabled={isUploading || state === "success"}
        className={`
          flex h-44 w-44 items-center justify-center
          rounded-full
          shadow-2xl
          transition-all
          duration-300
          active:scale-95
          ${
            isRecording
              ? "scale-105 bg-red-700"
              : "bg-red-600 hover:bg-red-700"
          }
          ${
            isUploading || state === "success"
              ? "cursor-not-allowed opacity-60"
              : ""
          }
        `}
      >
        <span className="text-7xl">
          {icon}
        </span>
      </button>

      <div className="mt-10 text-center">

        <h2 className="text-2xl font-semibold">
          {title}
        </h2>

        <p className="mt-3 text-gray-500">
          {subtitle}
        </p>

      </div>

      {isRecording && (
        <div className="mt-8 flex items-center gap-2">

          <span className="h-3 w-3 animate-pulse rounded-full bg-red-600" />

          <span className="font-medium text-red-600">
            Kayıt devam ediyor
          </span>

        </div>
      )}

    </div>
  );
}