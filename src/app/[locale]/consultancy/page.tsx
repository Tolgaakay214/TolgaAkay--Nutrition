import type { Metadata } from 'next';
import { ConsultancyForm } from '@/components/forms/ConsultancyForm';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Collaborate With Me',
    description: 'Ration evaluation, transition cow programs, and technical assessment — evidence-based, not sales-driven.',
    pathname: '/consultancy',
    locale
  });
}

const AREAS = [
  'Ration Evaluation',
  'Transition Cow Feeding Programs',
  'DCAD Evaluation',
  'Feed Additive Evaluation',
  'TMR & Particle Size Assessment',
  'Feed and Forage Interpretation',
  'Technical Product Evaluation',
  'Scientific Literature Reviews',
  'Ruminant Nutrition Training',
  'Farm Nutrition Audits'
];

const steps = [
  { title: 'Initial Conversation', text: 'A short call or written exchange to understand your situation and whether I’m the right fit.' },
  { title: 'Scope & Data Review', text: 'I review your ration, feed analyses, or the specific question at hand.' },
  { title: 'Recommendations', text: 'You receive clear, evidence-based findings — not a generic report template.' }
];

export default function ConsultancyPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">Collaborate</p>
      <h1 className="mt-4 max-w-[20ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        Collaborate With Me
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">
        I work with dairy farms, veterinarians, feed companies, and agribusinesses on a focused set of technical
        questions in ruminant nutrition. My approach starts from the same place published research does: look at
        the data, question the assumptions, and recommend only what the evidence actually supports for your
        specific situation.
      </p>

      <div className="mt-14">
        <p className="eyebrow">Areas I Can Support</p>
        <div className="mt-5 flex flex-wrap gap-2.5">
          {AREAS.map((a) => (
            <span key={a} className="rounded-full border border-line px-4 py-2 font-mono text-xs text-ink">
              {a}
            </span>
          ))}
        </div>
      </div>

      <div className="mt-16 grid grid-cols-1 gap-8 sm:grid-cols-3">
        {steps.map((s, i) => (
          <div key={s.title} className="border-t-2 border-bronze pt-5">
            <span className="font-mono text-xs text-bronze">0{i + 1}</span>
            <h3 className="mt-2 font-serif text-lg text-ink">{s.title}</h3>
            <p className="mt-2 text-sm text-ink-soft">{s.text}</p>
          </div>
        ))}
      </div>

      <p className="mt-16 max-w-[62ch] text-ink-soft">
        If you&rsquo;re not sure whether your question fits here, ask — I&rsquo;d rather have a short conversation
        than have you guess.
      </p>

      <div className="mt-10 max-w-2xl border border-line p-6 sm:p-10">
        <ConsultancyForm />
      </div>
    </div>
  );
}
