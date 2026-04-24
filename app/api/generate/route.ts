import { NextResponse } from 'next/server';
import { getProviderClient } from '@/lib/providers';
import type { GenerationPayload } from '@/types/generation';

function isValidPayload(payload: Partial<GenerationPayload>): payload is GenerationPayload {
  return (
    typeof payload.prompt === 'string' &&
    payload.prompt.trim().length > 0 &&
    (payload.language === 'en' || payload.language === 'ar' || payload.language === 'fr') &&
    Array.isArray(payload.outputTypes) &&
    payload.outputTypes.length > 0
  );
}

export async function POST(req: Request) {
  try {
    const payload = (await req.json()) as Partial<GenerationPayload>;

    if (!isValidPayload(payload)) {
      return NextResponse.json(
        { ok: false, error: 'Invalid payload. Expected prompt, language, and outputTypes.' },
        { status: 400 }
      );
    }

    const client = getProviderClient(process.env.AI_PROVIDER ?? 'openai');
    const result = await client.generate(payload);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
