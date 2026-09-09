import type { Metadata } from 'next';
import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, personJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.about' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    pathname: '/about',
    locale
  });
}

export default async function AboutPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('about');

  const timeline = [
    { period: t('timelinePeriod0'), text: t('timelineText0') },
    { period: t('timelinePeriod1'), text: t('timelineText1') },
    { period: t('timelinePeriod2'), text: t('timelineText2') }
  ];
  const interests = t.raw('interests') as string[];

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <JsonLd data={personJsonLd()} />
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 max-w-[20ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        {t('title')}
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
        <div className="relative aspect-[4/5] overflow-hidden border border-line">
          <Image
            src="/images/tolga-akay-portrait.jpg"
            alt={t('altPortrait')}
            fill
            sizes="280px"
            className="object-cover"
            priority
          />
        </div>
        <div className="max-w-[68ch] space-y-5 text-[17px] leading-relaxed text-ink-soft">
          <p>{t('bodyP1')}</p>
          <p>{t('bodyP2')}</p>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <p className="eyebrow">{t('timelineEyebrow')}</p>
        <div className="mt-6 space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="grid grid-cols-[120px_1fr] gap-6 border-b border-line pb-6">
              <span className="font-mono text-sm text-bronze">{item.period}</span>
              <span className="text-ink">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <p className="eyebrow">{t('interestsEyebrow')}</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {interests.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
