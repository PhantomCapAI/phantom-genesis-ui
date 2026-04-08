import { AGENTS } from "@/lib/agents";

const PFP_MAP: Record<string, string> = {
  Phoebe: "/phoebe.png",
  Loom: "/loom.png",
  Claire: "/claire.png",
  Nova: "/nova.png",
  Cipher: "/cipher.png",
};

export function AgentAvatar({ name, size = 36 }: { name: string; size?: number }) {
  const agent = AGENTS[name];
  const color = agent?.color ?? "#666";
  const pfp = PFP_MAP[name];

  if (pfp) {
    return (
      <img
        src={pfp}
        alt={name}
        width={size}
        height={size}
        className="rounded-full object-cover shrink-0"
        style={{ width: size, height: size, border: `2px solid ${color}` }}
      />
    );
  }

  return (
    <div
      className="rounded-full flex items-center justify-center shrink-0 font-mono font-bold text-black"
      style={{ backgroundColor: color, width: size, height: size, fontSize: size * 0.4 }}
    >
      {name[0]}
    </div>
  );
}
