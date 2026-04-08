export interface Agent {
  name: string;
  role: string;
  color: string;
}

export const AGENTS: Record<string, Agent> = {
  Phoebe: { name: "Phoebe", role: "Orchestrator", color: "#D4A853" },
  Loom: { name: "Loom", role: "Builder", color: "#7B8CDE" },
  Claire: { name: "Claire", role: "Content", color: "#E8A0BF" },
  Nova: { name: "Nova", role: "Growth", color: "#7ECFB3" },
  Cipher: { name: "Cipher", role: "Security", color: "#F0C27B" },
  "Mr. Sullivan": { name: "Mr. Sullivan", role: "Trading", color: "#8FD4E4" },
};

export interface SwarmMessage {
  id: string;
  agent: string;
  role: string;
  content: string;
  text?: string;
  round?: number | string;
  timestamp: string;
  color?: string;
  type: "message" | "tool_call" | "decision" | "consensus" | "launch" | "ping";
}
