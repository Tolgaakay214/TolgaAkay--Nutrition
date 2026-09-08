import fs from 'node:fs';
import path from 'node:path';

// Durable storage for form submissions, independent of email delivery
// (email can fail or land in spam — this is the source of truth).
//
// Production path: Supabase Postgres. Set SUPABASE_URL and
// SUPABASE_SERVICE_ROLE_KEY (see .env.example and /supabase/schema.sql)
// and submissions are inserted via Supabase's REST API.
//
// Local/dev fallback: appended as JSON lines to /.data/<table>.jsonl so the
// forms are fully testable with zero external setup. Replace this fallback
// before going to production — most serverless hosts do not persist the
// local filesystem between invocations.

type Table = 'question_submissions' | 'consultancy_inquiries' | 'contact_messages';

export async function saveSubmission(table: Table, row: Record<string, unknown>) {
  const supabaseUrl = process.env.SUPABASE_URL;
  const serviceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  const payload = { ...row, created_at: new Date().toISOString() };

  if (supabaseUrl && serviceKey) {
    const res = await fetch(`${supabaseUrl}/rest/v1/${table}`, {
      method: 'POST',
      headers: {
        apikey: serviceKey,
        Authorization: `Bearer ${serviceKey}`,
        'Content-Type': 'application/json',
        Prefer: 'return=minimal'
      },
      body: JSON.stringify(payload)
    });
    if (!res.ok) {
      throw new Error(`Supabase insert failed: ${res.status} ${await res.text()}`);
    }
    return;
  }

  // Dev fallback
  const dir = path.join(process.cwd(), '.data');
  fs.mkdirSync(dir, { recursive: true });
  fs.appendFileSync(path.join(dir, `${table}.jsonl`), JSON.stringify(payload) + '\n', 'utf8');
}
