"use client";

import { SwarmChat } from "@/components/SwarmChat";

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      <SwarmChat />
    </div>
  );
}
