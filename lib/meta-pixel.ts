type MetaPixelEvent = 'PageView' | 'ViewContent' | 'InitiateCheckout';

type MetaPixelParameters = Record<string, unknown>;

declare global {
  interface Window {
    fbq?: (...args: unknown[]) => void;
  }
}

export function trackMetaPixelEvent(eventName: MetaPixelEvent, parameters?: MetaPixelParameters) {
  if (typeof window === 'undefined' || typeof window.fbq !== 'function') {
    return;
  }

  if (parameters) {
    window.fbq('track', eventName, parameters);
    return;
  }

  window.fbq('track', eventName);
}

export function trackViewContent(contentId: string) {
  trackMetaPixelEvent('ViewContent', {
    content_ids: [contentId],
    content_type: 'product'
  });
}

export function trackInitiateCheckout(contentId: string) {
  trackMetaPixelEvent('InitiateCheckout', {
    content_ids: [contentId],
    content_type: 'product'
  });
}
