import type { MetadataRoute } from 'next';
import { getAllArticles, getAllGuides, getAllResearchNotes, getAllResources } from '@/lib/content';
import { absoluteUrl } from '@/lib/seo';

const staticPaths = [
  '/',
  '/about',
  '/articles',
  '/guides',
  '/research-notes',
  '/resources',
  '/consultancy',
  '/ask-a-question',
  '/contact',
  '/privacy-policy',
  '/disclaimer'
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];

  for (const path of staticPaths) {
    entries.push({ url: absoluteUrl(path), lastModified: new Date() });
    entries.push({ url: absoluteUrl(`/tr${path === '/' ? '' : path}`), lastModified: new Date() });
  }

  for (const a of getAllArticles().filter((a) => a.status === 'published')) {
    entries.push({ url: absoluteUrl(`/articles/${a.slug}`), lastModified: new Date(a.date) });
  }
  for (const g of getAllGuides().filter((g) => g.status === 'published')) {
    entries.push({ url: absoluteUrl(`/guides/${g.slug}`) });
  }
  for (const n of getAllResearchNotes()) {
    entries.push({ url: absoluteUrl(`/research-notes/${n.slug}`), lastModified: new Date(n.date) });
  }
  for (const r of getAllResources()) {
    entries.push({ url: absoluteUrl(`/resources/${r.slug}`) });
  }

  return entries;
}
