import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { SectionHead } from '@/components/SectionHead';
import { getAllGuides } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';
import type { Locale } from '@/i18n';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.guides' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    pathname: '/guides',
    locale
  });
}

export default async function GuidesIndex({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('guides');

  const guides = getAllGuides(locale as Locale);
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <SectionHead eyebrow={t('eyebrow')} title={t('title')} />
      <div className="grid grid-cols-1 gap-7 sm:grid-cols-2 lg:grid-cols-3">
        {guides.map((g) => (
          <Link
            key={g.slug}
            href={`/guides/${g.slug}`}
            className="group flex flex-col justify-between border border-line p-6 transition-colors hover:border-bronze"
          >
            <div>
              <span className="font-mono text-[10.5px] uppercase tracking-wider text-bronze">
                {g.pages > 0 ? t('pagesCount', { count: g.pages }) : t('comingSoon')}
              </span>
              <h3 className="mt-3 font-serif text-xl leading-snug text-ink">{g.title}</h3>
              <p className="mt-2.5 text-sm text-ink-soft">{g.summary}</p>
            </div>
            <div className="mt-6 flex flex-wrap gap-2">
              {g.tags.map((tag) => (
                <span key={tag} className="rounded-full border border-line px-3 py-1 font-mono text-[11px] text-ink-soft">
                  {tag}
                </span>
              ))}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
}
