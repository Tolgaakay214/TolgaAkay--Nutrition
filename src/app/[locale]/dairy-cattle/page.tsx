import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { ArticleCard } from '@/components/ArticleCard';
import { SectionHead } from '@/components/SectionHead';
import { getAllArticles } from '@/lib/content';
import type { Locale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.dairyCattle' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    pathname: '/dairy-cattle',
    locale
  });
}

export default async function DairyCattlePage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('dairyCattle');
  const areas = t.raw('areas') as string[];
  const articles = getAllArticles(locale as Locale).filter((a) => a.status === 'published');

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 max-w-[22ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">{t('body')}</p>

      <div className="mt-12">
        <p className="eyebrow">{t('areasEyebrow')}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {areas.map((a) => (
            <span key={a} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16">
        <SectionHead eyebrow={t('articlesEyebrow')} title={t('articlesTitle')} />
        {articles.length > 0 ? (
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        ) : (
          <p className="text-ink-soft">{t('articlesEmpty')}</p>
        )}
      </div>

      <div className="mt-16 flex flex-wrap items-center justify-between gap-6 border border-line p-8 sm:p-10">
        <p className="max-w-[46ch] font-serif text-xl text-ink">{t('ctaLine')}</p>
        <Link
          href="/consultancy"
          className="focus-ring shrink-0 rounded-sm bg-bronze px-8 py-4 text-base font-semibold text-ivory shadow-sm transition-colors hover:bg-bronze-deep"
        >
          {t('ctaButton')} →
        </Link>
      </div>
    </div>
  );
}
