"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import { SwarmChat } from "@/components/SwarmChat";

function HomeInner() {
  const params = useSearchParams();
  const sessionId = params.get("session") || undefined;
  return <SwarmChat sessionId={sessionId} />;
}

export default function Home() {
  return (
    <div className="flex flex-col h-screen bg-[#0A0A0A] text-white">
      <Suspense fallback={<div className="flex-1 flex items-center justify-center text-zinc-700">Loading...</div>}>
        <HomeInner />
      </Suspense>
    </div>
  );
}
