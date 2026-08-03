interface Props {
  status: string;
}

export default function StatusBadge({ status }: Props) {
  const ready = status === "ready";

  return (
    <span
      className={`rounded-full px-4 py-2 text-sm font-semibold text-white ${
        ready ? "bg-green-600" : "bg-yellow-500"
      }`}
    >
      {ready ? "🟢 Hazır" : "🟡 İşleniyor"}
    </span>
  );
}