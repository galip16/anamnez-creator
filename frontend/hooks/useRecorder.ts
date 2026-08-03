"use client";

import { useRef, useState } from "react";

import { uploadAudio } from "@/lib/api";

export type RecorderState =
  | "idle"
  | "recording"
  | "uploading"
  | "success"
  | "error";

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

    setState("uploading");

    mediaRecorder.current.onstop = async () => {
      try {
        const audioBlob = new Blob(audioChunks.current, {
          type: mediaRecorder.current?.mimeType,
        });

        await uploadAudio(audioBlob);

        setState("success");

        setTimeout(() => {
          setState("idle");
        }, 1500);
      } catch (error) {
        console.error(error);

        setState("error");
      }
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