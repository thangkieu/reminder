import { kv } from "@vercel/kv";

export async function get<T = unknown>(name: string) {
  return await kv.get<T>(name);
}
