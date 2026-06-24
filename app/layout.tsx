import type { Metadata } from 'next';
import type { ReactNode } from 'react';
import { siteUrl } from '@/lib/config';
import './globals.css';
export const metadata: Metadata = {metadataBase:new URL(siteUrl),title:{default:'DopaPick — Free ADHD Dopamine Menu Picker | dias studio',template:'%s | DopaPick'},description:'A free ADHD-friendly dopamine reset picker for low-energy days, scroll loops, task initiation support, and no-shame motivation. Connected to the printable Dopamine Menu + Action Picker System by dias studio.',keywords:['ADHD dopamine menu','dopamine menu picker','ADHD motivation','no-scroll reset','task initiation support','ADHD productivity tool','dopamine reset','ADHD planner printable','executive function support','low energy reset','dias studio'],openGraph:{title:'DopaPick — Free ADHD Dopamine Menu Picker',description:'Choose your energy, time, and vibe. Get one tiny dopamine reset you can start now.',images:['/og-image.png']},twitter:{card:'summary_large_image'}};
export default function RootLayout({children}:{children:ReactNode}){return <html lang="en"><body>{children}</body></html>}
