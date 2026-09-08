'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';
import { Turnstile } from '../Turnstile';

const fieldClass =
  'focus-ring w-full border border-line bg-ivory px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft';
const labelClass = 'mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink-soft';

export function ContactForm() {
  const t = useTranslations('forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const renderedAt = useRef(Date.now().toString());
  const [turnstileToken, setTurnstileToken] = useState('');

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      subject: String(fd.get('subject') ?? ''),
      message: String(fd.get('message') ?? ''),
      honeypot: String(fd.get('company_website') ?? ''),
      formRenderedAt: renderedAt.current,
      turnstileToken
    };

    setStatus('loading');
    try {
      const res = await fetch('/api/contact', {
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
        <p className="font-serif text-xl text-ink">{t('successContact')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="cw3">Company website</label>
        <input id="cw3" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="ct-name">{t('name')}</label>
          <input id="ct-name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="ct-email">{t('email')}</label>
          <input id="ct-email" name="email" type="email" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="ct-subject">{t('subject')}</label>
        <input id="ct-subject" name="subject" required className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="ct-message">{t('message')}</label>
        <textarea id="ct-message" name="message" required rows={6} maxLength={3000} className={fieldClass} />
      </div>

      <Turnstile onToken={setTurnstileToken} />

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
