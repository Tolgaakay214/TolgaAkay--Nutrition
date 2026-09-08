import type { Metadata } from 'next';
import { setRequestLocale } from 'next-intl/server';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  return buildMetadata({
    title: 'Privacy Policy',
    description: 'What data this site collects, why, and how it is handled.',
    pathname: '/privacy-policy',
    locale
  });
}

export default function PrivacyPolicyPage({ params: { locale } }: { params: { locale: string } }) {
  setRequestLocale(locale);

  return (
    <div className="mx-auto max-w-[68ch] px-5 py-16 sm:px-8">
      <p className="eyebrow">Legal</p>
      <h1 className="mt-4 font-serif text-3xl font-medium text-ink">Privacy Policy</h1>
      <div className="prose prose-lg mt-8 max-w-none">
        <p>
          This page explains what information this site collects, why, and how it&rsquo;s handled. It applies to
          tolgaakay.com and its subpages.
        </p>
        <h2>What We Collect</h2>
        <ul>
          <li>Information you submit through the Ask a Question, Collaborate, or Contact forms (name, email, country, profession, and your message or question).</li>
          <li>Files you choose to upload with a question (rations, feed analyses, photos, or documents).</li>
          <li>Your email address, if you subscribe to the newsletter.</li>
          <li>Basic, privacy-respecting analytics events (page views, referrers) — no cross-site tracking, no ad identifiers.</li>
        </ul>
        <h2>Why We Collect It</h2>
        <p>
          Solely to respond to your inquiry, to send the newsletter if you&rsquo;ve opted in, and to understand,
          in aggregate, how the site is used so it can be improved. Your data is never sold, and never used for
          advertising.
        </p>
        <h2>How Long We Keep It</h2>
        <p>
          Form submissions and any attachments are retained for up to 12 months to support follow-up
          correspondence, then deleted. You can request earlier deletion at any time by emailing
          tolgaakay616@gmail.com.
        </p>
        <h2>Newsletter</h2>
        <p>
          Subscribing requires confirming your email address (double opt-in). Every newsletter email includes a
          one-click unsubscribe link.
        </p>
        <h2>File Uploads</h2>
        <p>
          Attachments submitted with a question are stored privately and are not publicly accessible. Some
          material submitted this way — rations, feed analyses — may be commercially sensitive to your operation,
          and is treated accordingly: viewed only as needed to respond to your question.
        </p>
        <h2>Your Rights</h2>
        <p>
          You can ask, at any time, what data is held about you, request a correction, or request deletion, by
          emailing tolgaakay616@gmail.com.
        </p>
        <h2>Contact</h2>
        <p>Questions about this policy: tolgaakay616@gmail.com.</p>
      </div>
    </div>
  );
}
