export type OutputType = 'website' | 'mobile-app' | 'image' | 'video';

export type GenerationPayload = {
  prompt: string;
  language: 'en' | 'ar' | 'fr';
  outputTypes: OutputType[];
};
