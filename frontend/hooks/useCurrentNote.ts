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

        let interval = 10000;

        if (note?.status === "processing") {
            interval = 5000;
        }

        const timer = setInterval(loadNote, interval);

        return () => clearInterval(timer);
    }, [note?.status]);

    return {
        note,
        loading,
    };
}