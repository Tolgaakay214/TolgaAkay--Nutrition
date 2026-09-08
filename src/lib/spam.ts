// Lightweight, dependency-free spam mitigation for public forms:
// 1) a honeypot field ("company_website") that's hidden from real users via
//    CSS (not display:none, which some bots skip) but visible to bots that
//    fill in every field they find;
// 2) a minimum-fill-time check using a hidden timestamp set on page load —
//    genuine humans take at least a couple of seconds to fill a form.
// For production, also enable Cloudflare Turnstile (see .env.example) and
// verify the token server-side before calling isLikelySpam.

const MIN_FILL_TIME_MS = 2500;

export function isLikelySpam({
  honeypot,
  formRenderedAt
}: {
  honeypot?: string;
  formRenderedAt?: string;
}): boolean {
  if (honeypot && honeypot.trim().length > 0) return true;
  if (formRenderedAt) {
    const rendered = Number(formRenderedAt);
    if (!Number.isNaN(rendered) && Date.now() - rendered < MIN_FILL_TIME_MS) return true;
  }
  return false;
}

export async function verifyTurnstile(token: string | undefined): Promise<boolean> {
  const secret = process.env.TURNSTILE_SECRET_KEY;
  if (!secret) return true; // not configured yet — skip rather than block all submissions
  if (!token) return false;

  const res = await fetch('https://challenges.cloudflare.com/turnstile/v0/siteverify', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: new URLSearchParams({ secret, response: token })
  });
  const data = (await res.json()) as { success: boolean };
  return data.success;
}
