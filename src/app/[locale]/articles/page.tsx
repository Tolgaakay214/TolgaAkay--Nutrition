import type { Metadata } from 'next';
import { Link } from '@/navigation';
import { ArticleCard } from '@/components/ArticleCard';
import { SectionHead } from '@/components/SectionHead';
import { getAllArticles, type ArticleCategory } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import { setRequestLocale } from 'next-intl/server';

const CATEGORIES: ArticleCategory[] = [
  'Transition Cow Nutrition',
  'Dairy Nutrition',
  'Rumen Function',
  'Feed Additives',
  'Minerals & DCAD',
  'Forage & TMR Management',
  'Metabolic Disorders',
  'Research Reviews',
  'Farm Management',
  'Technical Notes'
];

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Articles',
    description: 'Peer-reviewed thinking on ruminant nutrition, written for the farm.',
    pathname: '/articles',
    locale
  });
}

export default function ArticlesIndex({
  params: { locale },
  searchParams
}: {
  params: { locale: string };
  searchParams: { category?: string };
}) {
  setRequestLocale(locale);
  const all = getAllArticles();
  const active = searchParams.category;
  const filtered = active ? all.filter((a) => a.category === active) : all;

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <SectionHead eyebrow="Knowledge Hub" title="Articles" />

      <div className="mb-10 flex flex-wrap gap-2">
        <Link
          href="/articles"
          className={`rounded-full border px-4 py-2 font-mono text-xs ${
            !active ? 'border-bronze bg-bronze text-ivory' : 'border-line text-ink-soft'
          }`}
        >
          All
        </Link>
        {CATEGORIES.map((c) => (
          <Link
            key={c}
            href={`/articles?category=${encodeURIComponent(c)}`}
            className={`rounded-full border px-4 py-2 font-mono text-xs ${
              active === c ? 'border-bronze bg-bronze text-ivory' : 'border-line text-ink-soft'
            }`}
          >
            {c}
          </Link>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
        {filtered.map((a) => (
          <div key={a.slug} className="relative">
            <ArticleCard article={a} />
            {a.status === 'upcoming' && (
              <span className="absolute right-3 top-3 rounded-full bg-espresso px-2.5 py-1 font-mono text-[10px] uppercase tracking-wider text-ivory">
                Coming Soon
              </span>
            )}
          </div>
        ))}
      </div>
      {filtered.length === 0 && <p className="text-ink-soft">No articles in this category yet.</p>}
    </div>
  );
}
