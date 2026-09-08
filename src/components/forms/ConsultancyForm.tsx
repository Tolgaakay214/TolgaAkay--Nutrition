'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const AREAS = [
  'Ration Evaluation',
  'Transition Cow Feeding Programs',
  'DCAD Evaluation',
  'Feed Additive Evaluation',
  'TMR & Particle Size Assessment',
  'Feed and Forage Interpretation',
  'Technical Product Evaluation',
  'Scientific Literature Reviews',
  'Ruminant Nutrition Training',
  'Farm Nutrition Audits'
];

const fieldClass =
  'focus-ring w-full border border-line bg-ivory px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft';
const labelClass = 'mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink-soft';

export function ConsultancyForm() {
  const t = useTranslations('forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const renderedAt = useRef(Date.now().toString());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);
    const areasOfInterest = fd.getAll('areasOfInterest').map(String);

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      company: String(fd.get('company') ?? ''),
      country: String(fd.get('country') ?? ''),
      role: String(fd.get('role') ?? ''),
      areasOfInterest,
      description: String(fd.get('description') ?? ''),
      preferredContact: String(fd.get('preferredContact') ?? ''),
      honeypot: String(fd.get('company_website') ?? ''),
      formRenderedAt: renderedAt.current
    };

    setStatus('loading');
    try {
      const res = await fetch('/api/consultancy', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return (
      <div className="border border-line bg-ivory-2 p-8 text-center">
        <p className="font-serif text-xl text-ink">{t('successConsultancy')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cw2">Company website</label>
        <input id="cw2" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="c-name">{t('name')}</label>
          <input id="c-name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-email">{t('email')}</label>
          <input id="c-email" name="email" type="email" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="company">Company / Farm</label>
          <input id="company" name="company" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="c-country">{t('country')}</label>
          <input id="c-country" name="country" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="role">Role</label>
          <input id="role" name="role" className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="preferredContact">Preferred Contact Method</label>
          <input id="preferredContact" name="preferredContact" placeholder="Email, phone, video call…" className={fieldClass} />
        </div>
      </div>

      <fieldset>
        <legend className={labelClass}>Area of Interest</legend>
        <div className="flex flex-wrap gap-2.5">
          {AREAS.map((area) => (
            <label
              key={area}
              className="cursor-pointer rounded-full border border-line px-4 py-2 font-mono text-xs text-ink-soft has-[:checked]:border-bronze has-[:checked]:text-bronze"
            >
              <input type="checkbox" name="areasOfInterest" value={area} className="sr-only" />
              {area}
            </label>
          ))}
        </div>
      </fieldset>

      <div>
        <label className={labelClass} htmlFor="description">Tell me about your operation or question</label>
        <textarea id="description" name="description" required rows={6} maxLength={3000} className={fieldClass} />
      </div>

      <button
        type="submit"
        disabled={status === 'loading'}
        className="focus-ring w-full rounded-sm bg-espresso px-6 py-3.5 text-sm font-semibold text-ivory transition-colors hover:bg-bronze-deep disabled:opacity-60 sm:w-auto"
      >
        {status === 'loading' ? t('submitting') : t('submit')}
      </button>
      {status === 'error' && <p className="text-sm text-[#c0503f]">{t('error')}</p>}
    </form>
  );
}
