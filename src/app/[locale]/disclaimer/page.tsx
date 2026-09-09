import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Disclaimer',
    description: 'Educational purpose disclaimer for content published on this site.',
    pathname: '/disclaimer',
    locale
  });
}

export default async function DisclaimerPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('disclaimer');

  return (
    <div className="mx-auto max-w-[68ch] px-5 py-16 sm:px-8">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">{t('title')}</h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <p>{t('p1')}</p>
        <p>{t('p2')}</p>
        <p>{t('p3')}</p>
      </div>
    </div>
  );
}
