'use client';

import { useState } from 'react';
import { useTranslations, useLocale } from 'next-intl';
import { Link, usePathname } from '@/navigation';
import { Menu, X } from 'lucide-react';
import { SearchBox } from './SearchBox';
import { Logo } from './Logo';

const links = [
  { href: '/articles', key: 'articles' },
  { href: '/guides', key: 'guides' },
  { href: '/research-notes', key: 'researchNotes' },
  { href: '/resources', key: 'resources' },
  { href: '/about', key: 'about' },
  { href: '/consultancy', key: 'collaborate' }
] as const;

export function Nav() {
  const t = useTranslations('nav');
  const locale = useLocale();
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);

  return (
    <>
      <header className="sticky top-0 z-40 border-b border-line bg-ivory/90 backdrop-blur">
        <div className="mx-auto flex h-[76px] max-w-content items-center justify-between px-5 sm:px-8">
          <Link href="/" className="focus-ring rounded-sm">
            <Logo />
          </Link>

          <nav className="hidden items-center gap-8 text-[14.5px] text-ink-soft lg:flex">
            {links.map((l) => (
              <Link key={l.href} href={l.href} className="transition-colors hover:text-ink">
                {t(l.key)}
              </Link>
            ))}
          </nav>

          <div className="flex items-center gap-4">
            <SearchBox placeholder={t('search')} />
            <div className="hidden overflow-hidden rounded-sm border border-line font-mono text-xs sm:flex">
              <Link
                href={pathname}
                locale="en"
                className={`px-[9px] py-[5px] ${locale === 'en' ? 'bg-ink text-ivory' : 'text-ink-soft'}`}
              >
                EN
              </Link>
              <Link
                href={pathname}
                locale="tr"
                className={`px-[9px] py-[5px] ${locale === 'tr' ? 'bg-ink text-ivory' : 'text-ink-soft'}`}
              >
                TR
              </Link>
            </div>
            <Link
              href="/ask-a-question"
              className="focus-ring hidden rounded-sm bg-espresso px-[18px] py-[10px] text-sm font-semibold text-ivory transition-colors hover:bg-bronze-deep sm:inline-flex"
            >
              {t('askQuestion')}
            </Link>
            <button
              type="button"
              aria-label={t('menu')}
              className="focus-ring flex h-9 w-9 items-center justify-center text-ink lg:hidden"
              onClick={() => setMobileOpen((v) => !v)}
            >
              {mobileOpen ? <X size={22} strokeWidth={1.6} /> : <Menu size={22} strokeWidth={1.6} />}
            </button>
          </div>
        </div>
      </header>

      {mobileOpen && (
        <div className="fixed inset-0 top-[76px] z-40 flex flex-col justify-between bg-ivory p-8 lg:hidden">
          <nav className="flex flex-col gap-6">
            {links.map((l) => (
              <Link
                key={l.href}
                href={l.href}
                onClick={() => setMobileOpen(false)}
                className="font-serif text-3xl"
              >
                {t(l.key)}
              </Link>
            ))}
          </nav>
          <div className="flex flex-col gap-4">
            <div className="flex overflow-hidden rounded-sm border border-line font-mono text-xs w-fit">
              <Link href={pathname} locale="en" className="px-3 py-2">
                EN
              </Link>
              <Link href={pathname} locale="tr" className="px-3 py-2">
                TR
              </Link>
            </div>
            <Link
              href="/ask-a-question"
              onClick={() => setMobileOpen(false)}
              className="rounded-sm bg-espresso px-5 py-3 text-center text-sm font-semibold text-ivory"
            >
              {t('askQuestion')}
            </Link>
          </div>
        </div>
      )}
    </>
  );
}
