'use client';

import { useRef, useState } from 'react';
import { useTranslations } from 'next-intl';

const fieldClass =
  'focus-ring w-full border border-line bg-ivory px-4 py-3 text-[15px] text-ink placeholder:text-ink-soft';
const labelClass = 'mb-2 block font-mono text-[11px] uppercase tracking-wider text-ink-soft';

export function AskAQuestionForm() {
  const t = useTranslations('forms');
  const [status, setStatus] = useState<'idle' | 'loading' | 'success' | 'error'>('idle');
  const renderedAt = useRef(Date.now().toString());

  async function onSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const fd = new FormData(form);

    const payload = {
      name: String(fd.get('name') ?? ''),
      email: String(fd.get('email') ?? ''),
      country: String(fd.get('country') ?? ''),
      profession: String(fd.get('profession') ?? ''),
      subject: String(fd.get('subject') ?? ''),
      question: String(fd.get('question') ?? ''),
      keepPrivate: fd.get('keepPrivate') === 'on',
      consent: fd.get('consent') === 'on',
      honeypot: String(fd.get('company_website') ?? ''),
      formRenderedAt: renderedAt.current
    };

    setStatus('loading');
    try {
      const res = await fetch('/api/ask-a-question', {
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
        <p className="font-serif text-xl text-ink">{t('successAsk')}</p>
      </div>
    );
  }

  return (
    <form onSubmit={onSubmit} className="space-y-6">
      <div className="absolute -left-[9999px]" aria-hidden="true">
        <label htmlFor="company_website">Company website</label>
        <input id="company_website" name="company_website" type="text" tabIndex={-1} autoComplete="off" />
      </div>

      <div className="grid gap-6 sm:grid-cols-2">
        <div>
          <label className={labelClass} htmlFor="name">{t('name')}</label>
          <input id="name" name="name" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="email">{t('email')}</label>
          <input id="email" name="email" type="email" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="country">{t('country')}</label>
          <input id="country" name="country" required className={fieldClass} />
        </div>
        <div>
          <label className={labelClass} htmlFor="profession">{t('profession')}</label>
          <input id="profession" name="profession" required className={fieldClass} />
        </div>
      </div>

      <div>
        <label className={labelClass} htmlFor="subject">{t('subject')}</label>
        <input id="subject" name="subject" required className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="question">{t('question')}</label>
        <textarea id="question" name="question" required rows={6} maxLength={2000} className={fieldClass} />
      </div>

      <div>
        <label className={labelClass} htmlFor="attachments">{t('attachments')}</label>
        <input
          id="attachments"
          name="attachments"
          type="file"
          multiple
          accept=".pdf,.jpg,.jpeg,.png,.xlsx,.docx"
          className="block w-full text-sm text-ink-soft file:mr-4 file:border file:border-line file:bg-ivory-2 file:px-4 file:py-2 file:text-sm file:text-ink"
        />
        <p className="mt-1.5 text-xs text-ink-soft">Rations, feed analyses, photos or documents. Up to 3 files, 10MB each.</p>
      </div>

      <label className="flex items-start gap-2.5 text-sm text-ink-soft">
        <input type="checkbox" name="keepPrivate" className="mt-1" />
        Keep this question private (don&rsquo;t publish it as a Research Note, even anonymized).
      </label>

      <label className="flex items-start gap-2.5 text-sm text-ink-soft">
        <input type="checkbox" name="consent" required className="mt-1" />
        {t('consent')}
      </label>

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
