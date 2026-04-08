export const metadata = {
  title: "Stats — Phantom Genesis",
  description: "Phantom Capital swarm statistics.",
};

const STATS = [
  { label: "x402 Revenue", value: "$0", subtitle: "Pre-launch" },
  { label: "Messages Streamed", value: "0", subtitle: "Pre-launch" },
  { label: "Unique Viewers", value: "0", subtitle: "Pre-launch" },
  { label: "Launches Completed", value: "0", subtitle: "Pre-launch" },
];

export default function StatsPage() {
  return (
    <div className="min-h-screen bg-[#0A0A0A] text-white px-6 py-20">
      <div className="max-w-3xl mx-auto">
        <h1 className="text-2xl font-semibold text-[#D4A853] mb-2">Swarm Stats</h1>
        <p className="text-sm text-zinc-500 mb-10">
          Revenue, engagement, and launch metrics for Phantom Genesis.
        </p>

        <div className="grid grid-cols-2 gap-4">
          {STATS.map((s) => (
            <div
              key={s.label}
              className="rounded-xl border border-zinc-800 bg-zinc-900/50 p-6 text-center"
            >
              <p className="font-mono text-3xl font-bold text-[#D4A853]">{s.value}</p>
              <p className="text-xs text-zinc-500 mt-2">{s.label}</p>
              {s.subtitle && (
                <p className="text-[10px] text-zinc-700 mt-1">{s.subtitle}</p>
              )}
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-zinc-700 mt-10">
          Stats update live once the first swarm launch completes.
        </p>
      </div>
    </div>
  );
}
