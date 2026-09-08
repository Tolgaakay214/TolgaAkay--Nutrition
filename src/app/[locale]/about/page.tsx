import type { Metadata } from 'next';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, personJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'About',
    description: 'Tolga Akay — animal nutritionist working in ruminant and dairy cattle nutrition.',
    pathname: '/about',
    locale
  });
}

const timeline = [
  { period: 'Present', text: 'R&D Coordinator & Lab Manager, Global Nutritech' },
  { period: 'Present', text: 'Graduate studies, Animal Nutrition' },
  { period: '—', text: 'Add your earlier roles, training, and milestones here' }
];

const interests = [
  'Ruminant Nutrition',
  'Dairy Cow Nutrition',
  'Transition Cow Management',
  'Mineral Nutrition',
  'DCAD',
  'Rumen Physiology',
  'Feed Additives',
  'Feed Efficiency',
  'Forage Evaluation',
  'Metabolic Adaptation'
];

export default function AboutPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <JsonLd data={personJsonLd()} />
      <p className="eyebrow">About</p>
      <h1 className="mt-4 max-w-[20ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        About
      </h1>

      <div className="mt-10 grid grid-cols-1 gap-12 lg:grid-cols-[280px_1fr]">
        <div className="aspect-[4/5] border border-line bg-[repeating-linear-gradient(135deg,var(--ivory-2),var(--ivory-2)_8px,var(--ivory)_8px,var(--ivory)_9px)]" />
        <div className="max-w-[68ch] space-y-5 text-[17px] leading-relaxed text-ink-soft">
          <p>
            I&rsquo;m an animal nutritionist working in ruminant and dairy cattle nutrition, currently serving as
            R&amp;D Coordinator and Lab Manager at Global Nutritech, where I lead applied research and laboratory
            analysis supporting feed and feed-additive development. My work sits at the intersection of controlled
            research and the day-to-day realities of commercial dairy farms — which is the perspective I bring to
            everything published here.
          </p>
          <p>
            I&rsquo;m currently pursuing a graduate degree with a focus on deepening my expertise in ruminant
            nutrition, particularly dairy cattle feeding systems. My interest in this field started with a simple
            frustration: how much published science never makes it into a form a farm can actually use. This site
            exists to close that gap — one technical article, one worksheet, one honest answer at a time.
          </p>
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <p className="eyebrow">Timeline</p>
        <div className="mt-6 space-y-6">
          {timeline.map((item, i) => (
            <div key={i} className="grid grid-cols-[120px_1fr] gap-6 border-b border-line pb-6">
              <span className="font-mono text-sm text-bronze">{item.period}</span>
              <span className="text-ink">{item.text}</span>
            </div>
          ))}
        </div>
      </div>

      <div className="mt-16 border-t border-line pt-12">
        <p className="eyebrow">Research Interests</p>
        <div className="mt-6 flex flex-wrap gap-2.5">
          {interests.map((tag) => (
            <span key={tag} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink">
              {tag}
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
