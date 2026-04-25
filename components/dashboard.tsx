'use client';

import { useMemo, useState } from 'react';
import {
  Bot,
  CheckCircle2,
  Cloud,
  CreditCard,
  FileCode2,
  FolderTree,
  Github,
  Image as ImageIcon,
  LoaderCircle,
  Play,
  Send,
  Sparkles,
  TerminalSquare,
  Video
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { generateWithApi } from '@/lib/generation-client';
import type { GenerationResult } from '@/types/generation';

type StreamStatus = 'idle' | 'streaming' | 'done' | 'error';

type PlanStep = {
  id: string;
  title: string;
  status: 'pending' | 'running' | 'done';
};

type VfsNode = {
  name: string;
  type: 'file' | 'folder';
  content?: string;
  children?: VfsNode[];
};

type ChatMessage = {
  id: string;
  role: 'user' | 'assistant';
  text: string;
};

const starterTree: VfsNode[] = [
  {
    name: 'src',
    type: 'folder',
    children: [
      { name: 'app/page.tsx', type: 'file', content: '// Generate to view files...' },
      { name: 'components/editor.tsx', type: 'file', content: '// Monaco editor mount...' }
    ]
  },
  { name: 'api', type: 'folder', children: [{ name: 'orchestrator.ts', type: 'file', content: '// plan router' }] },
  { name: 'mobile', type: 'folder', children: [{ name: 'App.tsx', type: 'file', content: '// React Native app entry' }] },
  { name: 'media', type: 'folder', children: [{ name: 'storyboard.json', type: 'file', content: '{"scenes":[]}' }] }
];

const defaultCode = `// X-Builder AI :: Orchestrator
export async function orchestratePrompt(prompt: string) {
  return {
    plan: ['Analyze', 'Generate VFS', 'Build Preview', 'Prepare Deploy'],
    prompt
  };
}`;

const previewStub = `<!doctype html><html><body style="background:#050505;color:#d4d4d8;font-family:Inter;padding:24px"><h2>X-Builder AI Preview</h2><p>Run Prompt to Code to stream plan + files.</p></body></html>`;

function flattenFiles(nodes: VfsNode[]): VfsNode[] {
  return nodes.flatMap((node) => (node.type === 'file' ? [node] : flattenFiles(node.children ?? [])));
}

function sleep(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export function Sidebar() {
  return (
    <aside className="glass sidebar">
      <h1>X-Builder AI</h1>
      <p>Dark cyber-minimal workspace for autonomous software/media generation.</p>
      <div className="stack-list">
        <span>
          <Sparkles size={14} /> Next.js Orchestrator
        </span>
        <span>
          <FileCode2 size={14} /> VFS + Monaco + WebContainer/Sandpack
        </span>
        <span>
          <Cloud size={14} /> GitHub Push + Vercel Deploy + Stripe Credits
        </span>
      </div>
    </aside>
  );
}

type StudioHeaderProps = {
  onResult: (result: GenerationResult) => void;
  onPrompt: (value: string) => void;
  onStatus: (value: StreamStatus) => void;
  onPlan: (value: PlanStep[]) => void;
  onLogs: (value: string[]) => void;
  onTree: (value: VfsNode[]) => void;
};

export function StudioHeader({ onResult, onPrompt, onStatus, onPlan, onLogs, onTree }: StudioHeaderProps) {
  const [prompt, setPrompt] = useState(
    'Build a full-stack SaaS + mobile companion app with AI chat, Stripe billing, and media studio for image/video generation.'
  );
  const [status, setStatus] = useState<StreamStatus>('idle');

  async function handleGenerate() {
    if (!prompt.trim()) {
      setStatus('error');
      onStatus('error');
      return;
    }

    setStatus('streaming');
    onStatus('streaming');
    onPrompt(prompt);

    const steps: PlanStep[] = [
      { id: 's1', title: 'Orchestrator: break prompt into actionable execution plan', status: 'running' },
      { id: 's2', title: 'Create VFS tree: web/mobile/media/api folders and starter files', status: 'pending' },
      { id: 's3', title: 'Bridge models: Claude (code), Flux/DALL·E (image), Luma (video)', status: 'pending' },
      { id: 's4', title: 'Prepare deploy hooks: GitHub push + Vercel deploy button + Stripe usage', status: 'pending' }
    ];

    const logs = ['[boot] X-Builder runtime initialized'];
    onPlan(steps);
    onLogs(logs);

    try {
      await sleep(700);
      logs.push('[planner] Prompt analyzed and intent graph generated');
      onLogs([...logs]);

      steps[0].status = 'done';
      steps[1].status = 'running';
      onPlan([...steps]);
      await sleep(450);

      const result = await generateWithApi(prompt, {
        language: 'darija',
        provider: 'auto',
        qualityMode: 'balanced',
        outputTypes: ['web', 'mobile', 'image', 'video']
      });

      const generatedTree: VfsNode[] = [
        {
          name: 'src',
          type: 'folder',
          children: [
            {
              name: 'app/page.tsx',
              type: 'file',
              content:
                "export default function Home(){return <main className='bg-black text-indigo-300'>X-Builder App</main>}"
            },
            { name: 'components/chat-sidebar.tsx', type: 'file', content: 'export function ChatSidebar(){return null;}' },
            { name: 'components/terminal.tsx', type: 'file', content: 'export function Terminal(){return null;}' }
          ]
        },
        {
          name: 'api',
          type: 'folder',
          children: [{ name: 'generate/route.ts', type: 'file', content: '// connected to /api/generate' }]
        },
        { name: 'mobile', type: 'folder', children: [{ name: 'App.tsx', type: 'file', content: 'export default function App(){return null;}' }] },
        {
          name: 'media',
          type: 'folder',
          children: [
            { name: 'image-prompts.md', type: 'file', content: '# Flux / DALL·E prompts' },
            { name: 'video-storyboard.md', type: 'file', content: '# Luma scenes' }
          ]
        }
      ];

      onTree(generatedTree);
      logs.push('[vfs] Virtual file system generated (10 files)');
      onLogs([...logs]);

      steps[1].status = 'done';
      steps[2].status = 'running';
      onPlan([...steps]);
      await sleep(500);

      logs.push(`[bridge] Model routing completed by API provider: ${result.providerUsed}`);
      onLogs([...logs]);

      steps[2].status = 'done';
      steps[3].status = 'running';
      onPlan([...steps]);
      await sleep(350);

      logs.push('[deploy] Deployment actions configured for GitHub and Vercel');
      onLogs([...logs]);

      steps[3].status = 'done';
      onPlan([...steps]);

      onResult(result);
      setStatus('done');
      onStatus('done');
      logs.push('[done] Streaming finished successfully');
      onLogs([...logs]);
    } catch (error) {
      const message = error instanceof Error ? error.message : 'Generation failed';
      logs.push(`[error] ${message}`);
      onLogs([...logs]);
      setStatus('error');
      onStatus('error');
    }
  }

  return (
    <Card>
      <div className="studio-head">
        <div>
          <h2>Prompt → Plan → Code Stream</h2>
          <p>Central Next.js orchestrator for web/mobile/media generation.</p>
        </div>
        <div className={`status status-${status}`}>
          {status === 'streaming' ? <LoaderCircle className="spin" size={15} /> : <Sparkles size={15} />}
          {status === 'streaming' ? 'Streaming' : status === 'done' ? 'Ready' : 'Idle'}
        </div>
      </div>

      <div className="prompt-shell">
        <input value={prompt} onChange={(event) => setPrompt(event.target.value)} placeholder="Describe your product..." />
        <Button onClick={() => void handleGenerate()} disabled={status === 'streaming'}>
          {status === 'streaming' ? <LoaderCircle className="spin" size={14} /> : <Send size={14} />}
          Prompt to Code
        </Button>
      </div>
    </Card>
  );
}

export function FeatureBar() {
  return (
    <div className="feature-bar">
      <Button variant="outline">
        <Github size={14} /> Push to Repo
      </Button>
      <Button>
        <Cloud size={14} /> Vercel Deploy Button
      </Button>
      <Button variant="pro">
        <CreditCard size={14} /> Stripe Credits
      </Button>
    </div>
  );
}

type WorkspaceProps = {
  result: GenerationResult | null;
  plan: PlanStep[];
  logs: string[];
  tree: VfsNode[];
  streamStatus: StreamStatus;
  prompt: string;
};

export function Workspace({ result, plan, logs, tree, streamStatus, prompt }: WorkspaceProps) {
  const files = useMemo(() => flattenFiles(tree), [tree]);
  const [selectedFile, setSelectedFile] = useState('app/page.tsx');
  const selectedContent = files.find((file) => file.name === selectedFile)?.content ?? result?.codeSample ?? defaultCode;

  const chatHistory: ChatMessage[] = [
    { id: 'm1', role: 'assistant', text: 'Welcome to X-Builder AI. Describe what you want to build.' },
    ...(prompt
      ? [
          { id: 'm2', role: 'user', text: prompt },
          {
            id: 'm3',
            role: 'assistant',
            text:
              streamStatus === 'streaming'
                ? 'Streaming architecture plan now...'
                : 'Plan generated. You can inspect VFS, code editor, preview, and terminal logs.'
          }
        ]
      : [])
  ];

  return (
    <section className="workspace-grid">
      <Card className="chat-panel">
        <h3>
          <Bot size={15} /> AI Chat + History
        </h3>
        <div className="chat-list">
          {chatHistory.map((msg) => (
            <div key={msg.id} className={`chat-msg chat-${msg.role}`}>
              <strong>{msg.role === 'assistant' ? 'AI' : 'You'}</strong>
              <p>{msg.text}</p>
            </div>
          ))}
        </div>
      </Card>

      <Card className="vfs-panel">
        <h3>
          <FolderTree size={15} /> Virtual File System
        </h3>
        <div className="tree-list">
          {tree.map((node) => (
            <VfsTreeNode key={node.name} node={node} onSelect={setSelectedFile} />
          ))}
        </div>
      </Card>

      <Card className="editor-panel">
        <h3>
          <FileCode2 size={15} /> Monaco Editor (layout)
        </h3>
        <p className="editor-file">{selectedFile}</p>
        <pre>{selectedContent}</pre>
      </Card>

      <Card className="preview-panel">
        <h3>
          <Play size={15} /> Real-time Preview (WebContainer / Sandpack slot)
        </h3>
        <iframe title="preview" srcDoc={result?.previewHtml ?? previewStub} />
      </Card>

      <Card className="terminal-panel">
        <h3>
          <TerminalSquare size={15} /> Terminal Stream
        </h3>
        <pre>{logs.join('\n') || '[idle] waiting for prompt...'}</pre>
      </Card>

      <Card className="plan-panel">
        <h3>Orchestrator Plan</h3>
        <ol className="plan-list">
          {plan.map((step) => (
            <li key={step.id}>
              <CheckCircle2 size={14} className={`plan-icon plan-${step.status}`} />
              <span>{step.title}</span>
            </li>
          ))}
        </ol>
      </Card>
    </section>
  );
}

function VfsTreeNode({ node, onSelect, depth = 0 }: { node: VfsNode; onSelect: (path: string) => void; depth?: number }) {
  if (node.type === 'file') {
    return (
      <button className="tree-file" style={{ paddingLeft: `${12 + depth * 12}px` }} onClick={() => onSelect(node.name)}>
        {node.name}
      </button>
    );
  }

  return (
    <div>
      <p className="tree-folder" style={{ paddingLeft: `${8 + depth * 12}px` }}>
        {node.name}/
      </p>
      {node.children?.map((child) => (
        <VfsTreeNode key={`${node.name}-${child.name}`} node={child} onSelect={onSelect} depth={depth + 1} />
      ))}
    </div>
  );
}

type AssetGalleryProps = {
  result: GenerationResult | null;
};

export function AssetGallery({ result }: AssetGalleryProps) {
  const items = result?.deliverables ?? ['No deliverables yet. Run Prompt to Code.'];

  return (
    <Card>
      <h3>
        <ImageIcon size={15} /> Generated Assets
      </h3>
      <div className="asset-grid">
        {items.map((item) => (
          <div key={item} className="asset-item">
            {item}
          </div>
        ))}
      </div>
    </Card>
  );
}

export function PricingModal() {
  return (
    <Card className="pricing-modal">
      <h3>Credits / Subscription Dashboard</h3>
      <div className="tiers">
        <div className="tier-box">
          <strong>Starter</strong>
          <p>250 monthly credits</p>
        </div>
        <div className="tier-box tier-pro">
          <strong>Pro</strong>
          <p>5,000 credits + team workspaces</p>
        </div>
        <div className="tier-box">
          <strong>Scale</strong>
          <p>Custom GPU pool + SSO</p>
        </div>
      </div>
      <p className="billing-hint">Stripe integration ready for checkout + usage-based metering.</p>
    </Card>
  );
}

export function ArchitectureGuide() {
  return (
    <Card>
      <h3>Architecture Summary</h3>
      <ul className="guide-list">
        <li>Orchestrator in Next.js converts prompt to executable plan and streams progress.</li>
        <li>VFS panel mirrors generated folders/files for web, mobile, and media tasks.</li>
        <li>Editor + Preview + Terminal simulate autonomous generation loop.</li>
        <li>Model bridge targets Claude (code), Flux/DALL·E (images), and Luma (video).</li>
        <li>Deployment engine exposes GitHub push + Vercel deploy actions.</li>
      </ul>
      <p className="video-hint">
        <Video size={14} /> Dark cyber-minimal theme: Obsidian #050505 + Primary #6366f1.
      </p>
    </Card>
  );
}

export type { PlanStep, StreamStatus, VfsNode };
