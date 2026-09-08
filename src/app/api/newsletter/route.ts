import { NextRequest, NextResponse } from 'next/server';
import { z } from 'zod';
import { isLikelySpam } from '@/lib/spam';

const schema = z.object({
  email: z.string().email(),
  honeypot: z.string().optional(),
  formRenderedAt: z.string().optional()
});

// Uses Buttondown (https://buttondown.email) — a good fit for a
// single-author technical newsletter, with built-in double opt-in and
// one-click unsubscribe (required — see the Privacy Policy). Set
// BUTTONDOWN_API_KEY in .env.local to enable; until then this endpoint
// validates input but returns a clear "not yet configured" response.
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

  const apiKey = process.env.BUTTONDOWN_API_KEY;
  if (!apiKey) {
    console.log(`[newsletter:disabled] Would subscribe ${data.email}`);
    return NextResponse.json({ ok: true, pending: true });
  }

  const res = await fetch('https://api.buttondown.email/v1/subscribers', {
    method: 'POST',
    headers: { Authorization: `Token ${apiKey}`, 'Content-Type': 'application/json' },
    body: JSON.stringify({ email: data.email, tags: ['website'] })
  });

  if (!res.ok && res.status !== 400) {
    // 400 from Buttondown usually means "already subscribed" — treat as success.
    return NextResponse.json({ ok: false, error: 'subscribe_failed' }, { status: 502 });
  }

  return NextResponse.json({ ok: true });
}
