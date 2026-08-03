"use client";

import { uploadAudio } from "@/lib/api";
import { useRef, useState } from "react";

export type RecorderState =
    | "idle"
    | "recording"
    | "processing";

export default function useRecorder() {
    const [state, setState] =
        useState<RecorderState>("idle");

    const mediaRecorder =
        useRef<MediaRecorder | null>(null);

    const audioChunks =
        useRef<Blob[]>([]);

    async function startRecording() {
        const stream =
            await navigator.mediaDevices.getUserMedia({
                audio: true,
            });

        const recorder =
            new MediaRecorder(stream);

        audioChunks.current = [];

        recorder.ondataavailable = (event) => {
            audioChunks.current.push(event.data);
        };

        recorder.start();

        mediaRecorder.current = recorder;

        setState("recording");
    }

    async function stopRecording() {
        if (!mediaRecorder.current) return;

        setState("processing");

        mediaRecorder.current.onstop = async () => {

            const audioBlob = new Blob(
                audioChunks.current,
                {
                    type: mediaRecorder.current?.mimeType,
                }
            );

            await uploadAudio(audioBlob);

            setState("idle");
        };

        mediaRecorder.current.stop();
    }

    async function toggleRecording() {
        if (state === "idle") {
            await startRecording();
            return;
        }

        if (state === "recording") {
            await stopRecording();
        }
    }

    return {
        state,
        toggleRecording,
    };
}