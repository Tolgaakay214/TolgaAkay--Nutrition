import { NextRequest, NextResponse } from 'next/server';
import Fuse from 'fuse.js';
import { getSearchIndex } from '@/lib/content';
import type { Locale } from '@/i18n';

export async function GET(req: NextRequest) {
  const q = req.nextUrl.searchParams.get('q')?.trim() ?? '';
  const localeParam = req.nextUrl.searchParams.get('locale');
  const locale: Locale = localeParam === 'tr' ? 'tr' : 'en';
  const index = getSearchIndex(locale);

  if (!q) return NextResponse.json({ results: [] });

  const fuse = new Fuse(index, {
    keys: ['title', 'excerpt'],
    threshold: 0.35,
    ignoreLocation: true
  });

  const results = fuse.search(q, { limit: 12 }).map((r) => r.item);
  return NextResponse.json({ results });
}
