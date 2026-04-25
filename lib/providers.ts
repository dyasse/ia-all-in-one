import type { GenerationPayload } from '@/types/generation';

type GenerationResult = {
  id: string;
  status: 'queued' | 'running' | 'complete';
  summary: string;
};

type ProviderClient = {
  generate: (payload: GenerationPayload) => Promise<GenerationResult>;
};

function buildMockResult(providerLabel: string, payload: GenerationPayload): GenerationResult {
  return {
    id: crypto.randomUUID(),
    status: 'complete',
    summary: `[Demo mode] ${providerLabel} key is missing. Generated a local summary for ${payload.outputTypes.join(', ')} from your prompt.`
  };
}

function buildInstruction(payload: GenerationPayload) {
  return `You are a generation coordinator. Summarize the requested build in 2 concise sentences.\nLanguage: ${payload.language}\nOutput types: ${payload.outputTypes.join(', ')}\nPrompt: ${payload.prompt}`;
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

      const data = (await response.json()) as {
        id?: string;
        output_text?: string;
      };

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

      const data = (await response.json()) as {
        id?: string;
        content?: Array<{ type: string; text?: string }>;
      };

      const text = data.content?.find((item) => item.type === 'text')?.text;

      return {
        id: data.id ?? crypto.randomUUID(),
        status: 'complete',
        summary: text ?? 'Generation request accepted by Anthropic.'
      };
    }
  };
}

export function getProviderClient(provider: string): ProviderClient {
  if (provider === 'anthropic') return getAnthropicClient();
  return getOpenAiClient();
}
