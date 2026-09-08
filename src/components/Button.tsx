import { Link } from '@/navigation';
import clsx from 'clsx';
import type { ComponentProps } from 'react';

type Variant = 'primary' | 'line' | 'ghost';

const styles: Record<Variant, string> = {
  primary: 'bg-espresso text-ivory hover:bg-bronze-deep',
  line: 'border border-ink text-ink hover:border-bronze hover:text-bronze bg-transparent',
  ghost: 'text-ink-soft hover:text-bronze bg-transparent px-0'
};

export function Button({
  href,
  variant = 'primary',
  children,
  className,
  ...props
}: {
  href: ComponentProps<typeof Link>['href'];
  variant?: Variant;
  children: React.ReactNode;
  className?: string;
}) {
  return (
    <Link
      href={href}
      className={clsx(
        'focus-ring inline-flex items-center gap-2 rounded-sm px-[18px] py-[10px] text-sm font-semibold transition-colors duration-150',
        styles[variant],
        className
      )}
      {...props}
    >
      {children}
    </Link>
  );
}
