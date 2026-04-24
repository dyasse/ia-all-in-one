import type { Metadata } from 'next';
import './globals.css';

export const metadata: Metadata = {
  title: 'GenX AI Studio',
  description: 'Multi-modal AI generation SaaS dashboard'
};

export default function RootLayout({
  children
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
