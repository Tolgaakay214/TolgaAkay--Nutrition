import Image from 'next/image';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    // The artwork has soft pencil-shaded edges tuned for a white canvas —
    // they read as a hazy halo on a dark background. Pinning it to a fixed
    // white/near-white chip (instead of the theme's --ivory, which flips
    // dark in dark mode) keeps it crisp everywhere, matching the source file.
    <span
      className={`inline-flex items-center rounded-md bg-white ${
        compact ? 'px-2 py-1' : 'px-2.5 py-1'
      }`}
    >
      <Image
        src="/images/logo-lockup.png"
        alt="Tolga Akay — Ruminant Nutrition & Consultancy"
        width={2400}
        height={911}
        priority
        className={compact ? 'h-16 w-auto' : 'h-20 w-auto'}
      />
    </span>
  );
}
