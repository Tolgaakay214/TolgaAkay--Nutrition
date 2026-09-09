import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Privacy Policy',
    description: 'What data this site collects, why, and how it is handled.',
    pathname: '/privacy-policy',
    locale
  });
}

export default async function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('privacyPolicy');

  return (
    <div className="mx-auto max-w-[68ch] px-5 py-16 sm:px-8">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">{t('title')}</h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <p>{t('intro')}</p>
        <h2>{t('collectHeading')}</h2>
        <ul>
          <li>{t('collectItem0')}</li>
          <li>{t('collectItem1')}</li>
          <li>{t('collectItem2')}</li>
          <li>{t('collectItem3')}</li>
        </ul>
        <h2>{t('whyHeading')}</h2>
        <p>{t('whyBody')}</p>
        <h2>{t('howLongHeading')}</h2>
        <p>{t('howLongBody')}</p>
        <h2>{t('newsletterHeading')}</h2>
        <p>{t('newsletterBody')}</p>
        <h2>{t('fileUploadsHeading')}</h2>
        <p>{t('fileUploadsBody')}</p>
        <h2>{t('rightsHeading')}</h2>
        <p>{t('rightsBody')}</p>
        <h2>{t('contactHeading')}</h2>
        <p>{t('contactBody')}</p>
      </div>
    </div>
  );
}
