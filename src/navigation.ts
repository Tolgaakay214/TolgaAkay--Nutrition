import { createNavigation } from 'next-intl/navigation';
import { locales, defaultLocale } from './i18n';

// Locale-aware Link/router helpers. Use these instead of next/link and
// next/navigation anywhere a URL needs to respect the current locale.
export const { Link, redirect, usePathname, useRouter, getPathname } = createNavigation({
  locales,
  defaultLocale,
  localePrefix: 'as-needed'
});
