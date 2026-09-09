'use client';

import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { GuideMeta } from '@/lib/content';

export function GuideFeature({ guide }: { guide: GuideMeta }) {
  const t = useTranslations('guides');
  return (
    <div className="grid grid-cols-1 items-center gap-8 border border-line p-6 sm:p-10 lg:grid-cols-[280px_1fr] lg:gap-12">
      <div className="flex aspect-[3/4] flex-col justify-between bg-espresso p-6">
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E7C79C] opacity-90">
          {t('label')} · {t('pagesCount', { count: guide.pages })}
        </span>
        <h4 className="font-serif text-[22px] font-medium leading-tight text-ivory">{guide.title}</h4>
        <span className="font-mono text-[10px] uppercase tracking-wider text-[#E7C79C] opacity-90">
          {t('readInBrowser')}
        </span>
      </div>
      <div>
        <h3 className="font-serif text-2xl text-ink">{guide.summary}</h3>
        <div className="mt-4 flex flex-wrap gap-2.5">
          {guide.tags.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-3.5 py-1.5 font-mono text-xs text-ink-soft">
              {tag}
            </span>
          ))}
        </div>
        <div className="mt-6 flex flex-wrap gap-3">
          <Link
            href={`/guides/${guide.slug}`}
            className="focus-ring rounded-sm bg-espresso px-[18px] py-[10px] text-sm font-semibold text-ivory hover:bg-bronze-deep"
          >
            {t('readGuideBtn')}
          </Link>
          <Link
            href={`/guides/${guide.slug}#pdf`}
            className="focus-ring rounded-sm border border-ink px-[18px] py-[10px] text-sm font-semibold text-ink hover:border-bronze hover:text-bronze"
          >
            {t('viewPdfBtn')}
          </Link>
        </div>
      </div>
    </div>
  );
}
