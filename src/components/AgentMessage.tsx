import { AGENTS, type SwarmMessage } from "@/lib/agents";
import { AgentAvatar } from "./AgentAvatar";

function formatTime(ts: string) {
  return new Date(ts).toLocaleTimeString("en-US", {
    hour: "2-digit",
    minute: "2-digit",
    second: "2-digit",
    hour12: false,
  });
}

function TypeBadge({ type }: { type: SwarmMessage["type"] }) {
  if (type === "message") return null;
  const styles: Record<string, string> = {
    tool_call: "bg-zinc-800 text-zinc-400",
    consensus: "bg-amber-950 text-amber-400",
    decision: "bg-amber-900 text-amber-300",
    launch: "bg-green-950 text-green-400",
  };
  return (
    <span className={`text-[10px] uppercase tracking-wider px-1.5 py-0.5 rounded font-mono ${styles[type] ?? ""}`}>
      {type.replace("_", " ")}
    </span>
  );
}

export function AgentMessage({ msg }: { msg: SwarmMessage }) {
  const agent = AGENTS[msg.agent];
  const color = agent?.color ?? "#666";

  return (
    <div className="flex gap-3 py-3 px-4">
      <AgentAvatar name={msg.agent} />
      <div className="min-w-0 flex-1">
        <div className="flex items-center gap-2 mb-1">
          <span className="font-semibold text-sm" style={{ color }}>
            {msg.agent}
          </span>
          <span className="text-[11px] text-zinc-600">{agent?.role}</span>
          <TypeBadge type={msg.type} />
          <span className="text-[11px] text-zinc-700 ml-auto font-mono">
            {formatTime(msg.timestamp)}
          </span>
        </div>
        <p
          className="text-sm text-zinc-300 leading-relaxed font-mono"
          style={{
            borderLeft: `3px solid ${color}`,
            paddingLeft: "0.75rem",
          }}
        >
          {msg.content}
        </p>
      </div>
    </div>
  );
}
