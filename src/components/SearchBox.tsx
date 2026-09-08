'use client';

import { useEffect, useRef, useState } from 'react';
import { Link } from '@/navigation';
import { Search, X } from 'lucide-react';

interface Result {
  type: string;
  slug: string;
  title: string;
  excerpt: string;
}

export function SearchBox({ placeholder }: { placeholder: string }) {
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<Result[]>([]);
  const boxRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!query) {
      setResults([]);
      return;
    }
    const controller = new AbortController();
    const timeout = setTimeout(async () => {
      try {
        const res = await fetch(`/api/search?q=${encodeURIComponent(query)}`, {
          signal: controller.signal
        });
        const data = await res.json();
        setResults(data.results ?? []);
      } catch {
        // ignore aborted/failed requests
      }
    }, 200);
    return () => {
      clearTimeout(timeout);
      controller.abort();
    };
  }, [query]);

  useEffect(() => {
    function onClick(e: MouseEvent) {
      if (boxRef.current && !boxRef.current.contains(e.target as Node)) setOpen(false);
    }
    document.addEventListener('mousedown', onClick);
    return () => document.removeEventListener('mousedown', onClick);
  }, []);

  return (
    <div className="relative" ref={boxRef}>
      <button
        type="button"
        aria-label={placeholder}
        onClick={() => setOpen((v) => !v)}
        className="focus-ring flex h-9 w-9 items-center justify-center rounded-sm text-ink-soft transition-colors hover:text-bronze"
      >
        {open ? <X size={18} strokeWidth={1.6} /> : <Search size={18} strokeWidth={1.6} />}
      </button>
      {open && (
        <div className="absolute right-0 top-11 z-50 w-[320px] border border-line bg-ivory p-3 shadow-[0_8px_24px_rgba(0,0,0,0.08)] sm:w-[380px]">
          <input
            autoFocus
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="DCAD, Penn State, corn silage…"
            className="focus-ring w-full border border-line bg-ivory-2 px-3 py-2 font-sans text-sm text-ink placeholder:text-ink-soft"
          />
          {results.length > 0 && (
            <ul className="mt-2 max-h-[320px] overflow-y-auto">
              {results.map((r) => (
                <li key={r.slug}>
                  <Link
                    href={`/${r.slug}`}
                    onClick={() => setOpen(false)}
                    className="focus-ring block border-t border-line px-1 py-3 first:border-t-0"
                  >
                    <span className="font-mono text-[10px] uppercase tracking-wider text-bronze">
                      {r.type}
                    </span>
                    <p className="mt-1 font-serif text-[15px] leading-snug text-ink">{r.title}</p>
                  </Link>
                </li>
              ))}
            </ul>
          )}
          {query && results.length === 0 && (
            <p className="mt-3 px-1 text-sm text-ink-soft">No results for &ldquo;{query}&rdquo;.</p>
          )}
        </div>
      )}
    </div>
  );
}
