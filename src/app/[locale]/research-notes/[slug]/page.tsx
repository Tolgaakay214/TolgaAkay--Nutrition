import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/navigation';
import { getAllResearchNotes, getResearchNoteBySlug } from '@/lib/content';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { mdxComponents } from '@/components/mdx/MdxComponents';
import { setRequestLocale } from 'next-intl/server';

export function generateStaticParams() {
  return getAllResearchNotes().map((n) => ({ slug: n.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const note = getResearchNoteBySlug(slug);
  if (!note) return {};
  return buildMetadata({
    title: note.meta.title,
    description: note.meta.title,
    pathname: `/research-notes/${slug}`,
    locale
  });
}

export default function ResearchNotePage({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}) {
  setRequestLocale(locale);
  const note = getResearchNoteBySlug(slug);
  if (!note) notFound();

  return (
    <article className="mx-auto max-w-[68ch] px-5 py-16 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: '/' },
          { name: 'Research Notes', item: '/research-notes' },
          { name: note.meta.title, item: `/research-notes/${slug}` }
        ])}
      />
      <Link href="/research-notes" className="font-mono text-xs text-ink-soft hover:text-bronze">
        ← Research Notes
      </Link>
      <p className="mt-6 font-mono text-[11px] uppercase tracking-wider text-bronze">{note.meta.readingTime}</p>
      <h1 className="mt-3 font-serif text-[clamp(26px,3.5vw,38px)] font-medium leading-tight text-ink text-balance">
        {note.meta.title}
      </h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <MDXRemote source={note.content} components={mdxComponents} />
      </div>
    </article>
  );
}
