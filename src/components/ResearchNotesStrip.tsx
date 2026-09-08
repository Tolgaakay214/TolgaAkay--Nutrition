import { Link } from '@/navigation';
import type { ResearchNoteMeta } from '@/lib/content';

export function ResearchNotesStrip({ notes }: { notes: ResearchNoteMeta[] }) {
  return (
    <div className="grid grid-cols-1 gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
      {notes.map((note) => (
        <Link
          key={note.slug}
          href={`/research-notes/${note.slug}`}
          className="bg-ivory p-6 transition-colors hover:bg-ivory-2"
        >
          <span className="font-mono text-[11px] text-bronze">{note.readingTime.replace('read', '').trim().toUpperCase()}</span>
          <h4 className="mt-2.5 font-sans text-[14.5px] font-semibold leading-snug text-ink">{note.title}</h4>
        </Link>
      ))}
    </div>
  );
}
