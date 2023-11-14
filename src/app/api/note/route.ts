import { kv } from "@vercel/kv";
import { randomUUID } from "crypto";
import { NextRequest, NextResponse } from "next/server";

export async function GET() {}

export async function POST(req: NextRequest) {
  const data = await req.json();

  data.created_at = new Date().toISOString();
  data.updated_at = new Date().toISOString();
  data.id = randomUUID();

  console.debug("Insert new note");
  await kv.lpush("notes", data);
  console.debug("Insert new note successful");

  const insertedData = await kv.lrange("notes", -1, -2);

  return NextResponse.json(insertedData);
}
