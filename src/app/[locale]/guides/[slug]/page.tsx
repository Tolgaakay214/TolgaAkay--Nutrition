import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { Link } from '@/navigation';
import { getAllGuides, getGuideBySlug } from '@/lib/content';
import { buildMetadata, breadcrumbJsonLd } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { References, mdxComponents } from '@/components/mdx/MdxComponents';

export function generateStaticParams() {
  return getAllGuides().map((g) => ({ slug: g.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const guide = getGuideBySlug(slug);
  if (!guide) return {};
  return buildMetadata({
    title: guide.meta.title,
    description: guide.meta.summary,
    pathname: `/guides/${slug}`,
    locale
  });
}

export default function GuidePage({ params: { slug } }: { params: { slug: string } }) {
  const guide = getGuideBySlug(slug);
  if (!guide) notFound();
  const { meta, content } = guide;

  return (
    <article className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: '/' },
          { name: 'Guides', item: '/guides' },
          { name: meta.title, item: `/guides/${slug}` }
        ])}
      />
      <Link href="/guides" className="font-mono text-xs text-ink-soft hover:text-bronze">
        ← Technical Guides
      </Link>
      <div className="mt-6 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-bronze">
        <span>Technical Guide</span>
        {meta.pages > 0 && <><span className="text-ink-soft">·</span><span className="text-ink-soft">{meta.pages} pages</span></>}
      </div>
      <h1 className="mt-3 max-w-[26ch] font-serif text-[clamp(30px,4vw,46px)] font-medium leading-tight text-ink text-balance">
        {meta.title}
      </h1>
      <p className="mt-5 max-w-[62ch] text-lg text-ink-soft">{meta.summary}</p>

      <div id="pdf" className="prose prose-lg mt-12 max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
        <References items={meta.references} />
      </div>
    </article>
  );
}
