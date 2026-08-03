"use client";

import CopyButton from "@/components/CopyButton";
import StatusBadge from "@/components/StatusBadge";
import useCurrentNote from "@/hooks/useCurrentNote";

export default function DesktopView() {
  const { note, loading } = useCurrentNote();

  if (loading) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">
          Yükleniyor...
        </p>
      </main>
    );
  }

  if (!note) {
    return (
      <main className="flex min-h-screen items-center justify-center bg-gray-50">
        <p className="text-xl text-gray-500">
          Henüz anamnez bulunmuyor.
        </p>
      </main>
    );
  }

  return (
    <main className="mx-auto flex min-h-screen max-w-5xl flex-col bg-gray-50 p-10">

      <div className="mb-8 flex items-center justify-between">

        <div>
          <h1 className="text-4xl font-bold">
            Anamnez Creator
          </h1>

          <p className="mt-2 text-gray-500">
            Son oluşturulan anamnez
          </p>
        </div>

        <StatusBadge status={note.status} />

      </div>

      <div className="mb-8 rounded-2xl border border-gray-200 bg-white p-8 shadow-lg">

        <h2 className="mb-6 text-xl font-semibold">
          Anamnez
        </h2>

        <pre className="whitespace-pre-wrap font-sans text-lg leading-8">
          {note.anamnesis}
        </pre>

      </div>

      <div className="flex justify-end">
        <CopyButton text={note.anamnesis ?? ""} />
      </div>

    </main>
  );
}