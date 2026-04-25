import type {
  GenerationPayload,
  GenerationResult,
  Locale,
  OutputType,
  ProviderName,
  QualityMode
} from '@/types/generation';

type GenerationOptions = {
  language?: Locale;
  outputTypes?: OutputType[];
  provider?: ProviderName | 'auto';
  qualityMode?: QualityMode;
};

type GenerateApiSuccess = {
  ok: true;
  result: GenerationResult;
};

type GenerateApiFailure = {
  ok: false;
  error?: string;
};

type GenerateApiResponse = GenerateApiSuccess | GenerateApiFailure;

const DEFAULT_OPTIONS: Required<GenerationOptions> = {
  language: 'darija',
  outputTypes: ['web', 'mobile', 'image', 'video'],
  provider: 'auto',
  qualityMode: 'balanced'
};

export function buildGenerationPayload(prompt: string, options?: GenerationOptions): GenerationPayload {
  return {
    prompt,
    language: options?.language ?? DEFAULT_OPTIONS.language,
    outputTypes: options?.outputTypes ?? DEFAULT_OPTIONS.outputTypes,
    provider: options?.provider ?? DEFAULT_OPTIONS.provider,
    qualityMode: options?.qualityMode ?? DEFAULT_OPTIONS.qualityMode
  };
}

async function postGeneration(payload: GenerationPayload): Promise<GenerateApiResponse> {
  const response = await fetch('/api/generate', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  const data = (await response.json()) as GenerateApiResponse;

  if (!response.ok) {
    return {
      ok: false,
      error: data && 'error' in data && typeof data.error === 'string' ? data.error : 'Generation request failed.'
    };
  }

  return data;
}

export async function generateWithApi(prompt: string, options?: GenerationOptions): Promise<GenerationResult> {
  const payload = buildGenerationPayload(prompt, options);
  const result = await postGeneration(payload);

  if (!result.ok) {
    throw new Error(result.error ?? 'Unable to generate content from API.');
  }

  return result.result;
}
