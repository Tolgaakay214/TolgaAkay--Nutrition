'use client';

import { useMemo, useState } from 'react';
import { useTranslations } from 'next-intl';

// Standard DCAD formula (meq/kg DM), using mineral content as %DM:
//   meq/100g = (Na/0.023 + K/0.039) − (Cl/0.0355 + S/0.016)
//   DCAD (meq/kg DM) = meq/100g × 10
// Reference divisors are the milliequivalent weights of each ion.
const STAGE_KEYS = {
  lactating: { labelKey: 'stageLactating', min: 150, max: 450 },
  closeUp: { labelKey: 'stageCloseUp', min: -150, max: -50 }
} as const;

type Stage = keyof typeof STAGE_KEYS;

function Field({
  label,
  suffix,
  value,
  onChange
}: {
  label: string;
  suffix: string;
  value: string;
  onChange: (v: string) => void;
}) {
  return (
    <label className="block">
      <span className="mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink-soft">
        {label} <span className="text-ink-soft/70">{suffix}</span>
      </span>
      <input
        type="number"
        inputMode="decimal"
        step="0.01"
        min="0"
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="focus-ring w-full border border-line bg-ivory px-4 py-3 font-mono text-[15px] text-ink"
      />
    </label>
  );
}

export function DCADCalculator() {
  const t = useTranslations('dcadCalculator');
  const [na, setNa] = useState('0.35');
  const [k, setK] = useState('1.40');
  const [cl, setCl] = useState('0.35');
  const [s, setS] = useState('0.20');
  const [stage, setStage] = useState<Stage>('lactating');

  const dcad = useMemo(() => {
    const n = parseFloat(na) || 0;
    const kk = parseFloat(k) || 0;
    const c = parseFloat(cl) || 0;
    const ss = parseFloat(s) || 0;
    const meqPer100g = (n / 0.023 + kk / 0.039) - (c / 0.0355 + ss / 0.016);
    return Math.round(meqPer100g * 10);
  }, [na, k, cl, s]);

  const target = STAGE_KEYS[stage];
  const targetLabel = t(target.labelKey);
  const inRange = dcad >= target.min && dcad <= target.max;

  return (
    <div className="border border-line bg-ivory-2 p-6 sm:p-8">
      <div className="mb-6 flex flex-wrap items-center gap-2">
        {(Object.keys(STAGE_KEYS) as Stage[]).map((key) => (
          <button
            key={key}
            type="button"
            onClick={() => setStage(key)}
            className={`focus-ring rounded-full border px-4 py-2 font-mono text-xs transition-colors ${
              stage === key ? 'border-bronze bg-bronze text-ivory' : 'border-line text-ink-soft'
            }`}
          >
            {t(STAGE_KEYS[key].labelKey)}
          </button>
        ))}
      </div>

      <div className="grid grid-cols-1 gap-5 sm:grid-cols-2">
        <Field label={t('fieldSodium')} suffix={t('percentOfDM')} value={na} onChange={setNa} />
        <Field label={t('fieldPotassium')} suffix={t('percentOfDM')} value={k} onChange={setK} />
        <Field label={t('fieldChloride')} suffix={t('percentOfDM')} value={cl} onChange={setCl} />
        <Field label={t('fieldSulfur')} suffix={t('percentOfDM')} value={s} onChange={setS} />
      </div>

      <div className="mt-7 border-t border-line pt-6">
        <div className="flex flex-wrap items-end justify-between gap-4">
          <div>
            <span className="block font-mono text-[11px] uppercase tracking-wider text-ink-soft">
              {t('resultLabel')}
            </span>
            <span className="mt-1 block font-serif text-4xl tabular-nums text-ink">
              {Number.isFinite(dcad) ? dcad : '—'}
              <span className="ml-2 text-base text-ink-soft">{t('unitLabel')}</span>
            </span>
          </div>
          <span
            className={`rounded-full px-4 py-2 font-mono text-xs ${
              inRange ? 'bg-[#5E7A5C]/15 text-[#4a6148]' : 'bg-[#9C4A3C]/12 text-[#8a4234]'
            }`}
          >
            {inRange ? t('withinRange') : t('outsideRange')}
          </span>
        </div>
        <p className="mt-3 text-sm text-ink-soft">
          {t('targetNote', { label: targetLabel.toLowerCase(), min: target.min, max: target.max })}
        </p>
      </div>
    </div>
  );
}
