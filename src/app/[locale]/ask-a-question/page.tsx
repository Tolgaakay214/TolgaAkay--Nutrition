import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { AskAQuestionForm } from '@/components/forms/AskAQuestionForm';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Ask a Question',
    description: 'Have a ruminant nutrition question? Ask directly — general questions may be answered publicly, anonymized.',
    pathname: '/ask-a-question',
    locale
  });
}

export default async function AskAQuestionPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('ask');

  const faqs = [
    { question: t('faqQuestion0'), answer: t('faqAnswer0') },
    { question: t('faqQuestion1'), answer: t('faqAnswer1') },
    { question: t('faqQuestion2'), answer: t('faqAnswer2') }
  ];

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <JsonLd data={faqJsonLd(faqs)} />
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        {t('title')}
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">{t('body')}</p>

      <div className="mt-12 max-w-2xl border border-line p-6 sm:p-10">
        <AskAQuestionForm />
      </div>

      <div className="mt-20 max-w-2xl border-t border-line pt-12">
        <p className="eyebrow">{t('faqEyebrow')}</p>
        <div className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.question} className="border-b border-line pb-6">
              <h3 className="font-serif text-lg text-ink">{f.question}</h3>
              <p className="mt-2 text-sm text-ink-soft">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
