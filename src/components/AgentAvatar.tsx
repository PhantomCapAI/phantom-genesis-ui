import { AGENTS } from "@/lib/agents";

export function AgentAvatar({ name, size = 36 }: { name: string; size?: number }) {
  const agent = AGENTS[name];
  const color = agent?.color ?? "#666";

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-black"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
    >
      {name[0]}
    </div>
  );
}
