"use client";

import { useState } from "react";

interface Props {
  text: string;
}

export default function CopyButton({ text }: Props) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    await navigator.clipboard.writeText(text);

    setCopied(true);

    setTimeout(() => {
      setCopied(false);
    }, 2000);
  }

  return (
    <button
      onClick={copy}
      className="
        rounded-lg
        bg-blue-600
        px-5
        py-3
        font-semibold
        text-white
        hover:bg-blue-700
      "
    >
      {copied ? "✅ Kopyalandı" : "📋 Kopyala"}
    </button>
  );
}