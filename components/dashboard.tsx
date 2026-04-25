'use client';

import { useEffect, useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  BrainCircuit,
  CheckCircle2,
  Cloud,
  CreditCard,
  Github,
  Globe,
  Image as ImageIcon,
  Languages,
  LoaderCircle,
  Lock,
  Rocket,
  Smartphone,
  UserCircle2,
  Video,
  Zap
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SwitchPill } from '@/components/ui/switch';
import type { GenerationResult, OutputType, ProviderName, QualityMode } from '@/types/generation';

const modules = [
  { key: 'web', icon: Globe, label: '/web · React + Tailwind' },
  { key: 'mobile', icon: Smartphone, label: '/mobile · React Native / Flutter' },
  { key: 'image', icon: ImageIcon, label: '/image · Flux / DALL·E' },
  { key: 'video', icon: Video, label: '/video · Luma / Runway' }
] as const;

const providerOptions: Array<{ code: ProviderName | 'auto'; label: string }> = [
  { code: 'auto', label: 'Brain Auto' },
  { code: 'anthropic', label: 'Claude 3.5 Sonnet' },
  { code: 'openai', label: 'GPT-4o / OpenAI' },
  { code: 'gemini', label: 'Gemini' },
  { code: 'groq', label: 'Groq' }
];

const qualityOptions: Array<{ code: QualityMode; label: string }> = [
  { code: 'fast', label: 'Fast' },
  { code: 'balanced', label: 'Balanced' },
  { code: 'beast', label: 'Production' }
];

export function Sidebar() {
  return (
    <aside className="glass sidebar">
      <h1>UltraGen AI</h1>
      <p>Cyberpunk control plane for multimodal generation.</p>
      <div className="stack-list">
        <span>
          <BrainCircuit size={14} /> Brain Orchestrator
        </span>
        <span>
          <Lock size={14} /> Clerk + Stripe + Upstash
        </span>
        <span>
          <Cloud size={14} /> Vercel + GitHub Sync
        </span>
      </div>
      <nav>
        {modules.map(({ icon: Icon, label }) => (
          <a key={label} className="nav-item" href="#">
            <Icon size={16} />
            {label}
          </a>
        ))}
      </nav>
    </aside>
  );
}

type StudioHeaderProps = {
  onResult: (result: GenerationResult) => void;
};

export function StudioHeader({ onResult }: StudioHeaderProps) {
  const [currentStep, setCurrentStep] = useState(1);
  const [web, setWeb] = useState(true);
  const [mobile, setMobile] = useState(true);
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);
  const [language, setLanguage] = useState<'darija' | 'ar' | 'en'>('darija');
  const [provider, setProvider] = useState<ProviderName | 'auto'>('auto');
  const [qualityMode, setQualityMode] = useState<QualityMode>('balanced');
  const [productType, setProductType] = useState('Taxi / Mobility');
  const [targetUsers, setTargetUsers] = useState('Urban users in Morocco');
  const [goal, setGoal] = useState('Launch MVP in 30 days with payments + maps');
  const [prompt, setPrompt] = useState(
    'Bghit app dyal t-takssiyat f l-meghrib b darija, m3a web dashboard, image branding, w video promo.'
  );
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [stream, setStream] = useState('> UltraGen Brain ready. Waiting for mission...');

  const outputTypes = useMemo<OutputType[]>(() => {
    return [web ? 'web' : null, mobile ? 'mobile' : null, image ? 'image' : null, video ? 'video' : null].filter(
      (value): value is OutputType => value !== null
    );
  }, [web, mobile, image, video]);

  useEffect(() => {
    if (status !== 'running') return;

    const frames = [
      '> Parsing multilingual prompt (Darija/Arabic/English)...',
      '> Routing to modules: /web /mobile /image /video',
      '> Building files + preview sandbox + deployment manifests...',
      '> Packaging ZIP + GitHub sync plan + Vercel deploy hook...'
    ];

    let index = 0;
    const timer = setInterval(() => {
      setStream(frames[index] ?? frames[frames.length - 1]);
      index += 1;
      if (index > frames.length - 1) clearInterval(timer);
    }, 850);

    return () => clearInterval(timer);
  }, [status]);

  async function handleGenerate() {
    if (outputTypes.length === 0 || prompt.trim().length === 0) {
      setStatus('error');
      setStream('> Error: choose at least one module and provide a valid prompt.');
      return;
    }

    setStatus('running');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt: `${prompt}\n\nProduct: ${productType}\nTarget users: ${targetUsers}\nMain goal: ${goal}`,
          language,
          provider,
          qualityMode,
          outputTypes
        })
      });

      const data = (await response.json()) as {
        ok: boolean;
        result?: GenerationResult;
        error?: string;
      };

      if (!response.ok || !data.ok || !data.result) {
        throw new Error(data.error ?? 'Generation failed.');
      }

      setStatus('success');
      setStream(`> Success: ${data.result.summary}`);
      onResult(data.result);
    } catch (error) {
      setStatus('error');
      setStream(`> Failure: ${error instanceof Error ? error.message : 'Unknown error'}`);
    }
  }

  return (
    <Card>
      <div className="studio-head">
        <div>
          <h2>UltraGen Mission Console</h2>
          <p>Multi-step AI generation workflow with central Brain routing.</p>
        </div>
        <div className={`status status-${status}`}>
          {status === 'running' ? <LoaderCircle className="spin" size={16} /> : <Zap size={16} />}
          {status === 'running' ? 'Generating' : status === 'success' ? 'Completed' : 'Ready'}
        </div>
      </div>

      <div className="steps">
        {[1, 2, 3].map((step) => (
          <button
            key={step}
            className={`step ${currentStep === step ? 'step-active' : ''}`}
            onClick={() => setCurrentStep(step)}
          >
            Step {step}
          </button>
        ))}
      </div>

      {currentStep === 1 && (
        <div className="settings-grid">
          <label className="field">
            Product Type
            <input value={productType} onChange={(event) => setProductType(event.target.value)} />
          </label>
          <label className="field">
            Target Users
            <input value={targetUsers} onChange={(event) => setTargetUsers(event.target.value)} />
          </label>
          <label className="field">
            Launch Goal
            <input value={goal} onChange={(event) => setGoal(event.target.value)} />
          </label>
        </div>
      )}

      {currentStep === 2 && (
        <div className="toggles">
          <SwitchPill checked={web} onCheckedChange={setWeb} label="/web" />
          <SwitchPill checked={mobile} onCheckedChange={setMobile} label="/mobile" />
          <SwitchPill checked={image} onCheckedChange={setImage} label="/image" />
          <SwitchPill checked={video} onCheckedChange={setVideo} label="/video" />
        </div>
      )}

      {currentStep === 3 && (
        <div className="settings-grid">
          <div className="language-row">
            <small>Language</small>
            <div className="lang-switches">
              {[
                { code: 'darija', label: 'Darija' },
                { code: 'ar', label: 'العربية' },
                { code: 'en', label: 'English' }
              ].map((lang) => (
                <button
                  key={lang.code}
                  className={`lang-pill ${language === lang.code ? 'lang-pill-active' : ''}`}
                  onClick={() => setLanguage(lang.code as 'darija' | 'ar' | 'en')}
                >
                  {lang.label}
                </button>
              ))}
            </div>
          </div>
          <div className="language-row">
            <small>AI Router</small>
            <div className="lang-switches">
              {providerOptions.map((option) => (
                <button
                  key={option.code}
                  className={`lang-pill ${provider === option.code ? 'lang-pill-active' : ''}`}
                  onClick={() => setProvider(option.code)}
                >
                  {option.label}
                </button>
              ))}
            </div>
          </div>
          <div className="language-row">
            <small>Quality</small>
            <div className="lang-switches">
              {qualityOptions.map((mode) => (
                <button
                  key={mode.code}
                  className={`lang-pill ${qualityMode === mode.code ? 'lang-pill-active' : ''}`}
                  onClick={() => setQualityMode(mode.code)}
                >
                  {mode.label}
                </button>
              ))}
            </div>
          </div>
        </div>
      )}

      <div className="prompt-shell">
        <Languages size={16} />
        <input
          placeholder="Bghit SaaS... | أريد منصة... | Build a platform..."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
      </div>

      <motion.pre className="terminal" initial={{ opacity: 0.4 }} animate={{ opacity: 1 }}>
        {stream}
      </motion.pre>

      <div className="generate-row">
        <Button onClick={() => void handleGenerate()} disabled={status === 'running'}>
          {status === 'running' ? <LoaderCircle className="spin" size={14} /> : <Rocket size={14} />}
          {status === 'running' ? 'Generating...' : 'Run UltraGen Brain'}
        </Button>
        <small>Modules: {outputTypes.join(', ') || 'none'}</small>
      </div>
    </Card>
  );
}

export function FeatureBar() {
  return (
    <div className="feature-bar">
      <Button variant="outline">
        <Github size={14} /> Sync to GitHub
      </Button>
      <Button>
        <Cloud size={14} /> One-Click Deploy (Vercel API)
      </Button>
      <Button variant="pro">
        <CreditCard size={14} /> Stripe Credits & Plans
      </Button>
    </div>
  );
}

type WorkspaceProps = {
  result: GenerationResult | null;
};

export function Workspace({ result }: WorkspaceProps) {
  const code =
    result?.codeSample ??
    `// app/web/page.tsx
export default function HomePage() {
  return <main className="min-h-screen bg-zinc-950 text-emerald-300">UltraGen AI</main>;
}`;

  const webPreview =
    result?.previewHtml ??
    `<html><body style="margin:0;background:#04050a;color:#67e8f9;font-family:Inter;padding:20px"><h2>Web Preview Sandbox</h2><p>Generated React/Tailwind UI appears here.</p></body></html>`;

  return (
    <section className="workspace">
      <Card className="editor">
        <div className="editor-head">
          <h3>Multi-file Editor (Monaco-ready)</h3>
          <div>
            <span>{result?.providerUsed ?? 'demo'}</span>
            <span>{result?.status ?? 'ready'}</span>
          </div>
        </div>
        <pre>{code}</pre>
      </Card>

      <Card className="preview">
        <h3>Real-time Preview Sandbox</h3>
        <div className="preview-grid">
          <iframe title="web-preview" srcDoc={webPreview} />
          <div className="phone-mockup">
            <div className="phone-screen">
              <p>Mobile Emulator</p>
              <small>React Native / Flutter render</small>
            </div>
          </div>
        </div>
      </Card>
    </section>
  );
}

type AssetGalleryProps = {
  result: GenerationResult | null;
};

export function AssetGallery({ result }: AssetGalleryProps) {
  const items = result?.deliverables ?? [
    'app/web/* and app/mobile/* source',
    'Prompt pack for Flux / DALL·E',
    'Video scenes for Luma / Runway',
    'Deployment scripts + vercel.json'
  ];

  return (
    <Card>
      <h3>Generated Deliverables</h3>
      <div className="asset-grid">
        {items.map((item, idx) => (
          <motion.div
            key={item}
            className="asset"
            initial={{ opacity: 0, y: 8 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.06 }}
          >
            <CheckCircle2 size={16} />
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

export function PricingModal() {
  return (
    <Card className="pricing-modal">
      <h3>Monetization & Access</h3>
      <div className="pricing-grid">
        <div className="tier">
          <strong>Free</strong>
          <p>$0 / month</p>
          <small>50 credits · shared compute</small>
        </div>
        <div className="tier tier-pro">
          <strong>Pro</strong>
          <p>$49 / month</p>
          <small>2000 credits · GitHub sync · Vercel deploy</small>
        </div>
        <div className="tier">
          <strong>Enterprise</strong>
          <p>Custom</p>
          <small>SSO, private models, dedicated cluster</small>
        </div>
      </div>
      <p className="stripe">
        <UserCircle2 size={14} /> Clerk Auth (Google/GitHub) + Stripe Billing + credit metering.
      </p>
    </Card>
  );
}

export function ArchitectureGuide() {
  return (
    <Card>
      <h3>Professional Architecture (L-Architecture l-fenniya)</h3>
      <ol className="guide-list">
        <li>Brain Orchestrator parses prompt then routes to Web Builder, App Builder, Image Lab, or Video Studio.</li>
        <li>Next.js API proxy keeps API keys server-side with per-user rate limiting through Upstash Redis.</li>
        <li>JSZip bundles output files, then GitHub API creates repository and pushes generated structure.</li>
        <li>One-click Vercel SDK deploy publishes production preview in ~30 seconds.</li>
      </ol>
      <p className="guide-paths">Core stack: Next.js 14 App Router + TypeScript + Shadcn UI + Framer Motion.</p>
    </Card>
  );
}
