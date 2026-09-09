import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import { Linkedin, Mail } from 'lucide-react';
import { Logo } from './Logo';

export function Footer() {
  const t = useTranslations('footer');
  const year = new Date().getFullYear();

  return (
    <footer className="mx-auto max-w-content px-5 pb-10 pt-16 sm:px-8">
      <div className="grid grid-cols-2 gap-8 sm:grid-cols-4 sm:gap-10">
        <div className="col-span-2 sm:col-span-1">
          <Link href="/" className="focus-ring inline-block rounded-sm">
            <Logo compact />
          </Link>
          <p className="mt-3 max-w-[32ch] text-[13.5px] text-ink-soft">{t('tagline')}</p>
          <div className="mt-4 flex gap-3">
            <a
              href="https://www.linkedin.com/in/tolgaakay-nutrition"
              aria-label="LinkedIn"
              className="text-ink-soft hover:text-bronze"
            >
              <Linkedin size={18} strokeWidth={1.6} />
            </a>
            <a
              href="mailto:tolgaakay616@gmail.com"
              aria-label="Email"
              className="text-ink-soft hover:text-bronze"
            >
              <Mail size={18} strokeWidth={1.6} />
            </a>
          </div>
        </div>
        <div>
          <h5 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            {t('explore')}
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/about" className="hover:text-bronze">{t('aboutLink')}</Link></li>
            <li><Link href="/articles" className="hover:text-bronze">{t('articlesLink')}</Link></li>
            <li><Link href="/guides" className="hover:text-bronze">{t('guidesLink')}</Link></li>
            <li><Link href="/resources" className="hover:text-bronze">{t('resourcesLink')}</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            {t('connect')}
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/ask-a-question" className="hover:text-bronze">{t('askLink')}</Link></li>
            <li><Link href="/consultancy" className="hover:text-bronze">{t('collaborateLink')}</Link></li>
            <li><Link href="/contact" className="hover:text-bronze">{t('contact')}</Link></li>
          </ul>
        </div>
        <div>
          <h5 className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-soft">
            {t('legal')}
          </h5>
          <ul className="space-y-2.5 text-sm">
            <li><Link href="/privacy-policy" className="hover:text-bronze">{t('privacy')}</Link></li>
            <li><Link href="/disclaimer" className="hover:text-bronze">{t('disclaimer')}</Link></li>
          </ul>
        </div>
      </div>
      <div className="mt-14 flex flex-wrap items-center justify-between gap-3 border-t border-line pt-6 text-xs text-ink-soft">
        <span>© {year} Tolga Akay. {t('rights')}</span>
        <span>
          {t('disclaimerLine')}{' '}
          <Link href="/disclaimer" className="underline hover:text-bronze">
            {t('readDisclaimer')}
          </Link>
        </span>
      </div>
    </footer>
  );
}
