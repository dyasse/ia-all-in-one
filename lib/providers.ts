import type { GenerationPayload } from '@/types/generation';

type ProviderClient = {
  generate: (payload: GenerationPayload) => Promise<{
    id: string;
    status: 'queued' | 'running' | 'complete';
    summary: string;
  }>;
};

const mockClient: ProviderClient = {
  async generate(payload) {
    return {
      id: crypto.randomUUID(),
      status: 'running',
      summary: `Queued ${payload.outputTypes.join(', ')} generation for ${payload.language}`
    };
  }
};

export function getProviderClient(provider: string): ProviderClient {
  if (provider === 'anthropic' || provider === 'openai') return mockClient;
  return mockClient;
}
