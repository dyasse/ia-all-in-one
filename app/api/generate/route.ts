import { NextResponse } from 'next/server';
import { getProviderClient } from '@/lib/providers';
import type { GenerationPayload } from '@/types/generation';

export async function POST(req: Request) {
  const payload = (await req.json()) as GenerationPayload;
  const client = getProviderClient(process.env.AI_PROVIDER ?? 'openai');

  const result = await client.generate(payload);

  return NextResponse.json({ ok: true, result });
}
