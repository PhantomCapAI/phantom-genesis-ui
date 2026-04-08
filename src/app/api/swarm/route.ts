import { NextResponse } from "next/server";

const SWARM_API = process.env.NEXT_PUBLIC_SWARM_API_URL || "";
const INTERNAL_SECRET = process.env.PHANTOM_INTERNAL_SECRET || "";

export async function POST(request: Request) {
  const body = await request.json();

  if (!SWARM_API) {
    return NextResponse.json({ error: "SWARM_API not configured" }, { status: 500 });
  }

  const res = await fetch(`${SWARM_API}/swarm/start`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "X-Phantom-Internal": INTERNAL_SECRET,
    },
    body: JSON.stringify(body),
  });

  const data = await res.json();
  return NextResponse.json(data, { status: res.status });
}
