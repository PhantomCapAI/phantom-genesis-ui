"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import { SwarmChat } from "@/components/SwarmChat";

export default function LaunchPage() {
  const router = useRouter();
  const [sessionId, setSessionId] = useState<string | undefined>();
  const [topic, setTopic] = useState("Should Phantom Capital launch $PHTM on bags.fm?");
  const [starting, setStarting] = useState(false);

  async function startDeliberation() {
    setStarting(true);
    try {
      const res = await fetch("/api/swarm", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ topic, free_mode: true }),
      });
      const data = await res.json();
      if (data.session_id) {
        setSessionId(data.session_id);
      }
    } catch (e) {
      console.error("Failed to start deliberation");
    }
    setStarting(false);
  }

  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      {!sessionId ? (
        <div className="flex-1 flex flex-col items-center justify-center px-6 gap-6">
          <div className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
          <h1 className="text-2xl font-semibold text-[#D4A853]">Launch Event</h1>
          <p className="text-sm text-zinc-500 max-w-md text-center">
            Start a live swarm deliberation. Five agents will debate the topic in real time.
          </p>
          <input
            type="text"
            value={topic}
            onChange={(e) => setTopic(e.target.value)}
            className="w-full max-w-lg bg-zinc-900 border border-zinc-800 rounded-lg px-4 py-2.5 text-sm text-white placeholder:text-zinc-600 focus:outline-none focus:border-[#D4A853]/50"
            placeholder="Enter deliberation topic..."
          />
          <button
            onClick={startDeliberation}
            disabled={starting || !topic}
            className="px-6 py-2.5 bg-[#D4A853] text-black text-sm font-semibold rounded-lg hover:bg-[#c49a43] transition-colors disabled:opacity-50"
          >
            {starting ? "Starting..." : "Start Deliberation"}
          </button>
        </div>
      ) : (
        <>
          <div className="border-b border-zinc-800/50 px-4 py-3 flex items-center gap-3">
            <span className="w-2 h-2 rounded-full bg-[#D4A853] animate-pulse" />
            <span className="text-sm font-semibold text-[#D4A853] uppercase tracking-wider">
              Live
            </span>
            <span className="text-xs text-zinc-600 font-mono">{sessionId}</span>
          </div>
          <SwarmChat sessionId={sessionId} />
        </>
      )}
    </div>
  );
}
