import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { MDXRemote } from 'next-mdx-remote/rsc';
import { getAllArticles, getArticleBySlug } from '@/lib/content';
import { buildMetadata, articleJsonLd, breadcrumbJsonLd, absoluteUrl } from '@/lib/seo';
import { JsonLd } from '@/components/JsonLd';
import { References, mdxComponents } from '@/components/mdx/MdxComponents';
import { Link } from '@/navigation';

export function generateStaticParams() {
  return getAllArticles().map((a) => ({ slug: a.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const article = getArticleBySlug(slug);
  if (!article) return {};
  return buildMetadata({
    title: article.meta.title,
    description: article.meta.excerpt,
    pathname: `/articles/${slug}`,
    locale,
    ogImage: absoluteUrl(`/articles/${slug}/opengraph-image`)
  });
}

export default function ArticlePage({ params: { slug } }: { params: { slug: string } }) {
  const article = getArticleBySlug(slug);
  if (!article) notFound();
  const { meta, content } = article;

  return (
    <article className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <JsonLd
        data={articleJsonLd({
          title: meta.title,
          description: meta.excerpt,
          slug: `/articles/${slug}`,
          datePublished: meta.date
        })}
      />
      <JsonLd
        data={breadcrumbJsonLd([
          { name: 'Home', item: '/' },
          { name: 'Articles', item: '/articles' },
          { name: meta.title, item: `/articles/${slug}` }
        ])}
      />

      <nav className="mb-8 font-mono text-xs text-ink-soft">
        <Link href="/articles" className="hover:text-bronze">Articles</Link>
        <span className="mx-2">/</span>
        <span>{meta.category}</span>
      </nav>

      <div className="mb-4 flex flex-wrap items-center gap-3 font-mono text-[11px] uppercase tracking-wider text-bronze">
        <span>{meta.category}</span>
        <span className="text-ink-soft">·</span>
        <span className="text-ink-soft">{new Date(meta.date).toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' })}</span>
        <span className="text-ink-soft">·</span>
        <span className="text-ink-soft">{meta.readingTime}</span>
      </div>

      <h1 className="max-w-[22ch] font-serif text-[clamp(30px,4vw,46px)] font-medium leading-tight text-ink text-balance">
        {meta.title}
      </h1>
      <p className="mt-5 max-w-[62ch] text-lg text-ink-soft">{meta.excerpt}</p>

      <div className="prose prose-lg mt-12 max-w-none">
        <MDXRemote source={content} components={mdxComponents} />
        <References items={meta.references} />
      </div>

      <div className="mt-14 flex flex-wrap gap-3 border-t border-line pt-8">
        <a
          href={`https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(absoluteUrl(`/articles/${slug}`))}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-sm border border-line px-4 py-2 text-sm text-ink-soft hover:border-bronze hover:text-bronze"
        >
          Share on LinkedIn
        </a>
        <a
          href={`https://twitter.com/intent/tweet?url=${encodeURIComponent(absoluteUrl(`/articles/${slug}`))}&text=${encodeURIComponent(meta.title)}`}
          target="_blank"
          rel="noopener noreferrer"
          className="focus-ring rounded-sm border border-line px-4 py-2 text-sm text-ink-soft hover:border-bronze hover:text-bronze"
        >
          Share on X
        </a>
      </div>
    </article>
  );
}
