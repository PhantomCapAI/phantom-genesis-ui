"use client";

import { useEffect, useRef, useState } from "react";
import type { SwarmMessage } from "@/lib/agents";
import { AgentMessage } from "./AgentMessage";
import { AgentRoster } from "./AgentRoster";
import { PaywallGate } from "./PaywallGate";
import { LaunchCountdown } from "./LaunchCountdown";
import { TxDisplay } from "./TxDisplay";

const PREVIEW_SECONDS = 30;

export function SwarmChat() {
  const [messages, setMessages] = useState<SwarmMessage[]>([]);
  const [elapsed, setElapsed] = useState(0);
  const [demoMode, setDemoMode] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const paywallActive = !demoMode && elapsed >= PREVIEW_SECONDS;
  const hasConsensus = messages.some((m) => m.type === "decision");
  const hasLaunch = messages.some((m) => m.type === "launch");

  // Load demo messages one by one for a streaming feel
  useEffect(() => {
    let allMessages: SwarmMessage[] = [];
    let idx = 0;
    let interval: ReturnType<typeof setInterval>;

    fetch("/demo-session.json")
      .then((r) => r.json())
      .then((data: SwarmMessage[]) => {
        allMessages = data;
        interval = setInterval(() => {
          if (idx < allMessages.length) {
            setMessages((prev) => [...prev, allMessages[idx]]);
            idx++;
          } else {
            clearInterval(interval);
          }
        }, 800);
      });

    return () => clearInterval(interval);
  }, []);

  // Preview timer
  useEffect(() => {
    if (demoMode) return;
    const timer = setInterval(() => setElapsed((e) => e + 1), 1000);
    return () => clearInterval(timer);
  }, [demoMode]);

  // Auto-scroll
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
            <h1 className="text-sm font-semibold text-zinc-200">Swarm Genesis</h1>
            <span className="text-[10px] font-mono text-zinc-600 uppercase tracking-wider">
              {messages.length} messages
            </span>
            {!paywallActive && !demoMode && (
              <span className="text-[10px] font-mono text-zinc-700">
                Preview: {Math.max(0, PREVIEW_SECONDS - elapsed)}s
              </span>
            )}
          </div>
          <div className="flex items-center gap-2">
            <label className="flex items-center gap-1.5 cursor-pointer">
              <span className="text-[10px] text-zinc-600 font-mono">Demo</span>
              <button
                onClick={() => setDemoMode((d) => !d)}
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

        {/* Mobile-only launch info */}
        <div className="md:hidden border-t border-zinc-800/50 p-3 space-y-2">
          <LaunchCountdown active={hasConsensus && !hasLaunch} />
          <TxDisplay messages={messages} />
        </div>

        {/* Paywall overlay */}
        {paywallActive && <PaywallGate onDemoMode={() => setDemoMode(true)} />}
      </main>
    </div>
  );
}
