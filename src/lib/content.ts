import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';
import type { Locale } from '@/i18n';

const CONTENT_ROOT = path.join(process.cwd(), 'src', 'content');

export type ArticleCategory =
  | 'Transition Cow Nutrition'
  | 'Dairy Nutrition'
  | 'Rumen Function'
  | 'Feed Additives'
  | 'Minerals & DCAD'
  | 'Forage & TMR Management'
  | 'Metabolic Disorders'
  | 'Research Reviews'
  | 'Farm Management'
  | 'Technical Notes';

export interface ArticleMeta {
  slug: string;
  title: string;
  excerpt: string;
  category: ArticleCategory;
  date: string;
  coverPattern: 'line' | 'bars' | 'grid' | 'dots';
  featured?: boolean;
  status: 'published' | 'upcoming';
  readingTime: string;
}

export interface ResearchNoteMeta {
  slug: string;
  title: string;
  date: string;
  readingTime: string;
}

export interface GuideMeta {
  slug: string;
  title: string;
  summary: string;
  pages: number;
  tags: string[];
  status: 'published' | 'upcoming';
  featured?: boolean;
}

export interface ResourceItem {
  slug: string;
  title: string;
  format: 'Interactive' | 'PDF' | 'Worksheet';
  description: string;
  interactive?: boolean;
}

// The "reading-time" package always renders its .text in English. Rebuild
// the label per-locale from the numeric minute count instead.
function formatReadingTime(minutes: number, locale: Locale): string {
  const rounded = Math.max(1, Math.ceil(minutes));
  return locale === 'tr' ? `${rounded} dakika okuma` : `${rounded} min read`;
}

// Content directories: English lives at src/content/<collection>, Turkish
// translations live alongside at src/content/tr/<collection>. A collection
// with no Turkish file yet — or a locale that isn't 'tr' — falls back to
// the English source so nothing 404s while translations are in progress.
function collectionDir(collection: string, locale: Locale): string {
  return locale === 'tr' ? path.join(CONTENT_ROOT, 'tr', collection) : path.join(CONTENT_ROOT, collection);
}

function readRaw(collection: string, slug: string, locale: Locale): string | null {
  const localized = path.join(collectionDir(collection, locale), `${slug}.mdx`);
  if (fs.existsSync(localized)) return fs.readFileSync(localized, 'utf8');
  if (locale !== 'en') {
    const fallback = path.join(CONTENT_ROOT, collection, `${slug}.mdx`);
    if (fs.existsSync(fallback)) return fs.readFileSync(fallback, 'utf8');
  }
  return null;
}

function readCollection<T extends { slug: string }>(
  collection: string,
  locale: Locale,
  mapFrontmatter: (data: Record<string, any>, slug: string, content: string) => T
): T[] {
  // Enumerate slugs from the English directory (the canonical source of
  // truth for which articles/guides/notes exist), then resolve each one
  // through readRaw so a missing Turkish translation falls back to English.
  const englishDir = path.join(CONTENT_ROOT, collection);
  if (!fs.existsSync(englishDir)) return [];
  const slugs = fs
    .readdirSync(englishDir)
    .filter((f) => f.endsWith('.mdx'))
    .map((f) => f.replace(/\.mdx$/, ''));

  return slugs
    .map((slug) => {
      const raw = readRaw(collection, slug, locale);
      if (!raw) return null;
      const { data, content } = matter(raw);
      return mapFrontmatter(data, slug, content);
    })
    .filter((v): v is T => v !== null);
}

export function getAllArticles(locale: Locale = 'en'): ArticleMeta[] {
  return readCollection('articles', locale, (data, slug, content) => ({
    slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: data.date,
    coverPattern: data.coverPattern ?? 'grid',
    featured: !!data.featured,
    status: data.status ?? 'published',
    readingTime: formatReadingTime(readingTime(content).minutes, locale)
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string, locale: Locale = 'en') {
  const raw = readRaw('articles', slug, locale);
  if (!raw) return null;
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      date: data.date,
      status: data.status ?? 'published',
      readingTime: formatReadingTime(readingTime(content).minutes, locale),
      references: (data.references as string[]) ?? []
    },
    content
  };
}

export function getAllResearchNotes(locale: Locale = 'en'): ResearchNoteMeta[] {
  return readCollection('research-notes', locale, (data, slug, content) => ({
    slug,
    title: data.title,
    date: data.date,
    readingTime: formatReadingTime(readingTime(content).minutes, locale)
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getResearchNoteBySlug(slug: string, locale: Locale = 'en') {
  const raw = readRaw('research-notes', slug, locale);
  if (!raw) return null;
  const { data, content } = matter(raw);
  return {
    meta: { slug, title: data.title, date: data.date, readingTime: formatReadingTime(readingTime(content).minutes, locale) },
    content
  };
}

export function getAllGuides(locale: Locale = 'en'): GuideMeta[] {
  return readCollection('guides', locale, (data, slug) => ({
    slug,
    title: data.title,
    summary: data.summary,
    pages: data.pages ?? 0,
    tags: data.tags ?? [],
    status: data.status ?? 'published',
    featured: !!data.featured
  }));
}

export function getGuideBySlug(slug: string, locale: Locale = 'en') {
  const raw = readRaw('guides', slug, locale);
  if (!raw) return null;
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      summary: data.summary,
      pages: data.pages ?? 0,
      tags: data.tags ?? [],
      references: (data.references as string[]) ?? []
    },
    content
  };
}

// Resources are simple structured data rather than long-form MDX, so they
// live as a single JSON file per locale. The DCAD Calculator is the one
// wired up as a real interactive tool (see
// /src/components/calculators/DCADCalculator.tsx); the rest are described
// here and ship as downloadable PDFs you add to /public.
export function getAllResources(locale: Locale = 'en'): ResourceItem[] {
  const localized = path.join(CONTENT_ROOT, 'resources.tr.json');
  const full = locale === 'tr' && fs.existsSync(localized) ? localized : path.join(CONTENT_ROOT, 'resources.json');
  if (!fs.existsSync(full)) return [];
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

export function getResourceBySlug(slug: string, locale: Locale = 'en') {
  return getAllResources(locale).find((r) => r.slug === slug) ?? null;
}

// Flattened index used by the client-side search (Fuse.js) — built at
// request time from all content collections.
export function getSearchIndex(locale: Locale = 'en') {
  const articles = getAllArticles(locale)
    .filter((a) => a.status === 'published')
    .map((a) => ({ type: 'Article', slug: `articles/${a.slug}`, title: a.title, excerpt: a.excerpt }));
  const notes = getAllResearchNotes(locale).map((n) => ({
    type: 'Research Note',
    slug: `research-notes/${n.slug}`,
    title: n.title,
    excerpt: ''
  }));
  const guides = getAllGuides(locale)
    .filter((g) => g.status === 'published')
    .map((g) => ({ type: 'Guide', slug: `guides/${g.slug}`, title: g.title, excerpt: g.summary }));
  const resources = getAllResources(locale).map((r) => ({
    type: 'Resource',
    slug: `resources/${r.slug}`,
    title: r.title,
    excerpt: r.description
  }));
  return [...articles, ...notes, ...guides, ...resources];
}
