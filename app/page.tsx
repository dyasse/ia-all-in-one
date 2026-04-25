'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import {
  Sidebar,
  StudioHeader,
  Workspace,
  FeatureBar,
  AssetGallery,
  PricingModal,
  ArchitectureGuide
} from '@/components/dashboard';
import type { GenerationResult } from '@/types/generation';

export default function Page() {
  const [result, setResult] = useState<GenerationResult | null>(null);

  return (
    <main className="genx-shell">
      <Sidebar />
      <section className="genx-main">
        <StudioHeader onResult={setResult} />
        <FeatureBar />
        <Workspace result={result} />
        <AssetGallery result={result} />
        <ArchitectureGuide />
      </section>
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.35, delay: 0.15 }}
      >
        <PricingModal />
      </motion.div>
    </main>
  );
}
