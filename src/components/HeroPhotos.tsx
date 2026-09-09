import Image from 'next/image';

// Two real barn photographs shown side by side in the hero, standing in for
// the previous Penn State Particle Separator schematic. The slight vertical
// offset on the second frame gives the pairing an editorial, diptych feel
// rather than a plain grid.
export function HeroPhotos({ alt1, alt2 }: { alt1: string; alt2: string }) {
  return (
    <div className="grid grid-cols-2 gap-4">
      <div className="relative aspect-[4/5] overflow-hidden border border-line">
        <Image
          src="/images/hero-barn-aisle.jpg"
          alt={alt1}
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="object-cover"
          priority
        />
      </div>
      <div className="relative mt-10 aspect-[4/5] overflow-hidden border border-line">
        <Image
          src="/images/hero-barn-freestall.jpg"
          alt={alt2}
          fill
          sizes="(min-width: 1024px) 20vw, 45vw"
          className="object-cover"
        />
      </div>
    </div>
  );
}
