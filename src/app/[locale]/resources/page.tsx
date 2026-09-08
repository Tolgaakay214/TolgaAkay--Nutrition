import type { Metadata } from 'next';
import { Link } from '@/navigation';
import { SectionHead } from '@/components/SectionHead';
import { getAllResources } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Resources',
    description: 'Free calculators, checklists, and worksheets for ruminant nutrition.',
    pathname: '/resources',
    locale
  });
}

export default function ResourcesIndex() {
  const resources = getAllResources();
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <SectionHead eyebrow="Free Tools" title="Resources" />
      <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {resources.map((r) => (
          <Link
            key={r.slug}
            href={`/resources/${r.slug}`}
            className="flex flex-col justify-between border border-line p-6 transition-colors hover:border-bronze"
          >
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-bronze">{r.format}</span>
              <h3 className="mt-3 font-serif text-lg leading-snug text-ink">{r.title}</h3>
              <p className="mt-2.5 text-sm text-ink-soft">{r.description}</p>
            </div>
            <span className="mt-6 text-sm font-semibold text-ink-soft">Open →</span>
          </Link>
        ))}
      </div>
    </div>
  );
}
