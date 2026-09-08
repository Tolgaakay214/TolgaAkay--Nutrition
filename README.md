# Tolga Akay — Applied Ruminant Nutrition

Personal knowledge-hub and professional brand website. Next.js 14 (App Router) + TypeScript + Tailwind CSS, with MDX content, English/Turkish i18n infrastructure, working contact/consultancy/ask-a-question forms, and an SEO layer (metadata, sitemap, robots, JSON-LD, dynamic OG images).

See `/strategy-and-content-package.md` (delivered alongside this codebase) for the full design rationale, sitemap, and content plan this implements.

## Getting Started

```bash
npm install
cp .env.example .env.local   # fill in what you have; everything works with sensible fallbacks if left blank
npm run dev
```

Open http://localhost:3000.

## What's Wired Up vs. What Needs Your Keys

Everything **works out of the box** with zero configuration: all pages render, all three forms (Ask a Question, Collaborate, Newsletter) submit successfully, search works, and the DCAD Calculator is fully interactive. Nothing is a dead-end demo.

What's disabled until you add keys (see `.env.example` for where to get each one):

| Feature | Env var | Without it |
|---|---|---|
| Email notification when a form is submitted | `RESEND_API_KEY` | Submission is still saved; you just won't get an email |
| Durable form storage (production) | `SUPABASE_URL` + `SUPABASE_SERVICE_ROLE_KEY` | Falls back to local `.data/*.jsonl` files (fine for local testing, not for production — most hosts don't persist local disk) |
| Newsletter signups | `BUTTONDOWN_API_KEY` | Form validates and responds gracefully, but doesn't actually subscribe anyone yet |
| Spam verification | `TURNSTILE_SECRET_KEY` / `NEXT_PUBLIC_TURNSTILE_SITE_KEY` | Honeypot + timing checks still run; Turnstile adds a second layer |
| Analytics | `NEXT_PUBLIC_PLAUSIBLE_DOMAIN` | No analytics script loads |

## Adding Content (Phase 1 — MDX)

New articles, research notes, and guides are `.mdx` files with frontmatter:

- `/src/content/articles/your-slug.mdx`
- `/src/content/research-notes/your-slug.mdx`
- `/src/content/guides/your-slug.mdx`

Copy an existing file's frontmatter shape. Two custom components are available inside the article/guide body: `<Callout title="...">...</Callout>` and `<PracticalTakeaway>...</PracticalTakeaway>`. Resources are entries in `/src/content/resources.json` rather than MDX files, since they're mostly links/descriptions rather than long-form writing.

The site reads these directly from the filesystem at build time — no database, no CMS login, just add a file and deploy.

## Migrating to Sanity (Phase 2 — no-code editing)

When you're ready to publish from a browser instead of by adding files:

1. `npm install sanity next-sanity @sanity/vision`
2. Create a free project at sanity.io, set `NEXT_PUBLIC_SANITY_PROJECT_ID` and `NEXT_PUBLIC_SANITY_DATASET` in `.env.local`.
3. The content schemas are already written for you in `/src/sanity/schemas` — wire them into a `sanity.config.ts` (Sanity's `npm create sanity@latest` scaffolds this for you; point it at the existing schema files instead of generating new ones).
4. Swap the functions in `/src/lib/content.ts` to query Sanity (via `next-sanity`'s GROQ client) instead of reading the filesystem. The function signatures are intentionally kept simple (`getAllArticles()`, `getArticleBySlug(slug)`, etc.) so this is a contained change — no page component needs to change.
5. One-time: copy existing MDX content into Sanity Studio (paste the body text into the rich-text editor; frontmatter fields map directly to schema fields).

## Forms & Data

- Form submissions are validated with Zod, checked against a honeypot + minimum-fill-time spam heuristic (`/src/lib/spam.ts`), optionally verified with Cloudflare Turnstile, then saved (`/src/lib/submissions.ts`) and emailed to you (`/src/lib/email.ts`).
- Run `/supabase/schema.sql` in a new Supabase project's SQL editor to create the submission tables (Row Level Security enabled, writable only via the service role key used server-side — never exposed to the browser).
- Uploaded attachments on the Ask a Question form are accepted by the UI; wiring them to storage (Supabase Storage or Vercel Blob) is a small addition to `/src/app/api/ask-a-question/route.ts` once you've chosen a storage provider — flagged with a comment in that file.

## Internationalization

English is the default locale (served at `/`); Turkish is wired up at `/tr/...` via `next-intl`. UI strings live in `/src/messages/en.json` and `/src/messages/tr.json`. Translating an individual article into Turkish means adding the Turkish content and pointing the locale-aware content loader at it — not a code change.

## Deploying

This is built for [Vercel](https://vercel.com) (zero-config Next.js hosting, image optimization, and edge-ready API routes):

1. Push this repo to GitHub.
2. Import it in Vercel.
3. Add the environment variables from `.env.example` that you have.
4. Set your custom domain.

## Project Structure

```
src/
  app/[locale]/        — all pages (App Router, localized)
  app/api/              — form + search API routes
  components/           — UI components
  components/forms/     — client-side form components
  components/calculators/ — interactive tools (DCAD Calculator)
  components/mdx/        — custom components usable inside article/guide MDX
  content/               — MDX content + resources.json (Phase 1 CMS)
  lib/                    — content loading, SEO helpers, email, spam, submissions
  sanity/schemas/         — Phase 2 CMS schemas (not yet wired up)
  messages/               — i18n strings (en, tr)
supabase/schema.sql       — SQL for the forms/submissions database
```
