"use client";

import { AGENTS, type SwarmMessage } from "@/lib/agents";
import { AgentAvatar } from "./AgentAvatar";

export function AgentRoster({ messages }: { messages: SwarmMessage[] }) {
  // Find last message per agent to determine status
  const lastActivity: Record<string, string> = {};
  for (const m of messages) {
    lastActivity[m.agent] = m.timestamp;
  }

  return (
    <div className="flex flex-col gap-2">
      <h3 className="text-[11px] uppercase tracking-widest text-zinc-600 font-mono mb-1">
        Agents
      </h3>
      {Object.values(AGENTS).map((agent) => {
        const active = !!lastActivity[agent.name];
        return (
          <div key={agent.name} className="flex items-center gap-2.5 py-1">
            <AgentAvatar name={agent.name} size={28} />
            <div className="min-w-0">
              <div className="text-xs font-medium text-zinc-300">{agent.name}</div>
              <div className="text-[10px] text-zinc-600">{agent.role}</div>
            </div>
            <div
              className="w-1.5 h-1.5 rounded-full ml-auto"
              style={{ backgroundColor: active ? agent.color : "#333" }}
            />
          </div>
        );
      })}
    </div>
  );
}
