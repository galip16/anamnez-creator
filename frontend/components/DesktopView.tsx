"use client";

import useCurrentNote from "@/hooks/useCurrentNote";

export default function DesktopView() {
  const { note, loading } = useCurrentNote();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Yükleniyor...</p>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="flex min-h-screen items-center justify-center">
        <p>Henüz anamnez yok.</p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col p-10">

      <h1 className="mb-6 text-3xl font-bold">
        Text Editor
      </h1>

      <div className="rounded-xl border p-6">

        <pre className="whitespace-pre-wrap font-sans">
          {note.anamnesis}
        </pre>

      </div>

    </main>
  );
}