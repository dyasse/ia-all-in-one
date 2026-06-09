import type { Metadata } from 'next';
import type { ReactNode } from 'react';
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
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
