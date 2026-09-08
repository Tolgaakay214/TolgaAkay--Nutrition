import type { Metadata } from 'next';
import { AskAQuestionForm } from '@/components/forms/AskAQuestionForm';
import { JsonLd } from '@/components/JsonLd';
import { buildMetadata, faqJsonLd } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Ask a Question',
    description: 'Have a ruminant nutrition question? Ask directly — general questions may be answered publicly, anonymized.',
    pathname: '/ask-a-question',
    locale
  });
}

const faqs = [
  {
    question: 'What kinds of questions can I ask?',
    answer:
      'Anything within ruminant and dairy cattle nutrition — ration evaluation, transition cow feeding, DCAD, rumen health, feed additives, TMR management, and related topics. Highly farm-specific or urgent situations are better handled directly with your veterinarian or on-farm nutritionist alongside anything I can add here.'
  },
  {
    question: 'Will my question be published?',
    answer:
      'Only if it is general enough to help others, and only with all identifying details removed. Check "keep this private" on the form if you would prefer your question isn\'t used publicly under any circumstances.'
  },
  {
    question: 'How long does it take to hear back?',
    answer: 'I read every submission personally. Response time varies, but I aim to reply directly within a few business days where a specific reply is appropriate.'
  }
];

export default function AskAQuestionPage() {
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <JsonLd data={faqJsonLd(faqs)} />
      <p className="eyebrow">Collaborate</p>
      <h1 className="mt-4 max-w-[18ch] font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink text-balance">
        Have a Nutrition Question?
      </h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">
        I read every question submitted here personally. If yours is a common, general question, I may answer it
        publicly as a Research Note (with all identifying details removed) so others benefit too — let me know in
        the form if you&rsquo;d prefer your question stay private. For farm-specific or urgent situations, please
        also consult your veterinarian or on-farm nutritionist directly; this is a supplementary resource, not an
        emergency channel.
      </p>

      <div className="mt-12 max-w-2xl border border-line p-6 sm:p-10">
        <AskAQuestionForm />
      </div>

      <div className="mt-20 max-w-2xl border-t border-line pt-12">
        <p className="eyebrow">Frequently Asked</p>
        <div className="mt-6 space-y-6">
          {faqs.map((f) => (
            <div key={f.question} className="border-b border-line pb-6">
              <h3 className="font-serif text-lg text-ink">{f.question}</h3>
              <p className="mt-2 text-sm text-ink-soft">{f.answer}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
