import createMiddleware from 'next-intl/middleware';
import { locales, defaultLocale } from './i18n';

export default createMiddleware({
  locales,
  defaultLocale,
  // English stays unprefixed ("/", "/articles/..."); Turkish is explicit
  // ("/tr", "/tr/articles/..."). This matches "English primary, Turkish
  // available" from the brief without forcing an "/en" prefix on every URL.
  localePrefix: 'as-needed'
});

export const config = {
  // Run on every route except API routes, Next internals, and files with an extension.
  matcher: ['/((?!api|_next|_vercel|.*\\..*).*)']
};
