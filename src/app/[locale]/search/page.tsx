'use client';

import { Suspense, useEffect, useState } from 'react';
import { useSearchParams } from 'next/navigation';
import { useTranslations, useLocale } from 'next-intl';
import { Link } from '@/navigation';

interface Result {
  type: string;
  slug: string;
  title: string;
  excerpt: string;
}

function SearchPageInner() {
  const t = useTranslations('search');
  const locale = useLocale();
  const params = useSearchParams();
  const q = params.get('q') ?? '';
  const [query, setQuery] = useState(q);
  const [results, setResults] = useState<Result[]>([]);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const timeout = setTimeout(async () => {
      const res = await fetch(`/api/search?q=${encodeURIComponent(query)}&locale=${locale}`);
      const data = await res.json();
      setResults(data.results ?? []);
    }, 200);
    return () => clearTimeout(timeout);
  }, [query, locale]);

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">{t('eyebrow')}</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">{t('title')}</h1>
      <input
        autoFocus
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        placeholder={t('placeholder')}
        className="focus-ring mt-8 w-full max-w-xl border border-line bg-ivory-2 px-4 py-3.5 text-[15px] text-ink placeholder:text-ink-soft"
      />
      <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2">
        {results.map((r) => (
          <Link key={r.slug} href={`/${r.slug}`} className="border border-line p-5 hover:border-bronze">
            <span className="font-mono text-[10.5px] uppercase tracking-wider text-bronze">{r.type}</span>
            <h3 className="mt-2 font-serif text-lg text-ink">{r.title}</h3>
            {r.excerpt && <p className="mt-1.5 text-sm text-ink-soft">{r.excerpt}</p>}
          </Link>
        ))}
      </div>
      {query && results.length === 0 && <p className="mt-8 text-ink-soft">{t('noResults', { query })}</p>}
    </div>
  );
}

export default function SearchPage() {
  return (
    <Suspense fallback={null}>
      <SearchPageInner />
    </Suspense>
  );
}
