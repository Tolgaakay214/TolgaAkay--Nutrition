import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { Link } from '@/navigation';
import { getAllResources, getResourceBySlug } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { DCADCalculator } from '@/components/calculators/DCADCalculator';

export function generateStaticParams() {
  return getAllResources().map((r) => ({ slug: r.slug }));
}

export async function generateMetadata({
  params: { locale, slug }
}: {
  params: { locale: string; slug: string };
}): Promise<Metadata> {
  const resource = getResourceBySlug(slug);
  if (!resource) return {};
  return buildMetadata({
    title: resource.title,
    description: resource.description,
    pathname: `/resources/${slug}`,
    locale
  });
}

export default function ResourcePage({ params: { slug } }: { params: { slug: string } }) {
  const resource = getResourceBySlug(slug);
  if (!resource) notFound();

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <Link href="/resources" className="font-mono text-xs text-ink-soft hover:text-bronze">
        ← Resources
      </Link>
      <span className="mt-6 block font-mono text-[11px] uppercase tracking-wider text-bronze">{resource.format}</span>
      <h1 className="mt-3 max-w-[26ch] font-serif text-[clamp(28px,4vw,42px)] font-medium leading-tight text-ink text-balance">
        {resource.title}
      </h1>
      <p className="mt-5 max-w-[62ch] text-lg text-ink-soft">{resource.description}</p>

      <div className="mt-12 max-w-2xl">
        {resource.slug === 'dcad-calculator' ? (
          <DCADCalculator />
        ) : (
          <div className="border border-line bg-ivory-2 p-8 text-center">
            <p className="text-ink-soft">
              {resource.format === 'PDF'
                ? 'This resource is being finalized as a downloadable PDF. In the meantime, request it directly.'
                : 'This interactive worksheet is in development. In the meantime, request the current version directly.'}
            </p>
            <Link
              href="/ask-a-question"
              className="focus-ring mt-5 inline-flex rounded-sm bg-espresso px-5 py-3 text-sm font-semibold text-ivory hover:bg-bronze-deep"
            >
              Request This Resource
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}
