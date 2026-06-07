import Image from 'next/image';
import { ArrowRight, BadgeCheck, BookOpen, Check, Download, Gift, HeartHandshake, Layers, Ruler, ShieldCheck, Sparkles } from 'lucide-react';
import { ctaHref, isPlaceholderCheckout, product } from '@/lib/products/sage-clog';

const sectionEyebrow = 'Digital pattern for makers';

function PrimaryButton({ children, href = ctaHref }: { children: string; href?: string }) {
  return (
    <a className="sage-btn sage-btn-primary" href={href} aria-label={`${children} for ${product.shortName}`}>
      {children}
      <ArrowRight aria-hidden="true" size={18} />
    </a>
  );
}

function SecondaryButton({ children, href }: { children: string; href: string }) {
  return (
    <a className="sage-btn sage-btn-secondary" href={href}>
      {children}
    </a>
  );
}

function SectionHeader({ eyebrow = sectionEyebrow, title, text }: { eyebrow?: string; title: string; text?: string }) {
  return (
    <div className="sage-section-header">
      <p className="sage-eyebrow">{eyebrow}</p>
      <h2>{title}</h2>
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
          A premium PDF crochet pattern for sage green baby clogs with a rounded toe dome, 7-hole ventilation detail, ridged sole,
          pivoting strap, and wooden button finish.
        </p>
        <ul className="sage-hero-bullets" aria-label="Pattern highlights">
          {product.heroBullets.map((item) => (
            <li key={item}>
              <Check aria-hidden="true" size={18} />
              <span>{item}</span>
            </li>
          ))}
        </ul>
        <div className="sage-hero-actions">
          <PrimaryButton>Get the Pattern</PrimaryButton>
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
          <small>Instant PDF access</small>
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
              <h2>{item.title}</h2>
              <p>{item.text}</p>
            </div>
          </article>
        );
      })}
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
        title="See the Shape, Texture, and Pattern Details"
        text="A clean visual overview of the finished inspiration and the digital tutorial experience."
      />
      <div className="sage-gallery" id="gallery-title">
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
      <SectionHeader title="A Sweet Pair of Sage Green Baby Clogs" />
      <div className="sage-card-grid" id="make-title">
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
        <SectionHeader title="Everything You Need to Build the Shape Step by Step" />
        <ul className="sage-check-list" id="inside-title">
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
      <SectionHeader title="Designed for Structure, Not Just Softness" />
      <div className="sage-feature-grid" id="why-title">
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

export function SizingMaterials() {
  return (
    <section className="sage-section sage-sizing" aria-labelledby="sizing-title">
      <SectionHeader title="Sizes & Materials" text="Clear sizing guidance and a practical supplies list before you begin." />
      <div className="sage-sizing-grid" id="sizing-title">
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
      <SectionHeader eyebrow="Selected customer feedback" title="Makers Are Excited to Create Them" />
      <div className="sage-review-grid" id="reviews-title">
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
        </div>
        <aside className="sage-offer-box" aria-label="Pattern offer">
          <p className="sage-offer-label">Crochet Baby Clog Pattern PDF</p>
          <ul>
            <li>Includes main PDF + diagrams companion</li>
            <li>Sizes 0–9 months</li>
            <li>Instant digital access</li>
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
      <SectionHeader title="Questions Before You Start" />
      <div className="sage-faq-list" id="faq-title">
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
