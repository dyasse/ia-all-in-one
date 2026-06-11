import type { Metadata } from 'next';
import {
  FAQSection,
  FinalCTA,
  HeroSection,
  ProblemSolution,
  ProcessSection,
  ProductGallery,
  ReviewsSection,
  SEOContentSection,
  SizingMaterials,
  StickyMobileCTA,
  TrustBar,
  WhatsInside,
  WhatYouWillMake,
  WhyThisPatternWorks
} from './components/SageClogLanding';
import { MetaPixelViewContent } from './components/MetaPixelViewContent';
import { CHECKOUT_URL, canonicalUrl, product, SITE_URL } from '@/lib/products/sage-clog';

const ogImage = '/images/sage-clog/hero-pair.jpg';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: product.seoTitle,
  description: product.seoDescription,
  keywords: product.keywords,
  alternates: {
    canonical: product.route
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      'max-image-preview': 'large',
      'max-snippet': -1,
      'max-video-preview': -1
    }
  },
  openGraph: {
    title: product.seoTitle,
    description: product.seoDescription,
    url: product.route,
    siteName: product.brand,
    type: 'website',
    locale: 'en_US',
    images: [
      {
        url: ogImage,
        width: 1200,
        height: 1500,
        alt: 'Structured sage green crochet baby clogs pattern preview'
      }
    ]
  },
  twitter: {
    card: 'summary_large_image',
    title: product.seoTitle,
    description: product.seoDescription,
    images: [ogImage]
  }
};

export default function SageBabyClogPatternPage() {
  const imageUrls = product.gallery.map((image) => `${SITE_URL}${image.src}`);

  const productJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Product',
    '@id': `${canonicalUrl}#product`,
    name: product.name,
    brand: {
      '@type': 'Brand',
      name: product.brand
    },
    image: imageUrls,
    description: product.seoDescription,
    category: 'Digital crochet pattern',
    sku: 'sage-baby-clog-pattern-pdf',
    inLanguage: product.language,
    isRelatedTo: 'Crochet pattern PDF download',
    offers: {
      '@type': 'Offer',
      priceCurrency: 'USD',
      price: product.price.replace('$', ''),
      availability: 'https://schema.org/InStock',
      itemCondition: 'https://schema.org/NewCondition',
      url: CHECKOUT_URL
    },
    review: product.reviews.map((review) => ({
      '@type': 'Review',
      reviewBody: review.quote,
      author: {
        '@type': 'Person',
        name: review.author
      }
    }))
  };

  const faqJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${canonicalUrl}#faq`,
    mainEntity: product.faqs.map((faq) => ({
      '@type': 'Question',
      name: faq.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: faq.answer
      }
    }))
  };

  const webPageJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'WebPage',
    '@id': `${canonicalUrl}#webpage`,
    url: canonicalUrl,
    name: product.seoTitle,
    description: product.seoDescription,
    inLanguage: 'en-US',
    isPartOf: {
      '@type': 'WebSite',
      '@id': `${SITE_URL}#website`,
      name: product.brand,
      url: SITE_URL
    },
    primaryImageOfPage: {
      '@type': 'ImageObject',
      url: `${SITE_URL}${ogImage}`,
      width: 1200,
      height: 1500
    },
    mainEntity: {
      '@id': `${canonicalUrl}#product`
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        {
          '@type': 'ListItem',
          position: 1,
          name: 'Home',
          item: SITE_URL
        },
        {
          '@type': 'ListItem',
          position: 2,
          name: 'Crochet Baby Clog Pattern PDF',
          item: canonicalUrl
        }
      ]
    }
  };

  return (
    <main className="sage-page">
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(productJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(faqJsonLd) }} />
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(webPageJsonLd) }} />
      <MetaPixelViewContent contentId="sage-baby-clog-pattern" />
      <div className="sage-announcement">Digital PDF Pattern Only • Instant Download • Sizes 0–9 Months</div>
      <HeroSection />
      <TrustBar />
      <SEOContentSection />
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
