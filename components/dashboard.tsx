'use client';

import { useMemo, useState } from 'react';
import { motion } from 'framer-motion';
import {
  FolderKanban,
  Globe,
  Smartphone,
  Image as ImageIcon,
  Video,
  Package,
  CreditCard,
  KeyRound,
  LoaderCircle,
  Download,
  Github,
  Rocket,
  Crown,
  Languages,
  CircleDollarSign,
  BrainCircuit,
  Workflow,
  FileText
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SwitchPill } from '@/components/ui/switch';
import type { GenerationResult, OutputType, ProviderName, QualityMode } from '@/types/generation';

const nav = [
  { icon: FolderKanban, label: 'Projects' },
  { icon: Globe, label: 'Web Builder' },
  { icon: Smartphone, label: 'App Generator' },
  { icon: ImageIcon, label: 'Media Lab' },
  { icon: Package, label: 'My Assets' },
  { icon: CreditCard, label: 'Billing' },
  { icon: KeyRound, label: 'API Keys' }
];

const providerOptions: Array<{ code: ProviderName | 'auto'; label: string }> = [
  { code: 'auto', label: 'Auto Router' },
  { code: 'openai', label: 'OpenAI' },
  { code: 'anthropic', label: 'Anthropic' },
  { code: 'gemini', label: 'Gemini' },
  { code: 'groq', label: 'Groq' }
];

const qualityOptions: Array<{ code: QualityMode; label: string }> = [
  { code: 'fast', label: 'Fast' },
  { code: 'balanced', label: 'Balanced' },
  { code: 'beast', label: 'Beast' }
];

export function Sidebar() {
  return (
    <aside className="glass sidebar">
      <h1>GenX AI</h1>
      <p>Build websites, apps & media in one studio.</p>
      <nav>
        {nav.map(({ icon: Icon, label }) => (
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
  const [website, setWebsite] = useState(true);
  const [mobileApp, setMobileApp] = useState(true);
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);
  const [backendApi, setBackendApi] = useState(false);
  const [automation, setAutomation] = useState(false);
  const [marketingCopy, setMarketingCopy] = useState(false);
  const [language, setLanguage] = useState<'en' | 'ar' | 'fr'>('en');
  const [provider, setProvider] = useState<ProviderName | 'auto'>('auto');
  const [qualityMode, setQualityMode] = useState<QualityMode>('balanced');
  const [prompt, setPrompt] = useState(
    'Create a fintech website + mobile onboarding + AI automation flow + launch copy'
  );
  const [status, setStatus] = useState<'idle' | 'running' | 'success' | 'error'>('idle');
  const [summary, setSummary] = useState('Your generation output will appear in the workspace.');

  const outputTypes = useMemo<OutputType[]>(() => {
    return [
      website ? 'website' : null,
      mobileApp ? 'mobile-app' : null,
      image ? 'image' : null,
      video ? 'video' : null,
      backendApi ? 'backend-api' : null,
      automation ? 'automation' : null,
      marketingCopy ? 'marketing-copy' : null
    ].filter((value): value is OutputType => value !== null);
  }, [website, mobileApp, image, video, backendApi, automation, marketingCopy]);

  async function handleGenerate() {
    if (outputTypes.length === 0 || prompt.trim().length === 0) {
      setStatus('error');
      setSummary('Please provide a prompt and select at least one output type.');
      return;
    }

    setStatus('running');
    setSummary('Generation in progress...');

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          prompt,
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
        throw new Error(data.error ?? 'Generation failed. Try again.');
      }

      setStatus('success');
      setSummary(data.result.summary);
      onResult(data.result);
    } catch (error) {
      setStatus('error');
      setSummary(error instanceof Error ? error.message : 'Unexpected error while generating.');
    }
  }

  return (
    <Card>
      <div className="studio-head">
        <div>
          <h2>The Studio</h2>
          <p>Generate any digital output: web, app, media, automation, backend, and copywriting.</p>
        </div>
        <div className={`status status-${status}`}>
          <LoaderCircle className="spin" size={16} />
          {status === 'running'
            ? 'Generation in progress...'
            : status === 'success'
              ? 'Generation complete'
              : status === 'error'
                ? 'Generation failed'
                : 'Ready to generate'}
        </div>
      </div>
      <div className="prompt-shell">
        <Languages size={16} />
        <input
          placeholder="Describe your product... صف تطبيقك... Décris ton app..."
          value={prompt}
          onChange={(event) => setPrompt(event.target.value)}
        />
      </div>
      <div className="settings-grid">
        <div className="language-row">
          <small>Language</small>
          <div className="lang-switches">
            {[
              { code: 'en', label: 'English' },
              { code: 'ar', label: 'العربية' },
              { code: 'fr', label: 'Français' }
            ].map((lang) => (
              <button
                key={lang.code}
                className={`lang-pill ${language === lang.code ? 'lang-pill-active' : ''}`}
                onClick={() => setLanguage(lang.code as 'en' | 'ar' | 'fr')}
              >
                {lang.label}
              </button>
            ))}
          </div>
        </div>
        <div className="language-row">
          <small>AI Provider</small>
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
          <small>Quality Mode</small>
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
      <div className="toggles">
        <SwitchPill checked={website} onCheckedChange={setWebsite} label="Website" />
        <SwitchPill checked={mobileApp} onCheckedChange={setMobileApp} label="Mobile App" />
        <SwitchPill checked={image} onCheckedChange={setImage} label="Image" />
        <SwitchPill checked={video} onCheckedChange={setVideo} label="Video" />
        <SwitchPill checked={backendApi} onCheckedChange={setBackendApi} label="Backend API" />
        <SwitchPill checked={automation} onCheckedChange={setAutomation} label="Automation" />
        <SwitchPill
          checked={marketingCopy}
          onCheckedChange={setMarketingCopy}
          label="Marketing Copy"
        />
      </div>
      <div className="generate-row">
        <Button onClick={handleGenerate} disabled={status === 'running'}>
          {status === 'running' ? <LoaderCircle className="spin" size={14} /> : <Rocket size={14} />}
          {status === 'running' ? 'Generating...' : 'Generate now'}
        </Button>
        <small>Selected outputs: {outputTypes.length > 0 ? outputTypes.join(', ') : 'none'}</small>
      </div>
      <div className="summary-box">
        <strong>Result summary</strong>
        <p>{summary}</p>
      </div>
    </Card>
  );
}

export function FeatureBar() {
  return (
    <div className="feature-bar">
      <Button>
        <Download size={14} /> Export Source Code (.zip)
      </Button>
      <Button variant="outline">
        <Github size={14} /> Sync to GitHub
      </Button>
      <Button variant="pro">
        <Rocket size={14} /> Deploy to Vercel
      </Button>
    </div>
  );
}

type WorkspaceProps = {
  result: GenerationResult | null;
};

export function Workspace({ result }: WorkspaceProps) {
  const fallbackCode = useMemo(
    () => `// GenX AI Generated
export default function Hero() {
  return (
    <section className="hero glass">
      <h1>Launch faster with GenX AI</h1>
      <p>From prompt to production in minutes.</p>
    </section>
  );
}`,
    []
  );

  const code = result?.codeSample ?? fallbackCode;
  const previewHtml =
    result?.previewHtml ??
    `<html><body style="margin:0;background:#050505;color:#10B981;font-family:Inter;padding:2rem"><h2>Generated Preview</h2><p>Live website/app render appears here.</p></body></html>`;

  return (
    <section className="workspace">
      <Card className="preview">
        <h3>Preview</h3>
        <iframe title="generated-ui" srcDoc={previewHtml} />
      </Card>
      <Card className="editor">
        <div className="editor-head">
          <h3>Code Editor</h3>
          <div>
            <span>{result?.providerUsed ?? 'local demo'}</span>
            <span>{result?.status ?? 'ready'}</span>
          </div>
        </div>
        <pre>{code}</pre>
      </Card>
    </section>
  );
}

type AssetGalleryProps = {
  result: GenerationResult | null;
};

export function AssetGallery({ result }: AssetGalleryProps) {
  const items = result?.deliverables ?? [
    'Website starter pack',
    'Mobile app wireframes',
    'Automation workflow',
    'Launch content kit'
  ];

  return (
    <Card>
      <h3>Asset Gallery</h3>
      <div className="asset-grid">
        {items.map((item, idx) => (
          <motion.div
            key={item}
            className="asset"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            {idx % 4 === 0 ? (
              <ImageIcon size={18} />
            ) : idx % 4 === 1 ? (
              <Video size={18} />
            ) : idx % 4 === 2 ? (
              <Workflow size={18} />
            ) : (
              <FileText size={18} />
            )}
            <span>{item}</span>
          </motion.div>
        ))}
      </div>
    </Card>
  );
}

export function PricingModal() {
  const tiers = [
    { name: 'Free', price: '$0', note: 'Starter prompts and low queue priority' },
    { name: 'Pro', price: '$49', note: 'Unlimited generations + export & GitHub sync', pro: true },
    { name: 'Enterprise', price: 'Custom', note: 'Team seats, SSO, private model routing' }
  ];

  return (
    <Card className="pricing-modal">
      <h3>
        <CircleDollarSign size={16} /> Subscription Plans
      </h3>
      <div className="pricing-grid">
        {tiers.map((tier) => (
          <div key={tier.name} className={`tier ${tier.pro ? 'tier-pro' : ''}`}>
            <strong>
              {tier.name} {tier.pro && <Crown size={14} />}
            </strong>
            <p>{tier.price}</p>
            <small>{tier.note}</small>
            <Button variant={tier.pro ? 'pro' : 'ghost'}>Choose {tier.name}</Button>
          </div>
        ))}
      </div>
      <p className="stripe">Stripe Checkout + Billing Portal ready UI state.</p>
    </Card>
  );
}

export function ArchitectureGuide() {
  return (
    <Card>
      <h3>IA Modules Routing</h3>
      <ol className="guide-list">
        <li>Auto mode routes prompts to the strongest model based on requested outputs.</li>
        <li>OpenAI, Anthropic, Gemini, and Groq providers are ready via env keys.</li>
        <li>Backend endpoint validates payloads then returns deliverables + preview + code sample.</li>
        <li>Use one click to export ZIP, sync GitHub, and deploy to Vercel.</li>
      </ol>
      <p className="guide-paths">
        Stack: <BrainCircuit size={14} /> Multi-provider IA modules + Next.js API route + live workspace.
      </p>
    </Card>
  );
}
