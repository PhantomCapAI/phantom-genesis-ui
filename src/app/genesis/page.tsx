import { SwarmChat } from "@/components/SwarmChat";

export const metadata = {
  title: "Genesis — Phantom Capital",
  description: "Watch five AI agents deliberate and launch a token in real time.",
};

export default function GenesisPage() {
  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      <SwarmChat />
    </div>
  );
}
