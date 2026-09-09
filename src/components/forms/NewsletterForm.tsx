'use client';

import { useState, useRef } from 'react';
import { useTranslations } from 'next-intl';

export function NewsletterForm({
  dark = false,
  placeholder,
  fineText,
  successText
}: {
  dark?: boolean;
  placeholder: string;
  fineText: string;
  successText: string;
}) {
  const t = useTranslations('forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const renderedAt = useRef(Date.now().toString());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const email = (form.elements.namedItem('email') as HTMLInputElement).value;
    const honeypot = (form.elements.namedItem('company_website') as HTMLInputElement).value;

    setStatus('loading');
    try {
      const res = await fetch('/api/newsletter', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, honeypot, formRenderedAt: renderedAt.current })
      });
      if (!res.ok) throw new Error('failed');
      setStatus('success');
      form.reset();
    } catch {
      setStatus('error');
    }
  }

  if (status === 'success') {
    return <p className={`text-sm ${dark ? 'text-[#E7C79C]' : 'text-ink'}`}>{successText}</p>;
  }

  return (
    <div>
      <form onSubmit={onSubmit} className={`flex overflow-hidden border ${dark ? 'border-[#6E4F35]' : 'border-line'}`}>
        <div className="absolute -left-[9999px]" aria-hidden="true">
          <label htmlFor="company_website">Company website</label>
          <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
        </div>
        <input
          type="email"
          name="email"
          required
          placeholder={placeholder}
          className={`focus-ring w-[220px] bg-transparent px-4 py-3.5 text-sm sm:w-[240px] ${
            dark ? 'text-ivory placeholder:text-[#B79A7C]' : 'text-ink placeholder:text-ink-soft'
          }`}
        />
        <button
          type="submit"
          disabled={status === 'loading'}
          className={`px-5 py-3.5 text-sm font-bold ${
            dark ? 'bg-bronze text-espresso' : 'bg-espresso text-ivory'
          } disabled:opacity-60`}
        >
          {status === 'loading' ? t('submitting') : t('subscribeButton')}
        </button>
      </form>
      {status === 'error' && <p className="mt-2 text-xs text-[#c0503f]">{t('error')}</p>}
      <p className={`mt-3.5 font-mono text-[11px] ${dark ? 'text-[#B79A7C]' : 'text-ink-soft'}`}>{fineText}</p>
    </div>
  );
}
