import { ImageResponse } from 'next/og';
import { getArticleBySlug } from '@/lib/content';

export const runtime = 'nodejs';
export const size = { width: 1200, height: 630 };
export const contentType = 'image/png';

export default function OgImage({ params: { slug } }: { params: { slug: string } }) {
  const article = getArticleBySlug(slug);
  const title = article?.meta.title ?? 'Tolga Akay';
  const category = article?.meta.category ?? 'Applied Ruminant Nutrition';

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
