export interface Agent {
  name: string;
  role: string;
  color: string;
}

export const AGENTS: Record<string, Agent> = {
  Phoebe: { name: "Phoebe", role: "Orchestrator", color: "#D4A853" },
  Loom: { name: "Loom", role: "Builder", color: "#4ADE80" },
  Claire: { name: "Claire", role: "Content", color: "#F472B6" },
  Nova: { name: "Nova", role: "Creative", color: "#818CF8" },
  Cipher: { name: "Cipher", role: "Security", color: "#F87171" },
};

export interface SwarmMessage {
  id: string;
  agent: string;
  role: string;
  content: string;
  timestamp: string;
  type: "message" | "tool_call" | "decision" | "consensus" | "launch";
}
