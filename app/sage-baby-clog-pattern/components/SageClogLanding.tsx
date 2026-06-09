import Image from 'next/image';
import type { ReactNode } from 'react';
import {
  ArrowRight,
  BadgeCheck,
  BookOpen,
  Check,
  Clock,
  Download,
  Gift,
  HeartHandshake,
  Layers,
  PackageCheck,
  Ruler,
  ShieldCheck,
  Sparkles,
  Star
} from 'lucide-react';
import { ctaHref, isPlaceholderCheckout, product } from '@/lib/products/sage-clog';

const sectionEyebrow = 'Digital pattern for makers';

function PrimaryButton({ children, href = ctaHref, label }: { children: ReactNode; href?: string; label?: string }) {
  const ariaLabel = label ?? (typeof children === 'string' ? `${children} for ${product.shortName}` : `Get ${product.shortName}`);

  return (
    <a className="sage-btn sage-btn-primary" href={href} aria-label={ariaLabel}>
      {children}
      <ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}

function SecondaryButton({ children, href }: { children: ReactNode; href: string }) {
  return (
    <a className="sage-btn sage-btn-secondary" href={href}>
      {children}
    </a>
  );
}

function SectionHeader({ eyebrow = sectionEyebrow, id, title, text }: { eyebrow?: string; id?: string; title: string; text?: string }) {
  return (
    <div className="sage-section-header">
      <p className="sage-eyebrow">{eyebrow}</p>
      <h2 id={id}>{title}</h2>
      {text ? <p>{text}</p> : null}
    </div>
  );
}

export function HeroSection() {
  return (
    <section className="sage-hero" aria-labelledby="sage-hero-title">
      <div className="sage-hero-copy">
        <p className="sage-pill">Premium crochet tutorial by {product.brand}</p>
        <h1 id="sage-hero-title">Crochet Structured Baby Clogs That Look Boutique-Made</h1>
        <p className="sage-hero-subtitle">
          Turn cotton yarn into a polished baby gift with a boutique-style PDF pattern: rounded toe dome, 7-hole ventilation detail,
          ridged sole, pivoting strap, and wooden button finish.
        </p>
        <div className="sage-hero-proof" aria-label="Customer proof and offer details">
          <span>
            <Star aria-hidden="true" size={16} /> 4.9 maker-loved style
          </span>
          <span>
            <Clock aria-hidden="true" size={16} /> Instant digital download
          </span>
          <span>
            <PackageCheck aria-hidden="true" size={16} /> No shipping, no waiting
          </span>
        </div>
        <ul className="sage-hero-bullets" aria-label="Pattern highlights">
          {product.heroBullets.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="sage-hero-actions">
          <PrimaryButton>Get the Pattern for {product.price}</PrimaryButton>
          <SecondaryButton href="#inside">See What’s Inside</SecondaryButton>
        </div>
        <p className="sage-microcopy">Digital PDF pattern only. Finished clogs are not included.</p>
      </div>

      <div className="sage-hero-media" aria-label="Product preview">
        <div className="sage-hero-image-card">
          <Image
            src="/images/sage-clog/hero-pair.jpg"
            alt="Pair of structured sage green crochet baby clogs with rounded ventilated toes and wooden buttons"
            fill
            priority
            sizes="(max-width: 900px) 100vw, 48vw"
            className="sage-image-cover"
          />
        </div>
        <div className="sage-floating-card sage-floating-price">
          <span>{product.price}</span>
          <small>Launch price • normally {product.oldPrice}</small>
        </div>
        <div className="sage-floating-card sage-floating-format">
          <BookOpen aria-hidden="true" size={18} />
          <small>Main PDF + diagrams</small>
        </div>
      </div>
    </section>
  );
}

export function TrustBar() {
  const items = [
    { icon: Download, title: 'Instant PDF Access', text: 'Start as soon as checkout is complete.' },
    { icon: BookOpen, title: 'Diagrams Included', text: 'Companion charts support the written steps.' },
    { icon: Ruler, title: '3 Baby Sizes', text: '0–3M, 3–6M, and 6–9M included.' },
    { icon: Sparkles, title: 'Boutique Finish', text: 'Built around clean shape and polished details.' }
  ];

  return (
    <section className="sage-trustbar" aria-label="Product trust highlights">
      {items.map((item) => {
        const Icon = item.icon;
        return (
          <article key={item.title} className="sage-trust-card">
            <Icon aria-hidden="true" size={20} />
            <div>
              <h3>{item.title}</h3>
              <p>{item.text}</p>
            </div>
          </article>
        );
      })}
    </section>
  );
}

export function SEOContentSection() {
  return (
    <section className="sage-section sage-audit" aria-labelledby="seo-content-title">
      <div className="sage-audit-copy">
        <p className="sage-eyebrow">Crochet baby shoes pattern PDF</p>
        <h2 id="seo-content-title">Structured Sage Green Baby Clogs for Handmade Gifts</h2>
        <p>
          This crochet baby clog pattern is made for makers who want baby shoes with a neat boutique finish instead of soft,
          shapeless booties. The instant-download PDF walks you through a firm sole, rounded 7-hole toe, pivoting strap, and
          button details for a sweet baby shower gift or keepsake project.
        </p>
      </div>
      <div className="sage-audit-grid" aria-label="Crochet pattern benefits">
        {product.funnelFixes.map((item) => (
          <article key={item.title} className="sage-audit-card">
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function ProblemSolution() {
  return (
    <section className="sage-split sage-problem" aria-labelledby="problem-title">
      <div>
        <p className="sage-eyebrow">Problem / solution</p>
        <h2 id="problem-title">Tired of Baby Booties That Look Soft, Flat, or Unfinished?</h2>
      </div>
      <p>
        Many crochet baby shoes lose their shape, collapse at the toe, or look too loose after finishing. This pattern is designed
        around structure: a firm cotton gauge, double-sole foundation, shaped toe canopy, corded opening rim, and pivoting strap so
        the final result looks polished and gift-ready.
      </p>
    </section>
  );
}

export function ProductGallery() {
  return (
    <section className="sage-section" aria-labelledby="gallery-title">
      <SectionHeader
        id="gallery-title"
        title="See the Shape, Texture, and Pattern Details"
        text="A clean visual overview of the finished inspiration and the digital tutorial experience."
      />
      <div className="sage-gallery">
        {product.gallery.map((image, index) => (
          <figure key={image.src} className={index === 0 ? 'sage-gallery-item sage-gallery-featured' : 'sage-gallery-item'}>
            <Image src={image.src} alt={image.alt} fill sizes={index === 0 ? '(max-width: 900px) 100vw, 56vw' : '(max-width: 900px) 50vw, 24vw'} className="sage-image-cover" />
            <figcaption>{image.caption}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function WhatYouWillMake() {
  return (
    <section className="sage-section sage-soft-panel" aria-labelledby="make-title">
      <SectionHeader id="make-title" title="A Sweet Pair of Sage Green Baby Clogs" />
      <div className="sage-card-grid">
        {product.makeCards.map((item) => (
          <article key={item} className="sage-mini-card">
            <BadgeCheck aria-hidden="true" size={20} />
            <h3>{item}</h3>
          </article>
        ))}
      </div>
    </section>
  );
}

export function WhatsInside() {
  return (
    <section id="inside" className="sage-section sage-inside" aria-labelledby="inside-title">
      <div className="sage-inside-image">
        <Image
          src="/images/sage-clog/ipad-pattern.jpg"
          alt="Tablet showing a crochet baby clog pattern PDF with diagrams companion"
          fill
          sizes="(max-width: 900px) 100vw, 38vw"
          className="sage-image-cover"
        />
      </div>
      <div>
        <SectionHeader id="inside-title" title="Everything You Need to Build the Shape Step by Step" />
        <ul className="sage-check-list">
          {product.inside.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}

export function WhyThisPatternWorks() {
  const features = [
    {
      icon: Layers,
      title: 'Firm Foundation',
      text: 'Double sole and ridged edge help create a thicker clog-style base.'
    },
    {
      icon: HeartHandshake,
      title: 'Rounded Toe Shape',
      text: 'The toe canopy is shaped and assembled to create a lifted, rounded front.'
    },
    {
      icon: Sparkles,
      title: 'Clean Finishing',
      text: 'Corded rim, strap edging, and button placement create a polished handmade look.'
    }
  ];

  return (
    <section className="sage-section" aria-labelledby="why-title">
      <SectionHeader id="why-title" title="Designed for Structure, Not Just Softness" />
      <div className="sage-feature-grid">
        {features.map((feature) => {
          const Icon = feature.icon;
          return (
            <article key={feature.title} className="sage-feature-card">
              <Icon aria-hidden="true" size={24} />
              <h3>{feature.title}</h3>
              <p>{feature.text}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}

export function ProcessSection() {
  return (
    <section className="sage-section sage-process" aria-labelledby="process-title">
      <SectionHeader
        id="process-title"
        eyebrow="Simple project path"
        title="From Download to Gift-Ready Pair"
        text="A clear sequence keeps the project moving without guessing where each detail belongs."
      />
      <div className="sage-process-grid">
        {product.process.map((item) => (
          <article key={item.title} className="sage-process-card">
            <span>{item.step}</span>
            <h3>{item.title}</h3>
            <p>{item.text}</p>
          </article>
        ))}
      </div>
    </section>
  );
}

export function SizingMaterials() {
  return (
    <section className="sage-section sage-sizing" aria-labelledby="sizing-title">
      <SectionHeader id="sizing-title" title="Sizes & Materials" text="Clear sizing guidance and a practical supplies list before you begin." />
      <div className="sage-sizing-grid">
        <div className="sage-table-card">
          <h3>Sizes included</h3>
          <table>
            <tbody>
              {product.sizes.map((size) => (
                <tr key={size.label}>
                  <th scope="row">{size.label}</th>
                  <td>{size.sole}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        <div className="sage-table-card">
          <h3>Materials</h3>
          <ul className="sage-check-list sage-compact-list">
            {product.materials.map((item) => (
              <li key={item}>
                <Check aria-hidden="true" size={17} />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="sage-safety-note" role="note">
        <ShieldCheck aria-hidden="true" size={20} />
        <p>Wooden buttons are small parts. Sew securely and inspect before use. Never leave a baby unattended with handmade footwear.</p>
      </div>
    </section>
  );
}

export function ReviewsSection() {
  return (
    <section className="sage-section sage-reviews" aria-labelledby="reviews-title">
      <SectionHeader id="reviews-title" eyebrow="Selected customer feedback" title="Makers Are Excited to Create Them" />
      <div className="sage-review-grid">
        {product.reviews.map((review) => (
          <figure key={`${review.author}-${review.quote}`} className="sage-review-card">
            <blockquote>“{review.quote}”</blockquote>
            <figcaption>— {review.author}</figcaption>
          </figure>
        ))}
      </div>
    </section>
  );
}

export function FinalCTA() {
  return (
    <>
      <section id="checkout" className="sage-section sage-offer" aria-labelledby="checkout-title">
        <div className="sage-offer-copy">
          <p className="sage-eyebrow">Limited-time launch offer</p>
          <h2 id="checkout-title">Start Your Sage Baby Clogs Today</h2>
          <p>Get the structured baby clog pattern PDF and diagrams companion for a calm, step-by-step crochet project.</p>
          <div className="sage-guarantee" role="note">
            <ShieldCheck aria-hidden="true" size={20} />
            <span>Clear digital product expectations: instant PDF access, no physical item shipped, and FAQ support before purchase.</span>
          </div>
        </div>
        <aside className="sage-offer-box" aria-label="Pattern offer">
          <p className="sage-offer-label">Crochet Baby Clog Pattern PDF</p>
          <ul>
            {product.valueStack.map((item) => (
              <li key={item}>{item}</li>
            ))}
          </ul>
          <div className="sage-price-row">
            <span className="sage-old-price">{product.oldPrice}</span>
            <strong>{product.price}</strong>
          </div>
          <PrimaryButton>Get Instant Access</PrimaryButton>
          <p className="sage-microcopy">Digital PDF pattern only. No physical product will be shipped.</p>
          {isPlaceholderCheckout ? <p className="sage-checkout-placeholder">Add your checkout link here</p> : null}
        </aside>
      </section>

      <section className="sage-final-cta" aria-labelledby="final-cta-title">
        <Gift aria-hidden="true" size={30} />
        <h2 id="final-cta-title">Make a Boutique-Style Baby Gift With Your Own Hands</h2>
        <PrimaryButton>Download the Pattern</PrimaryButton>
        <p>Instant PDF access • English instructions • Sizes 0–9 months</p>
      </section>
    </>
  );
}

export function FAQSection() {
  return (
    <section className="sage-section sage-faq" aria-labelledby="faq-title">
      <SectionHeader id="faq-title" title="Questions Before You Start" />
      <div className="sage-faq-list">
        {product.faqs.map((faq) => (
          <details key={faq.question} className="sage-faq-item">
            <summary>{faq.question}</summary>
            <p>{faq.answer}</p>
          </details>
        ))}
      </div>
    </section>
  );
}

export function StickyMobileCTA() {
  return (
    <div className="sage-sticky-cta" role="region" aria-label="Quick purchase bar">
      <div>
        <strong>{product.shortName}</strong>
        <span>{product.price}</span>
      </div>
      <a href={ctaHref}>Get Pattern</a>
    </div>
  );
}
