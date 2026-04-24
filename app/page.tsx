'use client';

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

export default function Page() {
  return (
    <main className="genx-shell">
      <Sidebar />
      <section className="genx-main">
        <StudioHeader />
        <FeatureBar />
        <Workspace />
        <AssetGallery />
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
