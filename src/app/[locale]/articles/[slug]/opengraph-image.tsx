import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/content';
import { getTranslations } from 'next-intl/server';
import type { Locale } from '@/i18n';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default async function OgImage({ params: { slug, locale } }: { params: { slug: string; locale: string } }) {
  const article = getArticleBySlug(slug, locale as Locale);
  const title = article?.meta.title ?? 'Tolga Akay';
  const tCat = await getTranslations({ locale, namespace: 'categories' });
  const category = article ? tCat(article.meta.category) : 'Applied Ruminant Nutrition';

  return new ImageResponse(
    (
      <div
        style={{
          width: '100%',
          height: '100%',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'space-between',
          background: '#241f19',
          color: '#f7f3ea',
          padding: '72px'
        }}
      >
        <div style={{ display: 'flex', fontSize: 22, letterSpacing: 4, color: '#d3a46c', textTransform: 'uppercase' }}>
          {category}
        </div>
        <div style={{ display: 'flex', fontSize: 56, lineHeight: 1.15, maxWidth: 980 }}>{title}</div>
        <div style={{ display: 'flex', fontSize: 24, color: '#c4b79e' }}>Tolga Akay — Applied Ruminant Nutrition</div>
      </div>
    ),
    { ...size }
  );
}
