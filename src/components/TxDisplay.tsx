import type { SwarmMessage } from "@/lib/agents";

export function TxDisplay({ messages }: { messages: SwarmMessage[] }) {
  const launchMsg = messages.filter((m) => m.type === "launch").pop();
  if (!launchMsg) return null;

  return (
    <div className="border border-green-900/50 bg-green-950/30 rounded-lg p-4">
      <div className="text-[10px] uppercase tracking-widest text-green-500 mb-2 font-mono">
        Launch Complete
      </div>
      <p className="text-xs text-zinc-400 font-mono leading-relaxed">
        {launchMsg.content}
      </p>
    </div>
  );
}
