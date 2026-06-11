import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import Script from 'next/script';
import { SITE_URL } from '@/lib/products/sage-clog';
import './globals.css';

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: 'dyasse shop',
    template: '%s | dyasse shop'
  },
  description: 'Digital crochet patterns and handmade gift tutorials from dyasse shop.',
  applicationName: 'dyasse shop'
};

export default function RootLayout({
  children
}: Readonly<{
  children: ReactNode;
}>) {
  const metaPixelId = process.env.NEXT_PUBLIC_META_PIXEL_ID;

  return (
    <html lang="en">
      <body>
        {/* Set NEXT_PUBLIC_META_PIXEL_ID in Vercel Environment Variables. */}
        {metaPixelId ? (
          <>
            <Script
              id="meta-pixel"
              strategy="afterInteractive"
              dangerouslySetInnerHTML={{
                __html: `
                  !function(f,b,e,v,n,t,s)
                  {if(f.fbq)return;n=f.fbq=function(){n.callMethod?
                  n.callMethod.apply(n,arguments):n.queue.push(arguments)};
                  if(!f._fbq)f._fbq=n;n.push=n;n.loaded=!0;n.version='2.0';
                  n.queue=[];t=b.createElement(e);t.async=!0;
                  t.src=v;s=b.getElementsByTagName(e)[0];
                  s.parentNode.insertBefore(t,s)}(window, document,'script',
                  'https://connect.facebook.net/en_US/fbevents.js');
                  fbq('init', ${JSON.stringify(metaPixelId)});
                  fbq('track', 'PageView');
                `
              }}
            />
            <noscript>
              <img
                height="1"
                width="1"
                style={{ display: 'none' }}
                src={`https://www.facebook.com/tr?id=${encodeURIComponent(metaPixelId)}&ev=PageView&noscript=1`}
                alt=""
              />
            </noscript>
          </>
        ) : null}
        {children}
      </body>
    </html>
  );
}
