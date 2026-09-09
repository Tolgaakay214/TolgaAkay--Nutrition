import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { ConsultancyForm } from '@/components/forms/ConsultancyForm';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.consultancy' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    pathname: '/consultancy',
    locale
  });
}

export default async function ConsultancyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('consultancy');

  const areas = t.raw('areas') as string[];
  const steps = [
    { title: t('stepTitle0'), text: t('stepText0') },
    { title: t('stepTitle1'), text: t('stepText1') },
    { title: t('stepTitle2'), text: t('stepText2') }
  ];

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 max-w-[20ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">{t('body')}</p>

      <div className="mt-14">
        <p className="eyebrow">{t('areasEyebrow')}</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {areas.map((a) => (
            <span key={a} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="border-t-2 border-bronze pt-5">
            <span className="font-mono text-xs text-bronze">0{i + 1}</span>
            <h3 className="mt-2 font-serif text-lg text-ink">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 max-w-[62ch] text-ink-soft">{t('closing')}</p>

      <div className="mt-10 max-w-2xl border border-line p-6 sm:p-10">
        <ConsultancyForm />
      </div>
    </div>
  );
}
