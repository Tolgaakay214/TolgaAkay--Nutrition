import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';
import readingTime from 'reading-time';

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

function readCollection<T extends { slug: string }>(
  dir: string,
  mapFrontmatter: (data: Record<string, any>, slug: string, content: string) => T
): T[] {
  const full = path.join(CONTENT_ROOT, dir);
  if (!fs.existsSync(full)) return [];
  return fs
    .readdirSync(full)
    .filter((f) => f.endsWith('.mdx'))
    .map((filename) => {
      const slug = filename.replace(/\.mdx$/, '');
      const raw = fs.readFileSync(path.join(full, filename), 'utf8');
      const { data, content } = matter(raw);
      return mapFrontmatter(data, slug, content);
    });
}

export function getAllArticles(): ArticleMeta[] {
  return readCollection('articles', (data, slug, content) => ({
    slug,
    title: data.title,
    excerpt: data.excerpt,
    category: data.category,
    date: data.date,
    coverPattern: data.coverPattern ?? 'grid',
    featured: !!data.featured,
    status: data.status ?? 'published',
    readingTime: readingTime(content).text
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getArticleBySlug(slug: string) {
  const full = path.join(CONTENT_ROOT, 'articles', `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: {
      slug,
      title: data.title,
      excerpt: data.excerpt,
      category: data.category,
      date: data.date,
      status: data.status ?? 'published',
      readingTime: readingTime(content).text,
      references: (data.references as string[]) ?? []
    },
    content
  };
}

export function getAllResearchNotes(): ResearchNoteMeta[] {
  return readCollection('research-notes', (data, slug, content) => ({
    slug,
    title: data.title,
    date: data.date,
    readingTime: readingTime(content).text
  })).sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function getResearchNoteBySlug(slug: string) {
  const full = path.join(CONTENT_ROOT, 'research-notes', `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
  const { data, content } = matter(raw);
  return {
    meta: { slug, title: data.title, date: data.date, readingTime: readingTime(content).text },
    content
  };
}

export function getAllGuides(): GuideMeta[] {
  return readCollection('guides', (data, slug) => ({
    slug,
    title: data.title,
    summary: data.summary,
    pages: data.pages ?? 0,
    tags: data.tags ?? [],
    status: data.status ?? 'published',
    featured: !!data.featured
  }));
}

export function getGuideBySlug(slug: string) {
  const full = path.join(CONTENT_ROOT, 'guides', `${slug}.mdx`);
  if (!fs.existsSync(full)) return null;
  const raw = fs.readFileSync(full, 'utf8');
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
// live as a single JSON file. The DCAD Calculator is the one wired up as a
// real interactive tool (see /src/components/calculators/DCADCalculator.tsx);
// the rest are described here and ship as downloadable PDFs you add to /public.
export function getAllResources(): ResourceItem[] {
  const full = path.join(CONTENT_ROOT, 'resources.json');
  if (!fs.existsSync(full)) return [];
  return JSON.parse(fs.readFileSync(full, 'utf8'));
}

export function getResourceBySlug(slug: string) {
  return getAllResources().find((r) => r.slug === slug) ?? null;
}

// Flattened index used by the client-side search (Fuse.js) — built at
// request time from all content collections.
export function getSearchIndex() {
  const articles = getAllArticles()
    .filter((a) => a.status === 'published')
    .map((a) => ({ type: 'Article', slug: `articles/${a.slug}`, title: a.title, excerpt: a.excerpt }));
  const notes = getAllResearchNotes().map((n) => ({
    type: 'Research Note',
    slug: `research-notes/${n.slug}`,
    title: n.title,
    excerpt: ''
  }));
  const guides = getAllGuides()
    .filter((g) => g.status === 'published')
    .map((g) => ({ type: 'Guide', slug: `guides/${g.slug}`, title: g.title, excerpt: g.summary }));
  const resources = getAllResources().map((r) => ({
    type: 'Resource',
    slug: `resources/${r.slug}`,
    title: r.title,
    excerpt: r.description
  }));
  return [...articles, ...notes, ...guides, ...resources];
}
