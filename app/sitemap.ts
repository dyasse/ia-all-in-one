import type { MetadataRoute } from 'next';import { siteUrl } from '@/lib/config';
export default function sitemap(): MetadataRoute.Sitemap {return ['','/picker','/task-unfreezer','/no-scroll','/favorites','/vip','/printable','/share','/privacy','/terms'].map(p=>({url:`${siteUrl.replace(/\/$/,'')}${p}`,lastModified:new Date('2026-06-24'),changeFrequency:'weekly',priority:p===''?1:.8}))}
