"use client";

import { useEffect, useRef, useState } from "react";
import type { SwarmMessage } from "@/lib/agents";
import { DEMO_MESSAGES } from "@/lib/demo-data";
import { AgentMessage } from "./AgentMessage";
import { AgentRoster } from "./AgentRoster";
import { PaywallGate } from "./PaywallGate";
import { LaunchCountdown } from "./LaunchCountdown";
import { TxDisplay } from "./TxDisplay";
import { WalletButton } from "./WalletButton";

const PREVIEW_SECONDS = 30;
const SWARM_API = process.env.NEXT_PUBLIC_SWARM_API_URL || "";

export function SwarmChat({ sessionId }: { sessionId?: string }) {
  // Initialize with demo messages immediately — no fetch, no loading state
  const [messages, setMessages] = useState<SwarmMessage[]>(
    sessionId ? [] : DEMO_MESSAGES
  );
  const [elapsed, setElapsed] = useState(0);
  const [demoMode, setDemoMode] = useState(!sessionId);
  const [topic, setTopic] = useState(
    sessionId ? "" : "Phantom Genesis — Autonomous Token Launch"
  );
  const [round, setRound] = useState(0);
  const [status, setStatus] = useState<string>(sessionId ? "connecting" : "completed");
  const bottomRef = useRef<HTMLDivElement>(null);

  const paywallActive = !demoMode && elapsed >= PREVIEW_SECONDS;
  const hasConsensus = messages.some((m) => m.type === "consensus");
  const hasLaunch = messages.some((m) => m.type === "launch");

  // Live SSE stream (only when sessionId is provided)
  useEffect(() => {
    if (demoMode || !sessionId || !SWARM_API) return;

    setStatus("connecting");
    const es = new EventSource(`${SWARM_API}/swarm/stream/${sessionId}`);

    es.onmessage = (event) => {
      try {
        const msg = JSON.parse(event.data);
        if (msg.type === "ping") return;
        const normalized: SwarmMessage = {
          ...msg,
          content: msg.text || msg.content || "",
        };
        setMessages((prev) => [...prev, normalized]);
        if (msg.round) setRound(msg.round);
        setStatus("live");
      } catch (e) {}
    };

    es.onerror = () => setStatus("disconnected");

    const statusPoll = setInterval(async () => {
      try {
        const res = await fetch(`${SWARM_API}/swarm/status/${sessionId}`);
        const data = await res.json();
        if (data.topic) setTopic(data.topic);
        if (data.current_round) setRound(data.current_round);
        if (data.status === "completed") {
          setStatus("completed");
          clearInterval(statusPoll);
        }
      } catch (e) {}
    }, 5000);

    return () => {
      es.close();
      clearInterval(statusPoll);
    };
  }, [sessionId, demoMode]);

  // Preview timer (live mode only)
  useEffect(() => {
    if (demoMode) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [demoMode]);

  // Auto-scroll on new messages
  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <div className="flex flex-1 min-h-0">
      {/* Sidebar */}
      <aside className="hidden md:flex flex-col w-56 border-r border-zinc-800/50 p-4 gap-6 shrink-0">
        <AgentRoster messages={messages} />
        <div className="mt-auto space-y-3">
          <LaunchCountdown active={hasConsensus && !hasLaunch} />
          <TxDisplay messages={messages} />
        </div>
      </aside>

      {/* Chat area */}
      <main className="flex-1 flex flex-col min-h-0 relative">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-zinc-800/50 px-4 py-3">
          <div className="flex items-center gap-3">
            <h1 className="text-sm font-semibold text-zinc-200 truncate max-w-[200px]">
              {topic || "Swarm Genesis"}
            </h1>
            {status === "live" && (
              <span className="flex items-center gap-1.5 text-[10px] font-mono text-[#D4A853]">
                <span className="w-1.5 h-1.5 rounded-full bg-[#D4A853] animate-pulse" />
                LIVE
              </span>
            )}
            {status === "completed" && (
              <span className="text-[10px] font-mono text-zinc-500">COMPLETED</span>
            )}
            <span className="text-[10px] font-mono text-zinc-600">
              {messages.length} msgs{round > 0 ? ` · R${round}` : ""}
            </span>
          </div>
          <div className="flex items-center gap-3">
            <WalletButton />
            <label className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-[10px] text-zinc-600 font-mono">Demo</span>
              <button
                onClick={() => {
                  const next = !demoMode;
                  setDemoMode(next);
                  setMessages(next ? DEMO_MESSAGES : []);
                  setTopic(next ? "Phantom Genesis — Autonomous Token Launch" : "");
                  setStatus(next ? "completed" : "idle");
                }}
                className={`w-8 h-4 rounded-full transition-colors relative ${
                  demoMode ? "bg-[#D4A853]" : "bg-zinc-700"
                }`}
              >
                <div
                  className={`w-3 h-3 rounded-full bg-white absolute top-0.5 transition-transform ${
                    demoMode ? "translate-x-4" : "translate-x-0.5"
                  }`}
                />
              </button>
            </label>
          </div>
        </div>

        {/* Messages */}
        <div className="flex-1 overflow-y-auto">
          <div className="divide-y divide-zinc-800/30">
            {messages.map((msg) => (
              <AgentMessage key={msg.id} msg={msg} />
            ))}
          </div>
          <div ref={bottomRef} />
        </div>

        {/* Mobile info */}
        <div className="md:hidden border-t border-zinc-800/50 p-3 space-y-2">
          <LaunchCountdown active={hasConsensus && !hasLaunch} />
          <TxDisplay messages={messages} />
        </div>

        {/* Paywall */}
        {paywallActive && <PaywallGate onDemoMode={() => setDemoMode(true)} />}
      </main>
    </div>
  );
}
