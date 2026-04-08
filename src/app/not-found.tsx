import Link from "next/link";

export default function NotFound() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#0A0A0A] text-white px-6">
      <h1 className="text-6xl font-bold text-[#D4A853] mb-4">404</h1>
      <p className="text-zinc-500 mb-8">Page not found.</p>
      <Link href="/genesis" className="text-sm text-[#D4A853] hover:underline">
        Back to Swarm
      </Link>
    </div>
  );
}
