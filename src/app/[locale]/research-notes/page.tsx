import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { SectionHead } from '@/components/SectionHead';
import { getAllResearchNotes } from '@/lib/content';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Research Notes',
    description: 'Short, sharp ideas on ruminant nutrition — one to three minutes each.',
    pathname: '/research-notes',
    locale
  });
}

export default function ResearchNotesIndex({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  const notes = getAllResearchNotes();
  return (
    <div className="mx-auto max-w-content px-5 py-16 sm:px-8">
      <SectionHead eyebrow="Fast Reads" title="Research Notes" />
      <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-3">
        {notes.map((note) => (
          <Link key={note.slug} href={`/research-notes/${note.slug}`} className="bg-ivory p-7 hover:bg-ivory-2">
            <span className="font-mono text-[11px] text-bronze">{note.readingTime}</span>
            <h3 className="mt-3 font-serif text-lg leading-snug text-ink">{note.title}</h3>
          </Link>
        ))}
      </div>
    </div>
  );
}
