"use client";

import { useEffect, useState } from "react";
import { getCurrentNote } from "@/lib/api";

export interface Note {
  id: number;
  status: string;
  transcription: string | null;
  anamnesis: string | null;
  created_at: string;
}

export default function useCurrentNote() {
  const [note, setNote] = useState<Note | null>(null);
  const [loading, setLoading] = useState(true);

  async function loadNote() {
    try {
      const data = await getCurrentNote();
      setNote(data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadNote();

    const interval = setInterval(loadNote, 2000);

    return () => clearInterval(interval);
  }, []);

  return {
    note,
    loading,
  };
}