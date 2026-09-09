import { useTranslations } from 'next-intl';
import { Link } from '@/navigation';
import type { ArticleMeta } from '@/lib/content';

function Cover({ pattern }: { pattern: ArticleMeta['coverPattern'] }) {
  if (pattern === 'line') {
    return (
      <svg viewBox="0 0 300 190" preserveAspectRatio="none" className="h-full w-full">
        <rect width="300" height="190" fill="var(--ivory-2)" />
        <polyline
          points="0,150 40,120 80,135 120,80 160,100 200,50 240,70 300,30"
          fill="none"
          stroke="var(--bronze)"
          strokeWidth="2"
          opacity="0.55"
        />
        <line x1="0" y1="150" x2="300" y2="150" stroke="var(--line)" strokeWidth="1" />
      </svg>
    );
  }
  if (pattern === 'bars') {
    return (
      <svg viewBox="0 0 300 190" preserveAspectRatio="none" className="h-full w-full">
        <rect width="300" height="190" fill="var(--ivory-2)" />
        {[
          [20, 130, 40],
          [60, 90, 80],
          [100, 110, 60],
          [140, 60, 110],
          [180, 100, 70]
        ].map(([x, y, h], i) => (
          <rect key={i} x={x} y={y} width="20" height={h} fill="var(--bronze)" opacity={0.4 + i * 0.1} />
        ))}
      </svg>
    );
  }
  if (pattern === 'grid') {
    return (
      <svg viewBox="0 0 300 190" preserveAspectRatio="none" className="h-full w-full">
        <rect width="300" height="190" fill="var(--ivory-2)" />
        {[40, 80, 120].map((y, i) => (
          <rect
            key={y}
            x={40 + i * 20}
            y={y}
            width={220 - i * 40}
            height="20"
            stroke="var(--bronze)"
            strokeWidth="1.4"
            fill="none"
            opacity="0.6"
          />
        ))}
      </svg>
    );
  }
  return (
    <svg viewBox="0 0 300 190" preserveAspectRatio="none" className="h-full w-full">
      <rect width="300" height="190" fill="var(--ivory-2)" />
      {Array.from({ length: 24 }).map((_, i) => (
        <circle
          key={i}
          cx={20 + (i % 8) * 36}
          cy={40 + Math.floor(i / 8) * 45}
          r="3"
          fill="var(--bronze)"
          opacity="0.5"
        />
      ))}
    </svg>
  );
}

export function ArticleCard({ article }: { article: ArticleMeta }) {
  const tCat = useTranslations('categories');
  return (
    <Link
      href={`/articles/${article.slug}`}
      className="group flex flex-col overflow-hidden border border-line transition-all duration-150 hover:-translate-y-0.5 hover:border-bronze"
    >
      <div className="aspect-[16/10] border-b border-line">
        <Cover pattern={article.coverPattern} />
      </div>
      <div className="flex flex-1 flex-col gap-2.5 p-5">
        <div className="flex justify-between font-mono text-[10.5px] uppercase tracking-wider text-bronze">
          <span>{tCat(article.category)}</span>
          <span className="text-ink-soft">{article.readingTime}</span>
        </div>
        <h3 className="font-serif text-[19px] font-medium leading-snug text-ink">{article.title}</h3>
        <p className="text-[13.5px] text-ink-soft">{article.excerpt}</p>
      </div>
    </Link>
  );
}
