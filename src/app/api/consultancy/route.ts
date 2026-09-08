import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isLikelySpam, verifyTurnstile } from '@/lib/spam';
import { saveSubmission } from '@/lib/submissions';
import { sendNotification } from '@/lib/email';

const schema = z.object({
  name: z.string().min(2).max(200),
  email: z.string().email(),
  company: z.string().max(200).optional(),
  country: z.string().min(2).max(100),
  role: z.string().max(200).optional(),
  areasOfInterest: z.array(z.string()).min(1),
  description: z.string().min(10).max(3000),
  preferredContact: z.string().max(100).optional(),
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

  await saveSubmission('consultancy_inquiries', {
    name: data.name,
    email: data.email,
    company: data.company ?? null,
    country: data.country,
    role: data.role ?? null,
    areas_of_interest: data.areasOfInterest,
    description: data.description,
    preferred_contact: data.preferredContact ?? null
  });

  await sendNotification({
    to: process.env.CONSULTANCY_TO_EMAIL ?? 'tolgaakay616@gmail.com',
    subject: `New consultancy inquiry: ${data.name}`,
    text: `From: ${data.name} <${data.email}>\nCompany: ${data.company ?? '—'}\nCountry: ${data.country}\nRole: ${data.role ?? '—'}\nAreas: ${data.areasOfInterest.join(', ')}\n\n${data.description}`
  });

  return NextResponse.json({ ok: true });
}
