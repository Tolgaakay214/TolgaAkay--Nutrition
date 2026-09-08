import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Disclaimer',
    description: 'Educational purpose disclaimer for content published on this site.',
    pathname: '/disclaimer',
    locale
  });
}

export default function DisclaimerPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-[68ch] px-5 py-16 sm:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">Educational Purpose Disclaimer</h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          The content published on this website — including articles, technical guides, research notes,
          downloadable resources, and any responses provided through the &ldquo;Ask a Question&rdquo; feature — is
          intended for general educational and informational purposes only. It reflects the author&rsquo;s
          professional interpretation of peer-reviewed research and field experience in ruminant and dairy cattle
          nutrition.
        </p>
        <p>
          Nothing on this site constitutes individualized veterinary, nutritional, or agronomic advice for any
          specific animal, herd, or farm operation. Feeding programs, ration formulations, and health-related
          decisions should always be made in consultation with a licensed veterinarian or a qualified animal
          nutrition professional who has direct knowledge of your herd, feed inventory, and farm conditions.
        </p>
        <p>
          Use of any calculator, worksheet, or checklist provided on this site does not replace professional
          assessment and is provided &ldquo;as is,&rdquo; without warranty of any kind. The author and this website
          assume no liability for outcomes resulting from the independent application of information found here.
        </p>
      </div>
    </div>
  );
}
