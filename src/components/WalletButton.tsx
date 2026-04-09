"use client";

import { useWallet, useConnection } from "@solana/wallet-adapter-react";
import { WalletMultiButton } from "@solana/wallet-adapter-react-ui";
import { useEffect, useState } from "react";
import { LAMPORTS_PER_SOL } from "@solana/web3.js";

export function WalletButton() {
  const { publicKey, connected } = useWallet();
  const { connection } = useConnection();
  const [balance, setBalance] = useState<number | null>(null);

  useEffect(() => {
    if (!connected || !publicKey) { setBalance(null); return; }
    connection.getBalance(publicKey).then((b) => setBalance(b / LAMPORTS_PER_SOL)).catch(() => {});
  }, [connected, publicKey, connection]);

  if (connected && publicKey) {
    const addr = publicKey.toBase58();
    return (
      <div className="px-3 py-1.5 rounded-lg border border-[#D4A853]/30 bg-[#D4A853]/5 text-xs font-mono text-[#D4A853]">
        {addr.slice(0, 6)}...{addr.slice(-4)}
        {balance !== null && <span className="ml-2 text-zinc-500">{balance.toFixed(2)} SOL</span>}
      </div>
    );
  }

  return (
    <div className="flex flex-col items-end gap-0.5">
      <WalletMultiButton style={{
        backgroundColor: "transparent",
        border: "1px solid rgba(212,168,83,0.3)",
        color: "#D4A853",
        fontSize: "11px",
        height: "28px",
        padding: "0 10px",
        borderRadius: "6px",
      }} />
      <span className="text-[8px] text-zinc-600">View-Only</span>
    </div>
  );
}
