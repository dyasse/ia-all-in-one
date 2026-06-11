'use client';

import { useEffect } from 'react';
import { trackViewContent } from '@/lib/meta-pixel';

export function MetaPixelViewContent({ contentId }: { contentId: string }) {
  useEffect(() => {
    if (!process.env.NEXT_PUBLIC_META_PIXEL_ID) {
      return;
    }

    let timeoutId: ReturnType<typeof setTimeout> | undefined;
    let attempts = 0;

    const fireViewContent = () => {
      if (typeof window.fbq === 'function') {
        trackViewContent(contentId);
        return;
      }

      attempts += 1;
      if (attempts <= 20) {
        timeoutId = setTimeout(fireViewContent, 250);
      }
    };

    fireViewContent();

    return () => {
      if (timeoutId) {
        clearTimeout(timeoutId);
      }
    };
  }, [contentId]);

  return null;
}
