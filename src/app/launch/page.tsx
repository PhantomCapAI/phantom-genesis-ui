"use client";

import { useState } from "react";
import { SwarmChat } from "@/components/SwarmChat";

export default function LaunchPage() {
  const [launched, setLaunched] = useState(false);

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      {/* Launch header */}
      <div className="border-b border-zinc-800/50 px-4 py-3 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
          <span className="text-sm font-semibold text-[#D4A853] uppercase tracking-wider">
            {launched ? "Launched" : "Live"}
          </span>
        </div>
        {!launched && (
          <div className="text-xs text-zinc-600 font-mono">
            Swarm deliberation in progress
          </div>
        )}
      </div>

      {/* Token details panel (populates after launch) */}
      {launched && (
        <div className="border-b border-[#D4A853]/30 bg-[#D4A853]/5 px-4 py-3">
          <div className="max-w-5xl mx-auto flex items-center justify-between text-sm">
            <span className="text-[#D4A853] font-mono">Token details will appear here</span>
          </div>
        </div>
      )}

      {/* Swarm chat */}
      <SwarmChat />
    </div>
  );
}
