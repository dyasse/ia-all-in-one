export type OutputType = 'website' | 'mobile-app' | 'image' | 'video';

export type Locale = 'en' | 'ar' | 'fr';

export type ProviderName = 'openai' | 'anthropic';

export type GenerationStatus = 'queued' | 'running' | 'complete';

export type GenerationPayload = {
  prompt: string;
  language: Locale;
  outputTypes: OutputType[];
};

export type GenerationResult = {
  id: string;
  status: GenerationStatus;
  summary: string;
};

export type ProviderClient = {
  generate: (payload: GenerationPayload) => Promise<GenerationResult>;
};
