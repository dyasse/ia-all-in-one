import type { Metadata } from 'next';
import {
  FAQSection,
  FinalCTA,
  FunnelAuditSection,
  HeroSection,
  ProblemSolution,
  ProcessSection,
  ProductGallery,
  ReviewsSection,
  SizingMaterials,
  StickyMobileCTA,
  TrustBar,
  WhatsInside,
  WhatYouWillMake,
  WhyThisPatternWorks
} from './components/SageClogLanding';
import { ctaHref, product } from '@/lib/products/sage-clog';

export const metadata: Metadata = {
  metadataBase: new URL('https://dyasse.shop'),
  title: product.seoTitle,
  description: product.seoDescription,
  openGraph: {
    title: product.seoTitle,
    description: product.seoDescription,
    type: 'website',
    images: [
      {
        url: '/images/sage-clog/hero-pair.jpg',
        width: 1200,
        height: 1500,
        alt: 'Structured sage green crochet baby clogs pattern preview'
      }
    ]
  }
};

export default function SageBabyClogPatternPage() {
  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    image: product.gallery.map((image) => image.src),
    description: product.seoDescription,
    category: 'Digital crochet pattern',
    isRelatedTo: 'Crochet pattern PDF download',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price.replace('$', ''),
      availability: 'https://schema.org/InStock',
      url: ctaHref
    }
  };

  return (
    <main className="sage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <div className="sage-announcement">Digital PDF Pattern Only • Instant Download • Sizes 0–9 Months</div>
      <HeroSection />
      <TrustBar />
      <FunnelAuditSection />
      <ProblemSolution />
      <ProductGallery />
      <WhatYouWillMake />
      <WhatsInside />
      <WhyThisPatternWorks />
      <ProcessSection />
      <SizingMaterials />
      <ReviewsSection />
      <FinalCTA />
      <FAQSection />
      <StickyMobileCTA />
    </main>
  );
}
