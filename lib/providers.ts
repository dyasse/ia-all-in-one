import type {
  GenerationPayload,
  GenerationResult,
  OutputType,
  ProviderClient,
  ProviderName,
  QualityMode
} from '@/types/generation';

function escapeHtml(value: string): string {
  return value
    .replaceAll('&', '&amp;')
    .replaceAll('<', '&lt;')
    .replaceAll('>', '&gt;')
    .replaceAll('"', '&quot;')
    .replaceAll("'", '&#039;');
}

function qualityInstruction(qualityMode?: QualityMode): string {
  if (qualityMode === 'fast') return 'Fast iteration mode with concise deliverables.';
  if (qualityMode === 'beast') return 'Deep expert mode with production-ready detail and edge-cases.';
  return 'Balanced mode with practical detail and speed.';
}

function buildInstruction(payload: GenerationPayload): string {
  return [
    'You are an elite multi-modal AI builder.',
    qualityInstruction(payload.qualityMode),
    `Language: ${payload.language}`,
    `Requested outputs: ${payload.outputTypes.join(', ')}`,
    `User prompt: ${payload.prompt}`,
    'Return concise implementation summary and key deliverables.'
  ].join('\n');
}

function buildPreviewHtml(payload: GenerationPayload, provider: ProviderName): string {
  const safePrompt = escapeHtml(payload.prompt);
  const tags = payload.outputTypes
    .map(
      (type) =>
        `<span style="padding:4px 8px;border-radius:999px;background:#132a22;border:1px solid #1d6b50">${escapeHtml(type)}</span>`
    )
    .join(' ');
  const blocks = payload.outputTypes
    .map((type) => {
      const blueprint = getOutputBlueprint(type);
      return `<article style="padding:12px;border:1px solid #1f2937;border-radius:12px;background:#0b0f0e">
        <h3 style="margin:0 0 8px 0;color:#a7f3d0;font-size:14px">${escapeHtml(blueprint.title)}</h3>
        <p style="margin:0;color:#d1fae5;font-size:13px">${escapeHtml(blueprint.previewHint)}</p>
      </article>`;
    })
    .join('');

  return `<!doctype html>
<html>
  <body style="margin:0;background:#050505;color:#d1fae5;font-family:Inter,system-ui;padding:24px">
    <h2 style="margin-top:0">GenX AI — Delivery Preview</h2>
    <p><strong>Provider:</strong> ${provider}</p>
    <p><strong>Prompt:</strong> ${safePrompt}</p>
    <div style="display:flex;flex-wrap:wrap;gap:8px">${tags}</div>
    <section style="margin-top:16px;display:grid;grid-template-columns:repeat(auto-fit,minmax(220px,1fr));gap:10px">${blocks}</section>
    <p style="margin-top:16px;color:#a7f3d0">Preview generated and ready for export / GitHub sync.</p>
  </body>
</html>`;
}

type OutputBlueprint = {
  title: string;
  previewHint: string;
  deliverables: string[];
  codeSnippet: string;
};

function getOutputBlueprint(output: OutputType): OutputBlueprint {
  if (output === 'website') {
    return {
      title: 'Website Experience',
      previewHint: 'Responsive landing structure with hero, features and CTA blocks.',
      deliverables: ['Next.js pages scaffold', 'Reusable UI section components', 'SEO metadata + sitemap'],
      codeSnippet: `// website
export const websitePages = ['/', '/pricing', '/contact'];`
    };
  }

  if (output === 'mobile-app') {
    return {
      title: 'Mobile App',
      previewHint: 'Onboarding, authentication and dashboard screen architecture.',
      deliverables: ['Mobile screen wireframes', 'Navigation map', 'State/store structure'],
      codeSnippet: `// mobile-app
export const appFlow = ['Onboarding', 'SignIn', 'Home', 'Profile'];`
    };
  }

  if (output === 'image') {
    return {
      title: 'Image Assets',
      previewHint: 'Campaign-ready visual directions with prompt pack.',
      deliverables: ['Image generation prompts', 'Art direction styles', 'Asset naming convention'],
      codeSnippet: `// image
export const imageStyles = ['photoreal', 'isometric', 'brand-minimal'];`
    };
  }

  if (output === 'video') {
    return {
      title: 'Video Storyboard',
      previewHint: 'Short-form storyboard with scene timing and narration beats.',
      deliverables: ['Storyboard scenes', 'Shot list + timing', 'Voice-over script draft'],
      codeSnippet: `// video
export const videoTimeline = [{ scene: 1, sec: 0 }, { scene: 2, sec: 8 }];`
    };
  }

  if (output === 'backend-api') {
    return {
      title: 'Backend API',
      previewHint: 'REST endpoints, auth plan, and deployment-ready service layers.',
      deliverables: ['API route contracts', 'DB schema starter', 'Auth + role matrix'],
      codeSnippet: `// backend-api
export const apiRoutes = ['/auth/login', '/projects', '/projects/:id'];`
    };
  }

  if (output === 'automation') {
    return {
      title: 'Automation Flow',
      previewHint: 'Trigger-action pipeline with retries, alerts, and observability notes.',
      deliverables: ['Workflow nodes map', 'Failure retry strategy', 'Monitoring hooks'],
      codeSnippet: `// automation
export const automationTriggers = ['user_signup', 'payment_success'];`
    };
  }

  return {
    title: 'Marketing Copy',
    previewHint: 'Multi-channel launch copy for email, social and landing CTAs.',
    deliverables: ['Brand tone guide', 'Email sequence draft', 'Ad copy variants'],
    codeSnippet: `// marketing-copy
export const copyAngles = ['pain-point', 'social-proof', 'offer-driven'];`
  };
}

function buildCodeSample(payload: GenerationPayload, provider: ProviderName): string {
  const snippets = payload.outputTypes.map((output) => getOutputBlueprint(output).codeSnippet).join('\n\n');

  return `// Generated by ${provider}
// Quality mode: ${payload.qualityMode ?? 'balanced'}
export const generationPlan = {
  prompt: ${JSON.stringify(payload.prompt)},
  outputs: ${JSON.stringify(payload.outputTypes)}
};

${snippets}

export const handoffChecklist = [
  'Validate requirements with stakeholder',
  'Implement and iterate output modules',
  'Run QA and prepare deployment package'
];`;
}

function buildFallbackSummary(provider: ProviderName, payload: GenerationPayload): string {
  return `[Demo mode] ${provider} API key missing. I prepared a full delivery plan for ${payload.outputTypes.join(', ')} based on your prompt.`;
}

function buildDeliverables(payload: GenerationPayload): string[] {
  return payload.outputTypes.flatMap((type) => {
    const blueprint = getOutputBlueprint(type);
    return blueprint.deliverables.map((item) => `${blueprint.title}: ${item}`);
  });
}

function buildMockResult(provider: ProviderName, payload: GenerationPayload): GenerationResult {
  return {
    id: crypto.randomUUID(),
    status: 'complete',
    summary: buildFallbackSummary(provider, payload),
    providerUsed: provider,
    deliverables: buildDeliverables(payload),
    previewHtml: buildPreviewHtml(payload, provider),
    codeSample: buildCodeSample(payload, provider)
  };
}

function normalizeOpenAiSummary(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const parsed = data as Record<string, unknown>;
  if (typeof parsed.output_text === 'string' && parsed.output_text.trim().length > 0) {
    return parsed.output_text;
  }
  if (Array.isArray(parsed.output)) {
    for (const node of parsed.output) {
      if (!node || typeof node !== 'object') continue;
      const content = (node as Record<string, unknown>).content;
      if (!Array.isArray(content)) continue;
      for (const item of content) {
        if (!item || typeof item !== 'object') continue;
        const text = (item as Record<string, unknown>).text;
        if (typeof text === 'string' && text.trim().length > 0) return text;
      }
    }
  }
  return undefined;
}

function normalizeAnthropicSummary(data: unknown): string | undefined {
  if (!data || typeof data !== 'object') return undefined;
  const parsed = data as Record<string, unknown>;
  if (!Array.isArray(parsed.content)) return undefined;

  const textNode = parsed.content.find((item) => {
    if (!item || typeof item !== 'object') return false;
    const candidate = item as Record<string, unknown>;
    return candidate.type === 'text' && typeof candidate.text === 'string';
  }) as Record<string, unknown> | undefined;

  return typeof textNode?.text === 'string' ? textNode.text : undefined;
}

async function callOpenAi(payload: GenerationPayload): Promise<GenerationResult> {
  const apiKey = process.env.OPENAI_API_KEY;
  if (!apiKey) return buildMockResult('openai', payload);

  const response = await fetch('https://api.openai.com/v1/responses', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.OPENAI_MODEL ?? 'gpt-4.1-mini',
      input: buildInstruction(payload),
      max_output_tokens: 350
    })
  });

  if (!response.ok) {
    throw new Error(`OpenAI request failed (${response.status}): ${await response.text()}`);
  }

  const summary = normalizeOpenAiSummary(await response.json()) ?? 'OpenAI generation completed.';
  return {
    ...buildMockResult('openai', payload),
    summary
  };
}

async function callAnthropic(payload: GenerationPayload): Promise<GenerationResult> {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) return buildMockResult('anthropic', payload);

  const response = await fetch('https://api.anthropic.com/v1/messages', {
    method: 'POST',
    headers: {
      'x-api-key': apiKey,
      'anthropic-version': '2023-06-01',
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.ANTHROPIC_MODEL ?? 'claude-3-5-haiku-latest',
      max_tokens: 350,
      messages: [{ role: 'user', content: buildInstruction(payload) }]
    })
  });

  if (!response.ok) {
    throw new Error(`Anthropic request failed (${response.status}): ${await response.text()}`);
  }

  const summary = normalizeAnthropicSummary(await response.json()) ?? 'Anthropic generation completed.';
  return {
    ...buildMockResult('anthropic', payload),
    summary
  };
}

async function callGemini(payload: GenerationPayload): Promise<GenerationResult> {
  const apiKey = process.env.GEMINI_API_KEY;
  if (!apiKey) return buildMockResult('gemini', payload);

  const model = process.env.GEMINI_MODEL ?? 'gemini-1.5-flash';
  const endpoint = `https://generativelanguage.googleapis.com/v1beta/models/${model}:generateContent?key=${apiKey}`;
  const response = await fetch(endpoint, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      contents: [{ parts: [{ text: buildInstruction(payload) }] }]
    })
  });

  if (!response.ok) {
    throw new Error(`Gemini request failed (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const summary =
    ((data.candidates as Array<Record<string, unknown>> | undefined)?.[0]?.content as Record<string, unknown> | undefined)?.parts &&
    Array.isArray(((data.candidates as Array<Record<string, unknown>> | undefined)?.[0]?.content as Record<string, unknown> | undefined)?.parts)
      ? ((((data.candidates as Array<Record<string, unknown>> | undefined)?.[0]?.content as Record<string, unknown> | undefined)
          .parts as Array<Record<string, unknown>>)[0]?.text as string | undefined)
      : undefined;

  return {
    ...buildMockResult('gemini', payload),
    summary: summary && summary.trim().length > 0 ? summary : 'Gemini generation completed.'
  };
}

async function callGroq(payload: GenerationPayload): Promise<GenerationResult> {
  const apiKey = process.env.GROQ_API_KEY;
  if (!apiKey) return buildMockResult('groq', payload);

  const response = await fetch('https://api.groq.com/openai/v1/chat/completions', {
    method: 'POST',
    headers: {
      Authorization: `Bearer ${apiKey}`,
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({
      model: process.env.GROQ_MODEL ?? 'llama-3.3-70b-versatile',
      messages: [{ role: 'user', content: buildInstruction(payload) }],
      max_tokens: 350
    })
  });

  if (!response.ok) {
    throw new Error(`Groq request failed (${response.status}): ${await response.text()}`);
  }

  const data = (await response.json()) as Record<string, unknown>;
  const summary =
    ((data.choices as Array<Record<string, unknown>> | undefined)?.[0]?.message as Record<string, unknown> | undefined)
      ?.content as string | undefined;

  return {
    ...buildMockResult('groq', payload),
    summary: summary && summary.trim().length > 0 ? summary : 'Groq generation completed.'
  };
}

function resolveProvider(provider?: string): ProviderName {
  if (provider === 'anthropic' || provider === 'gemini' || provider === 'groq') return provider;
  return 'openai';
}

function pickAutoProvider(payload: GenerationPayload): ProviderName {
  if (payload.outputTypes.includes('video') || payload.qualityMode === 'beast') {
    return 'anthropic';
  }

  if (payload.outputTypes.includes('automation')) {
    return 'groq';
  }

  return 'openai';
}

export function getProviderClient(provider?: string): ProviderClient {
  return {
    async generate(payload) {
      const providerToUse = provider === 'auto' || !provider ? pickAutoProvider(payload) : resolveProvider(provider);

      if (providerToUse === 'anthropic') return callAnthropic(payload);
      if (providerToUse === 'gemini') return callGemini(payload);
      if (providerToUse === 'groq') return callGroq(payload);
      return callOpenAi(payload);
    }
  };
}
