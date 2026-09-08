import { getRequestConfig } from 'next-intl/server';
import { notFound } from 'next/navigation';

// English is the primary/default locale (served at "/"). Turkish is wired
// up as a second locale (served at "/tr/...") per the site brief: the UI
// chrome (nav, buttons, forms, footer) is fully translatable from day one;
// translating individual articles/guides into Turkish is then a content
// task, not an engineering one — just add the Turkish MDX file alongside
// the English one and point the [locale] content loader at it.
export const locales = ['en', 'tr'] as const;
export type Locale = (typeof locales)[number];
export const defaultLocale: Locale = 'en';

export default getRequestConfig(async ({ locale }) => {
  if (!locales.includes(locale as Locale)) notFound();

  return {
    messages: (await import(`./messages/${locale}.json`)).default
  };
});
