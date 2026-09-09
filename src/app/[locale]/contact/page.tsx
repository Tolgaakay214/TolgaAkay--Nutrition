import type { Metadata } from 'next';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { Linkedin, Mail } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';
import { ContactForm } from '@/components/forms/ContactForm';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.contact' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    pathname: '/contact',
    locale
  });
}

export default async function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);
  const t = await getTranslations('contact');

  const routes = [
    { title: t('routeAskTitle'), text: t('routeAskText'), href: '/ask-a-question' },
    { title: t('routeCollabTitle'), text: t('routeCollabText'), href: '/consultancy' }
  ];

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink">{t('title')}</h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">{t('body')}</p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {routes.map((r) => (
          <Link key={r.href} href={r.href} className="border border-line p-7 transition-colors hover:border-bronze">
            <h3 className="font-serif text-xl text-ink">{r.title}</h3>
            <p className="mt-2.5 text-sm text-ink-soft">{r.text}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-ink-soft">{t('goLink')}</span>
          </Link>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-8 border-t border-line pt-10">
        <a href="mailto:tolgaakay616@gmail.com" className="flex items-center gap-2.5 text-ink hover:text-bronze">
          <Mail size={18} strokeWidth={1.6} /> tolgaakay616@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/tolgaakay-nutrition"
          className="flex items-center gap-2.5 text-ink hover:text-bronze"
        >
          <Linkedin size={18} strokeWidth={1.6} /> linkedin.com/in/tolgaakay-nutrition
        </a>
      </div>

      <div className="mt-14 border-t border-line pt-10">
        <h2 className="font-serif text-2xl text-ink">{t('directHeading')}</h2>
        <p className="mt-2.5 max-w-[62ch] text-sm text-ink-soft">{t('directBody')}</p>
        <div className="mt-8 max-w-2xl">
          <ContactForm />
        </div>
      </div>
    </div>
  );
}
