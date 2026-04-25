'use client';

import {
  Sidebar,
  StudioHeader,
  Workspace,
  FeatureBar,
  AssetGallery,
  PricingModal,
  ArchitectureGuide,
  type PlanStep,
  type StreamStatus,
  type VfsNode
} from '@/components/dashboard';
import { useState } from 'react';
import type { GenerationResult } from '@/types/generation';

const initialPlan: PlanStep[] = [
  { id: 's1', title: 'Orchestrator: waiting for a prompt...', status: 'pending' },
  { id: 's2', title: 'VFS generation', status: 'pending' },
  { id: 's3', title: 'Model routing and bridge execution', status: 'pending' },
  { id: 's4', title: 'Deployment wiring', status: 'pending' }
];

const initialTree: VfsNode[] = [
  { name: 'src', type: 'folder', children: [{ name: 'app/page.tsx', type: 'file', content: '// waiting for generation' }] }
];

export default function Page() {
  const [result, setResult] = useState<GenerationResult | null>(null);
  const [prompt, setPrompt] = useState('');
  const [streamStatus, setStreamStatus] = useState<StreamStatus>('idle');
  const [plan, setPlan] = useState<PlanStep[]>(initialPlan);
  const [logs, setLogs] = useState<string[]>([]);
  const [tree, setTree] = useState<VfsNode[]>(initialTree);

  return (
    <main className="genx-shell">
      <Sidebar />
      <section className="genx-main">
        <div className="top-zone">
          <PricingModal />
          <StudioHeader
            onResult={setResult}
            onPrompt={setPrompt}
            onStatus={setStreamStatus}
            onPlan={setPlan}
            onLogs={setLogs}
            onTree={setTree}
          />
        </div>
        <FeatureBar />
        <Workspace result={result} prompt={prompt} streamStatus={streamStatus} plan={plan} logs={logs} tree={tree} />
        <AssetGallery result={result} />
        <ArchitectureGuide />
      </section>
    </main>
  );
}
