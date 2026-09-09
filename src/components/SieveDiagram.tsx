'use client';

import { useTranslations } from 'next-intl';

const trayIds = ['topScreen', 'middleScreen', 'bottomPan', 'fineParticles'] as const;
const trayData = [
  { value: '6.8%', dots: [[9, 10], [17, 6], [25, 13], [13, 14]] },
  { value: '41.2%', dots: [[7, 8], [12, 13], [18, 7], [23, 12], [28, 9]] },
  { value: '39.4%', dots: [[6, 10], [10, 6], [14, 13], [19, 8], [23, 14], [27, 9], [30, 12]] },
  { value: '12.6%', dots: [] as number[][] }
];

// A schematic Penn State Particle Separator screen readout — the site's
// signature hero visual, standing in for stock cow photography.
export function SieveDiagram() {
  const t = useTranslations('sieve');
  return (
    <div
      className="border border-line bg-ivory-2 p-6 sm:p-7"
      role="img"
      aria-label={t('ariaLabel')}
    >
      <div className="mb-4 flex justify-between font-mono text-[11px] uppercase tracking-wider text-ink-soft">
        <span>{t('headerLabel')}</span>
        <span>Sample #114</span>
      </div>
      {trayIds.map((id, i) => (
        <div key={id} className={`flex items-center gap-3.5 py-2.5 ${i > 0 ? 'border-t border-line' : ''}`}>
          <svg width="34" height="20" viewBox="0 0 34 20" fill="none" aria-hidden="true">
            <rect x="1" y="1" width="32" height="18" rx="1" stroke="var(--ink-soft)" strokeWidth="1.2" />
            {trayData[i].dots.map(([cx, cy], idx) => (
              <circle key={idx} cx={cx} cy={cy} r="1.4" fill="var(--bronze)" />
            ))}
          </svg>
          <span className="text-[13.5px] text-ink">{t(id)}</span>
          <span className="ml-auto font-mono text-xs text-ink-soft">{trayData[i].value}</span>
        </div>
      ))}
    </div>
  );
}
