import { NextResponse } from 'next/server';
import { getProviderClient } from '@/lib/providers';
import type { GenerationPayload, OutputType } from '@/types/generation';

const VALID_OUTPUT_TYPES: ReadonlyArray<OutputType> = ['website', 'mobile-app', 'image', 'video'];

function isValidPayload(payload: Partial<GenerationPayload>): payload is GenerationPayload {
  return (
    typeof payload.prompt === 'string' &&
    payload.prompt.trim().length > 0 &&
    (payload.language === 'en' || payload.language === 'ar' || payload.language === 'fr') &&
    Array.isArray(payload.outputTypes) &&
    payload.outputTypes.length > 0 &&
    payload.outputTypes.every((type) => VALID_OUTPUT_TYPES.includes(type as OutputType))
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

    const client = getProviderClient(process.env.AI_PROVIDER);
    const result = await client.generate(payload);

    return NextResponse.json({ ok: true, result });
  } catch (error) {
    const message = error instanceof Error ? error.message : 'Unknown server error';

    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
