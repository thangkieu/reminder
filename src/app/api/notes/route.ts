import { kv } from "@vercel/kv";
import { NextResponse } from "next/server";

export async function GET() {
  const list = await kv.lrange("notes", 0, -1);

  return NextResponse.json(list);
}
