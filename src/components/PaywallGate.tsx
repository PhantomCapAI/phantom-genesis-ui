"use client";

const TREASURY = process.env.NEXT_PUBLIC_TREASURY_WALLET ?? "HmW2bQeLpJv3FJrSBV1jeyra2oof5rq6uBkB1cSLnSAK";

export function PaywallGate({ onDemoMode }: { onDemoMode: () => void }) {
  return (
    <div className="absolute inset-0 z-20 flex items-center justify-center backdrop-blur-md bg-black/60">
      <div className="bg-zinc-900 border border-zinc-800 rounded-lg p-8 max-w-sm w-full mx-4 text-center">
        <div className="text-2xl font-bold text-[#D4A853] mb-2 font-mono">
          x402
        </div>
        <p className="text-sm text-zinc-400 mb-6">
          Free preview expired. Pay to continue watching the swarm.
        </p>

        <div className="bg-zinc-950 rounded p-4 mb-6 text-left">
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>Price</span>
            <span className="text-zinc-300 font-mono">$0.10 USDC</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500 mb-2">
            <span>Chain</span>
            <span className="text-zinc-300 font-mono">Solana</span>
          </div>
          <div className="flex justify-between text-xs text-zinc-500">
            <span>Wallet</span>
            <span className="text-zinc-300 font-mono text-[10px]">
              {TREASURY.slice(0, 8)}...{TREASURY.slice(-4)}
            </span>
          </div>
        </div>

        <button className="w-full bg-[#D4A853] text-black font-semibold py-2.5 rounded text-sm hover:bg-[#c49a43] transition-colors mb-3">
          Pay with USDC on Solana
        </button>

        <button
          onClick={onDemoMode}
          className="w-full text-xs text-zinc-600 hover:text-zinc-400 transition-colors py-1"
        >
          Demo Mode (bypass for testing)
        </button>
      </div>
    </div>
  );
}
