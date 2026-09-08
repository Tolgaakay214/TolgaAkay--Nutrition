import type { MDXComponents } from 'mdx/types';

export function Callout({ children, title }: { children: React.ReactNode; title?: string }) {
  return (
    <div className="not-prose my-8 border border-line border-l-[3px] border-l-bronze bg-ivory-2 p-5">
      {title && <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-bronze">{title}</p>}
      <div className="text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function PracticalTakeaway({ children }: { children: React.ReactNode }) {
  return (
    <div className="practical-takeaway not-prose my-8">
      <p className="mb-1.5 font-mono text-[11px] uppercase tracking-wider text-bronze">Practical Takeaway</p>
      <div className="text-[15px] leading-relaxed text-ink">{children}</div>
    </div>
  );
}

export function References({ items }: { items: string[] }) {
  if (!items?.length) return null;
  return (
    <div className="not-prose mt-14 border-t border-line pt-8">
      <p className="mb-4 font-mono text-[11px] uppercase tracking-wider text-ink-soft">References</p>
      <ol className="space-y-2.5 text-[13.5px] text-ink-soft">
        {items.map((ref, i) => (
          <li key={i} className="pl-6 -indent-6">
            <span className="mr-2 font-mono text-bronze">[{i + 1}]</span>
            {ref}
          </li>
        ))}
      </ol>
    </div>
  );
}

export const mdxComponents: MDXComponents = {
  Callout,
  PracticalTakeaway
};
