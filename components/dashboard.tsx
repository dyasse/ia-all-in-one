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
  CircleDollarSign
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { SwitchPill } from '@/components/ui/switch';

const nav = [
  { icon: FolderKanban, label: 'Projects' },
  { icon: Globe, label: 'Web Builder' },
  { icon: Smartphone, label: 'App Generator' },
  { icon: ImageIcon, label: 'Media Lab' },
  { icon: Package, label: 'My Assets' },
  { icon: CreditCard, label: 'Billing' },
  { icon: KeyRound, label: 'API Keys' }
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

export function StudioHeader() {
  const [website, setWebsite] = useState(true);
  const [mobileApp, setMobileApp] = useState(true);
  const [image, setImage] = useState(false);
  const [video, setVideo] = useState(false);

  return (
    <Card>
      <div className="studio-head">
        <div>
          <h2>The Studio</h2>
          <p>Magic Prompt supports English, العربية, and Français.</p>
        </div>
        <div className="status">
          <LoaderCircle className="spin" size={16} />
          Generation in progress...
        </div>
      </div>
      <div className="prompt-shell">
        <Languages size={16} />
        <input
          placeholder="Describe your product... صف تطبيقك... Décris ton app..."
          defaultValue="Create a fintech landing page + Android app onboarding + hero image"
        />
      </div>
      <div className="toggles">
        <SwitchPill checked={website} onCheckedChange={setWebsite} label="Website" />
        <SwitchPill checked={mobileApp} onCheckedChange={setMobileApp} label="Mobile App" />
        <SwitchPill checked={image} onCheckedChange={setImage} label="Image" />
        <SwitchPill checked={video} onCheckedChange={setVideo} label="Video" />
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

export function Workspace() {
  const tabs = ['React', 'Flutter'];
  const code = useMemo(
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

  return (
    <section className="workspace">
      <Card className="preview">
        <h3>Preview</h3>
        <iframe title="generated-ui" srcDoc={`<html><body style="margin:0;background:#050505;color:#10B981;font-family:Inter;padding:2rem"><h2>Generated Preview</h2><p>Live website/app render appears here.</p></body></html>`} />
      </Card>
      <Card className="editor">
        <div className="editor-head">
          <h3>Code Editor</h3>
          <div>{tabs.map((tab) => <span key={tab}>{tab}</span>)}</div>
        </div>
        <pre>{code}</pre>
      </Card>
    </section>
  );
}

export function AssetGallery() {
  return (
    <Card>
      <h3>Asset Gallery</h3>
      <div className="asset-grid">
        {['Product Hero', 'Mobile Mockup', 'Promo Reel', 'Brand Loop'].map((item, idx) => (
          <motion.div
            key={item}
            className="asset"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: idx * 0.08 }}
          >
            {idx % 2 === 0 ? <ImageIcon size={18} /> : <Video size={18} />}
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
      <h3>Vercel + GitHub Workflow (L-Khochibat)</h3>
      <ol className="guide-list">
        <li>Click “Add to Codebase” or “Deploy” in v0 and connect your GitHub account.</li>
        <li>
          Clone locally: <code>git clone [repo] && cd [project] && npm install</code>
        </li>
        <li>Create backend route in <code>app/api/generate/route.ts</code> for secure generation.</li>
        <li>Set OpenAI/Anthropic API keys in Vercel Environment Variables before deploy.</li>
        <li>Deploy with Vercel.</li>
      </ol>
      <p className="guide-paths">
        Structure: <code>/components</code>, <code>/lib</code>, <code>/app/api</code>, <code>/types</code>.
      </p>
    </Card>
  );
}
