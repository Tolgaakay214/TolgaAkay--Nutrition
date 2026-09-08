import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isLikelySpam, verifyTurnstile } from '@/lib/spam';
import { saveSubmission } from '@/lib/submissions';
import { sendNotification } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  subject: z.string().min(2).max(200),
  message: z.string().min(10).max(3000),
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
    return NextResponse.json({ ok: true });
  }
  if (!(await verifyTurnstile(data.turnstileToken))) {
    return NextResponse.json({ ok: false, error: 'verification_failed' }, { status: 400 });
  }

  try {
    await saveSubmission('contact_messages', {
      name: data.name,
      email: data.email,
      subject: data.subject,
      message: data.message
    });
  } catch (err) {
    console.error('[contact] failed to save submission:', err);
    return NextResponse.json({ ok: false, error: 'save_failed' }, { status: 500 });
  }

  try {
    await sendNotification({
      to: process.env.CONTACT_TO_EMAIL ?? process.env.ASK_QUESTION_TO_EMAIL ?? 'tolgaakay616@gmail.com',
      subject: `New contact message: ${data.subject}`,
      text: `From: ${data.name} <${data.email}>\n\n${data.message}`
    });
  } catch (err) {
    console.error('[contact] failed to send notification email:', err);
  }

  return NextResponse.json({ ok: true });
}
