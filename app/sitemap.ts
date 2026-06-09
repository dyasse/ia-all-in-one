import type { MetadataRoute } from 'next';
import { canonicalUrl, SITE_URL, UPDATED_AT } from '@/lib/products/sage-clog';

export default function sitemap(): MetadataRoute.Sitemap {
  return [
    {
      url: SITE_URL,
      lastModified: UPDATED_AT,
      changeFrequency: 'weekly',
      priority: 0.7
    },
    {
      url: canonicalUrl,
      lastModified: UPDATED_AT,
      changeFrequency: 'weekly',
      priority: 1
    }
  ];
}
