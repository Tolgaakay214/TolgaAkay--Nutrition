import { Resend } from 'resend';

// Transactional email notifications to you when a form is submitted.
// No-op (logs only) until RESEND_API_KEY is set — forms still work and
// submissions are still saved (see lib/submissions.ts); you just won't get
// an email until this is configured.
export async function sendNotification({
  to,
  subject,
  text
}: {
  to: string;
  subject: string;
  text: string;
}) {
  const apiKey = process.env.RESEND_API_KEY;
  if (!apiKey) {
    console.log(`[email:disabled] Would send "${subject}" to ${to}`);
    return;
  }
  const resend = new Resend(apiKey);
  await resend.emails.send({
    // Uses Resend's shared onboarding domain until a custom domain is
    // verified in Resend (Settings -> Domains) — swap this for
    // notifications@yourdomain.com once that's set up.
    from: 'Tolga Akay Website <onboarding@resend.dev>',
    to,
    subject,
    text
  });
}
