export type OutputType =
  | 'website'
  | 'mobile-app'
  | 'image'
  | 'video'
  | 'backend-api'
  | 'automation'
  | 'marketing-copy';

export type Locale = 'en' | 'ar' | 'fr';

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
