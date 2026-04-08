export function LaunchCountdown({ active }: { active: boolean }) {
  if (!active) return null;

  return (
    <div className="border border-[#D4A853]/30 bg-[#D4A853]/5 rounded-lg p-4 text-center">
      <div className="text-[10px] uppercase tracking-widest text-[#D4A853] mb-1 font-mono">
        Consensus Reached
      </div>
      <div className="text-lg font-bold text-[#D4A853] font-mono">
        Launching...
      </div>
    </div>
  );
}
