import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isLikelySpam, verifyTurnstile } from '@/lib/spam';
import { saveSubmission } from '@/lib/submissions';
import { sendNotification } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  country: z.string().min(2).max(100),
  profession: z.string().min(2).max(200),
  subject: z.string().min(3).max(200),
  question: z.string().min(10).max(2000),
  keepPrivate: z.boolean().optional(),
  consent: z.literal(true),
  honeypot: z.string().optional(),
  formRenderedAt: z.string().optional(),
  turnstileToken: z.string().optional()
});

export async function POST(req: NextRequest) {
  const json = await req.json().catch(() => null);
  const parsed = schema.safeParse(json);

  if (!parsed.success) {
    return NextResponse.json({ ok: false, error: 'invalid_input' }, { status: 400 });
  }

  const data = parsed.data;

  if (isLikelySpam({ honeypot: data.honeypot, formRenderedAt: data.formRenderedAt })) {
    // Respond as if successful so bots don't learn the check failed.
    return NextResponse.json({ ok: true });
  }

  if (!(await verifyTurnstile(data.turnstileToken))) {
    return NextResponse.json({ ok: false, error: 'verification_failed' }, { status: 400 });
  }

  await saveSubmission('question_submissions', {
    name: data.name,
    email: data.email,
    country: data.country,
    profession: data.profession,
    subject: data.subject,
    question: data.question,
    keep_private: !!data.keepPrivate,
    consent_at: new Date().toISOString()
  });

  await sendNotification({
    to: process.env.ASK_QUESTION_TO_EMAIL ?? 'tolgaakay616@gmail.com',
    subject: `New question: ${data.subject}`,
    text: `From: ${data.name} <${data.email}>\nCountry: ${data.country}\nProfession: ${data.profession}\nKeep private: ${!!data.keepPrivate}\n\n${data.question}`
  });

  return NextResponse.json({ ok: true });
}
