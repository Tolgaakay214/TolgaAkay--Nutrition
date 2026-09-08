import { Wheat } from 'lucide-react';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <span className="inline-flex items-center gap-2.5">
      <span
        className={`flex shrink-0 items-center justify-center rounded-full border border-bronze/35 bg-bronze/10 text-bronze ${
          compact ? 'h-7 w-7' : 'h-9 w-9'
        }`}
      >
        <Wheat size={compact ? 15 : 18} strokeWidth={1.6} />
      </span>
      <span className={`font-serif font-semibold tracking-tight ${compact ? 'text-lg' : 'text-xl'}`}>
        Tolga <span className="text-bronze">Akay</span>
      </span>
    </span>
  );
}
