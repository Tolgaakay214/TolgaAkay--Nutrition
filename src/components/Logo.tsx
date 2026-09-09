import Image from 'next/image';

export function Logo({ compact = false }: { compact?: boolean }) {
  return (
    <Image
      src="/images/logo-lockup.png"
      alt="Tolga Akay — Ruminant Nutrition & Consultancy"
      width={2400}
      height={911}
      priority
      className={compact ? 'h-11 w-auto' : 'h-14 w-auto'}
    />
  );
}
