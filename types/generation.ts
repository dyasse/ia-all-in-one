export type OutputType = 'web' | 'mobile' | 'image' | 'video';

export type Locale = 'darija' | 'ar' | 'en';

export type ProviderName = 'openai' | 'anthropic' | 'gemini' | 'groq';

export type GenerationStatus = 'queued' | 'running' | 'complete';

export type QualityMode = 'fast' | 'balanced' | 'beast';

export type GenerationPayload = {
  prompt: string;
  language: Locale;
  outputTypes: OutputType[];
  provider?: ProviderName | 'auto';
  qualityMode?: QualityMode;
};

export type GenerationResult = {
  id: string;
  status: GenerationStatus;
  summary: string;
  providerUsed: ProviderName;
  deliverables: string[];
  previewHtml: string;
  codeSample: string;
};

export type ProviderClient = {
  generate: (payload: GenerationPayload) => Promise<GenerationResult>;
};
