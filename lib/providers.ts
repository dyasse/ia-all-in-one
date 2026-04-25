import type {
  GenerationPayload,
  GenerationResult,
  ProviderClient,
  ProviderName
} from '@/types/generation';

type OpenAiResponse = {
  id?: string;
  output_text?: string;
};

type AnthropicResponse = {
  id?: string;
  content?: Array<{ type: string; text?: string }>;
};

function buildMockResult(providerLabel: string, payload: GenerationPayload): GenerationResult {
  return {
    id: crypto.randomUUID(),
    status: 'complete',
    summary: `[Demo mode] ${providerLabel} key is missing. Generated a local summary for ${payload.outputTypes.join(', ')} from your prompt.`
  };
}

function buildInstruction(payload: GenerationPayload): string {
  return `You are a generation coordinator. Summarize the requested build in 2 concise sentences.\nLanguage: ${payload.language}\nOutput types: ${payload.outputTypes.join(', ')}\nPrompt: ${payload.prompt}`;
}

function parseOpenAiResponse(data: unknown): OpenAiResponse {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const parsed = data as Record<string, unknown>;
  return {
    id: typeof parsed.id === 'string' ? parsed.id : undefined,
    output_text: typeof parsed.output_text === 'string' ? parsed.output_text : undefined
  };
}

function parseAnthropicResponse(data: unknown): AnthropicResponse {
  if (!data || typeof data !== 'object') {
    return {};
  }

  const parsed = data as Record<string, unknown>;
  const content = Array.isArray(parsed.content)
    ? parsed.content
        .filter((item): item is { type: string; text?: string } => {
          if (!item || typeof item !== 'object') return false;
          const candidate = item as Record<string, unknown>;
          return (
            typeof candidate.type === 'string' &&
            (typeof candidate.text === 'string' || typeof candidate.text === 'undefined')
          );
        })
    : undefined;

  return {
    id: typeof parsed.id === 'string' ? parsed.id : undefined,
    content
  };
}

function getOpenAiClient(): ProviderClient {
  return {
    async generate(payload) {
      const apiKey = process.env.OPENAI_API_KEY;
      if (!apiKey) {
        return buildMockResult('OpenAI', payload);
      }

      const response = await fetch('https://api.openai.com/v1/responses', {
        method: 'POST',
        headers: {
          Authorization: `Bearer ${apiKey}`,
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
          input: buildInstruction(payload),
          max_output_tokens: 200
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`OpenAI request failed (${response.status}): ${errorBody}`);
      }

      const data = parseOpenAiResponse(await response.json());

      return {
        id: data.id ?? crypto.randomUUID(),
        status: 'complete',
        summary: data.output_text ?? 'Generation request accepted by OpenAI.'
      };
    }
  };
}

function getAnthropicClient(): ProviderClient {
  return {
    async generate(payload) {
      const apiKey = process.env.ANTHROPIC_API_KEY;
      if (!apiKey) {
        return buildMockResult('Anthropic', payload);
      }

      const response = await fetch('https://api.anthropic.com/v1/messages', {
        method: 'POST',
        headers: {
          'x-api-key': apiKey,
          'anthropic-version': '2023-06-01',
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-haiku-latest',
          max_tokens: 200,
          messages: [{ role: 'user', content: buildInstruction(payload) }]
        })
      });

      if (!response.ok) {
        const errorBody = await response.text();
        throw new Error(`Anthropic request failed (${response.status}): ${errorBody}`);
      }

      const data = parseAnthropicResponse(await response.json());
      const text = data.content?.find((item) => item.type === 'text')?.text;

      return {
        id: data.id ?? crypto.randomUUID(),
        status: 'complete',
        summary: text ?? 'Generation request accepted by Anthropic.'
      };
    }
  };
}

function normalizeProvider(provider?: string): ProviderName {
  return provider === 'anthropic' ? 'anthropic' : 'openai';
}

export function getProviderClient(provider?: string): ProviderClient {
  return normalizeProvider(provider) === 'anthropic' ? getAnthropicClient() : getOpenAiClient();
}
