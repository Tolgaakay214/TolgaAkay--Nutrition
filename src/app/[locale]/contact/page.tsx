import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { Linkedin, Mail } from 'lucide-react';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Contact',
    description: 'Get in touch — email, LinkedIn, or choose the right form for your request.',
    pathname: '/contact',
    locale
  });
}

const routes = [
  {
    title: 'Ask a Question',
    text: 'General ruminant nutrition questions — I read and reply to every one personally.',
    href: '/ask-a-question'
  },
  {
    title: 'Collaborate / Consultancy Request',
    text: 'Ration evaluation, transition cow programs, technical product assessment, and related work.',
    href: '/consultancy'
  }
];

export default function ContactPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <p className="eyebrow">Contact</p>
      <h1 className="mt-4 font-serif text-[clamp(32px,4.5vw,52px)] font-medium leading-tight text-ink">Contact</h1>
      <p className="mt-6 max-w-[62ch] text-lg text-ink-soft">
        Choose the route that matches what you need — it gets your message to the right place faster than a single
        general inbox.
      </p>

      <div className="mt-12 grid grid-cols-1 gap-6 sm:grid-cols-2">
        {routes.map((r) => (
          <Link key={r.href} href={r.href} className="border border-line p-7 transition-colors hover:border-bronze">
            <h3 className="font-serif text-xl text-ink">{r.title}</h3>
            <p className="mt-2.5 text-sm text-ink-soft">{r.text}</p>
            <span className="mt-5 inline-block text-sm font-semibold text-ink-soft">Go →</span>
          </Link>
        ))}
      </div>

      <div className="mt-14 flex flex-wrap gap-8 border-t border-line pt-10">
        <a href="mailto:tolgaakay616@gmail.com" className="flex items-center gap-2.5 text-ink hover:text-bronze">
          <Mail size={18} strokeWidth={1.6} /> tolgaakay616@gmail.com
        </a>
        <a
          href="https://www.linkedin.com/in/tolgaakay-nutrition"
          className="flex items-center gap-2.5 text-ink hover:text-bronze"
        >
          <Linkedin size={18} strokeWidth={1.6} /> linkedin.com/in/tolgaakay-nutrition
        </a>
      </div>
    </div>
  );
}
