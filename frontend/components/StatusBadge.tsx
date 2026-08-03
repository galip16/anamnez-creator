interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const badges = {
    uploaded: {
      color: "bg-blue-600",
      text: "⬆️ Ses alındı",
    },

    transcribing: {
      color: "bg-yellow-500",
      text: "🎙️ Yazıya dökülüyor",
    },

    creating_anamnesis: {
      color: "bg-orange-500",
      text: "🤖 Anamnez hazırlanıyor",
    },

    ready: {
      color: "bg-green-600",
      text: "✅ Hazır",
    },

    failed: {
      color: "bg-red-600",
      text: "❌ Hata",
    },
  };

  const badge =
    badges[status as keyof typeof badges] ??
    badges.failed;

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${badge.color}`}
    >
      {badge.text}
    </span>
  );
}