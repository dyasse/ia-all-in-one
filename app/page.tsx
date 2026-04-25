'use client';

import {
  Sidebar,
  StudioHeader,
  Workspace,
  FeatureBar,
  AssetGallery,
  PricingModal,
  ArchitectureGuide
} from '@/components/dashboard';
import { useState } from 'react';
import type { GenerationResult } from '@/types/generation';

export default function Page() {
  const [result, setResult] = useState<GenerationResult | null>(null);

  return (
    <main className="genx-shell">
      <Sidebar />
      <section className="genx-main">
        <div className="top-zone">
          <PricingModal />
          <StudioHeader onResult={setResult} />
        </div>
        <FeatureBar />
        <Workspace result={result} />
        <AssetGallery result={result} />
        <ArchitectureGuide />
      </section>
    </main>
  );
}
