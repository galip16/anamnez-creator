import Recorder from "@/components/Recorder";

export default function MobileView() {
  return (
    <main className="flex min-h-screen flex-col bg-gray-50">

      <header className="border-b bg-white p-6 shadow-sm">

        <h1 className="text-center text-3xl font-bold">
          Anamnez Creator
        </h1>

      </header>

      <section className="flex flex-1 items-center justify-center">

        <Recorder />

      </section>

      <footer className="pb-8 text-center text-sm text-gray-400">

        v0.1

      </footer>

    </main>
  );
}