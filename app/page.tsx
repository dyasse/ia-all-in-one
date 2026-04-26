'use client';

import { FormEvent, useMemo, useState } from 'react';
import { LoaderCircle, SendHorizonal } from 'lucide-react';
import { generateWithApi } from '@/lib/generation-client';
import type { GenerationResult } from '@/types/generation';

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

function formatAssistantReply(result: GenerationResult): string {
  const lines = [
    result.summary,
    '',
    `Provider: ${result.providerUsed}`,
    'Deliverables:',
    ...result.deliverables.map((item) => `- ${item}`)
  ];

  return lines.join('\n');
}

export default function Page() {
  const [prompt, setPrompt] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [chat, setChat] = useState<ChatMessage[]>([
    {
      id: 'welcome',
      role: 'assistant',
      text: 'Salam 👋 Ana assistant dyalek. Kteb prompt dyalek b wodhôh, w ana njawebk b style bhal ChatGPT.'
    }
  ]);

  const canSend = prompt.trim().length > 0 && !isLoading;

  const helperText = useMemo(() => {
    if (isLoading) return 'Kankhdem 3la talab dyalek...';
    return 'Wadeh chno bghiti: app, page, feature, aw ay 7aja b details.';
  }, [isLoading]);

  async function handleSubmit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();

    const value = prompt.trim();
    if (!value || isLoading) return;

    const userMessage: ChatMessage = {
      id: `u-${Date.now()}`,
      role: 'user',
      text: value
    };

    setChat((prev) => [...prev, userMessage]);
    setPrompt('');
    setError(null);
    setIsLoading(true);

    try {
      const result = await generateWithApi(value, {
        language: 'darija',
        provider: 'auto',
        qualityMode: 'balanced',
        outputTypes: ['web']
      });

      setChat((prev) => [
        ...prev,
        {
          id: `a-${result.id}`,
          role: 'assistant',
          text: formatAssistantReply(result)
        }
      ]);
    } catch (requestError) {
      const message = requestError instanceof Error ? requestError.message : 'W9e3 mochkil f generation.';
      setError(message);
      setChat((prev) => [
        ...prev,
        {
          id: `a-error-${Date.now()}`,
          role: 'assistant',
          text: `Ma9dertch nkemmel daba: ${message}`
        }
      ]);
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <main className="simple-chat-shell">
      <section className="simple-chat-card">
        <header className="chat-header">
          <p className="chat-kicker">AI Builder</p>
          <h1>Simple Chat Interface</h1>
          <p>Kteb prompt dyalek hna, w ghadi njawebk b tari9a sahla w mdawza mzyan bhal ChatGPT.</p>
        </header>

        <div className="chat-stream" aria-live="polite">
          {chat.map((message) => (
            <article key={message.id} className={`chat-bubble ${message.role}`}>
              <span className="chat-role">{message.role === 'user' ? 'You' : 'Assistant'}</span>
              <p>{message.text}</p>
            </article>
          ))}
        </div>

        <form className="prompt-form" onSubmit={(event) => void handleSubmit(event)}>
          <label htmlFor="prompt">Prompt</label>
          <div className="prompt-row">
            <textarea
              id="prompt"
              value={prompt}
              onChange={(event) => setPrompt(event.target.value)}
              placeholder="Ex: Sift lia landing page simple b hero, pricing, w contact form"
              rows={3}
            />
            <button type="submit" disabled={!canSend}>
              {isLoading ? <LoaderCircle size={16} className="spin" /> : <SendHorizonal size={16} />}
              <span>{isLoading ? 'Generating' : 'Send'}</span>
            </button>
          </div>
          <p className="prompt-helper">{helperText}</p>
          {error ? <p className="prompt-error">{error}</p> : null}
        </form>
      </section>
    </main>
  );
}
