import Image from 'next/image';
import { getTranslations, setRequestLocale } from 'next-intl/server';
import { Link } from '@/navigation';
import { HeroPhotos } from '@/components/HeroPhotos';
import { ExpertiseGrid } from '@/components/ExpertiseGrid';
import { ArticleCard } from '@/components/ArticleCard';
import { GuideFeature } from '@/components/GuideFeature';
import { ResearchNotesStrip } from '@/components/ResearchNotesStrip';
import { SectionHead } from '@/components/SectionHead';
import { NewsletterForm } from '@/components/forms/NewsletterForm';
import { getAllArticles, getAllGuides, getAllResearchNotes, getArticleBySlug } from '@/lib/content';
import type { Metadata } from 'next';
import type { Locale } from '@/i18n';
import { buildMetadata } from '@/lib/seo';

export async function generateMetadata({
  params: { locale }
}: {
  params: { locale: string };
}): Promise<Metadata> {
  const t = await getTranslations({ locale, namespace: 'seo.home' });
  return buildMetadata({
    title: t('title'),
    description: t('description'),
    pathname: '/',
    locale
  });
}

export default async function HomePage({
  params: { locale }
}: {
  params: { locale: string };
}) {
  setRequestLocale(locale);
  const t = await getTranslations('home');
  const tf = await getTranslations('forms');
  const articles = getAllArticles(locale as Locale).filter((a) => a.status === 'published').slice(0, 3);
  const guides = getAllGuides(locale as Locale);
  const guide = guides.find((g) => g.featured) ?? guides[0];
  const notes = getAllResearchNotes(locale as Locale).slice(0, 4);
  const collabPills = t.raw('collabPills') as string[];
  const linkedinPosts = (
    t.raw('linkedinPosts') as { articleSlug: string; quote: string; linkedinUrl: string }[]
  )
    .map((post) => {
      const article = getArticleBySlug(post.articleSlug, locale as Locale);
      return article ? { ...post, article } : null;
    })
    .filter((post): post is { articleSlug: string; quote: string; linkedinUrl: string; article: NonNullable<ReturnType<typeof getArticleBySlug>> } => post !== null);

  return (
    <>
      {/* Hero */}
      <section className="border-b border-line px-5 pb-[88px] pt-[52px] sm:px-8 sm:pt-[76px]">
        <div className="mx-auto grid max-w-content grid-cols-1 items-center gap-12 lg:grid-cols-[1.15fr_0.85fr] lg:gap-16">
          <div>
            <p className="eyebrow">{t('eyebrow')}</p>
            <h1 className="mt-4 whitespace-pre-line font-serif text-[clamp(34px,5vw,58px)] font-medium leading-[1.06] text-ink text-balance">
              {t('heroTitle')}
            </h1>
            <p className="mt-5 max-w-[58ch] text-lg text-ink-soft">{t('heroSubtitle')}</p>
            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link
                href="/consultancy"
                className="focus-ring rounded-sm bg-bronze px-8 py-4 text-base font-semibold text-ivory shadow-sm transition-colors hover:bg-bronze-deep"
              >
                {t('ctaWork')} →
              </Link>
              <Link
                href="/articles"
                className="focus-ring rounded-sm bg-espresso px-[18px] py-[10px] text-sm font-semibold text-ivory transition-colors hover:bg-bronze-deep"
              >
                {t('ctaExplore')}
              </Link>
              <Link
                href="/ask-a-question"
                className="focus-ring rounded-sm border border-ink px-[18px] py-[10px] text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze"
              >
                {t('ctaAsk')}
              </Link>
            </div>
            <div className="mt-4 flex flex-wrap gap-3">
              <Link
                href="/dairy-cattle"
                className="focus-ring inline-flex items-center gap-3 rounded-sm border border-line py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze"
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden border border-line">
                  <Image src="/images/dairy-cattle-thumb.jpg" alt="" fill sizes="36px" className="object-cover" />
                </span>
                {t('ctaDairyCattle')}
              </Link>
              <Link
                href="/beef-cattle"
                className="focus-ring inline-flex items-center gap-3 rounded-sm border border-line py-1.5 pl-1.5 pr-4 text-sm font-semibold text-ink transition-colors hover:border-bronze hover:text-bronze"
              >
                <span className="relative h-9 w-9 shrink-0 overflow-hidden border border-line">
                  <Image src="/images/beef-cattle-thumb.jpg" alt="" fill sizes="36px" className="object-cover" />
                </span>
                {t('ctaBeefCattle')}
              </Link>
            </div>
            <div className="mt-13 flex flex-wrap gap-9 pt-5">
              <div className="font-mono">
                <b className="block text-[22px] font-semibold text-espresso">10</b>
                <span className="text-[11.5px] uppercase tracking-wider text-ink-soft">{t('statFocusAreasLabel')}</span>
              </div>
              <div className="font-mono">
                <b className="block text-[22px] font-semibold text-espresso">{t('statContentValue')}</b>
                <span className="text-[11.5px] uppercase tracking-wider text-ink-soft">{t('statContentLabel')}</span>
              </div>
              <div className="font-mono">
                <b className="block text-[22px] font-semibold text-espresso">EN / TR</b>
                <span className="text-[11.5px] uppercase tracking-wider text-ink-soft">{t('statBilingualLabel')}</span>
              </div>
            </div>
          </div>
          <HeroPhotos alt1={t('heroPhotoAlt1')} alt2={t('heroPhotoAlt2')} />
        </div>
      </section>

      {/* About strip */}
      <section className="border-b border-line px-5 py-[88px] sm:px-8">
        <div className="mx-auto grid max-w-content grid-cols-1 items-start gap-11 sm:grid-cols-[220px_1fr]">
          <div className="relative aspect-[4/5] overflow-hidden border border-line">
            <Image
              src="/images/tolga-akay-portrait.jpg"
              alt={t('portraitAlt')}
              fill
              sizes="220px"
              className="object-cover"
              priority
            />
          </div>
          <div>
            <p className="eyebrow">{t('aboutEyebrow')}</p>
            <h2 className="mt-3.5 font-serif text-[26px] font-medium leading-tight text-ink text-balance">
              {t('aboutStripTitle')}
            </h2>
            <p className="mt-4 max-w-[68ch] text-ink-soft">{t('aboutStripBody')}</p>
            <Link href="/about" className="focus-ring mt-5 inline-block text-sm font-semibold text-ink-soft hover:text-bronze">
              {t('readStory')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Expertise grid */}
      <section className="border-b border-line py-[88px]">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <SectionHead eyebrow={t('focusEyebrow')} title={t('focusTitle')} />
        </div>
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <ExpertiseGrid />
        </div>
      </section>

      {/* Recent Articles */}
      <section className="border-b border-line px-5 py-[88px] sm:px-8">
        <div className="mx-auto max-w-content">
          <SectionHead
            eyebrow={t('articlesEyebrow')}
            title={t('articlesTitle')}
            action={
              <Link href="/articles" className="focus-ring text-sm font-semibold text-ink-soft hover:text-bronze">
                {t('viewAllArticles')} →
              </Link>
            }
          />
          <div className="grid grid-cols-1 gap-7 md:grid-cols-3">
            {articles.map((a) => (
              <ArticleCard key={a.slug} article={a} />
            ))}
          </div>
        </div>
      </section>

      {/* Featured guide */}
      {guide && (
        <section className="border-b border-line px-5 py-[88px] sm:px-8">
          <div className="mx-auto max-w-content">
            <p className="eyebrow">{t('guideEyebrow')}</p>
            <h2 className="mb-8 mt-3.5 font-serif text-[clamp(26px,3vw,36px)] font-medium text-ink">
              {t('guideTitle')}
            </h2>
            <GuideFeature guide={guide} />
          </div>
        </section>
      )}

      {/* Research notes */}
      <section className="border-b border-line py-[88px]">
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <SectionHead
            eyebrow={t('notesEyebrow')}
            title={t('notesTitle')}
            action={
              <Link href="/research-notes" className="focus-ring text-sm font-semibold text-ink-soft hover:text-bronze">
                {t('viewAllNotes')} →
              </Link>
            }
          />
        </div>
        <div className="mx-auto max-w-content px-5 sm:px-8">
          <ResearchNotesStrip notes={notes} />
        </div>
      </section>

      {/* Collaborate */}
      <section className="border-b border-line px-5 py-[88px] sm:px-8">
        <div className="mx-auto grid max-w-content grid-cols-1 gap-14 sm:grid-cols-2">
          <div>
            <p className="eyebrow">{t('collabEyebrow')}</p>
            <h2 className="mt-3.5 font-serif text-[clamp(24px,3vw,32px)] font-medium leading-tight text-ink text-balance">
              {t('collabTitle')}
            </h2>
          </div>
          <div>
            <p className="text-ink-soft">{t('collabBody')}</p>
            <div className="mt-6 flex flex-wrap gap-2.5">
              {collabPills.map((a) => (
                <span key={a} className="rounded-sm border border-line px-3.5 py-2 font-mono text-[13px] text-ink">
                  {a}
                </span>
              ))}
            </div>
            <Link
              href="/consultancy"
              className="focus-ring mt-7 inline-flex items-center rounded-sm bg-espresso px-[18px] py-[10px] text-sm font-semibold text-ivory hover:bg-bronze-deep"
            >
              {t('collabCta')} →
            </Link>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <div className="bg-espresso px-5 py-[74px] sm:px-8">
        <div className="mx-auto flex max-w-content flex-wrap items-center justify-between gap-10">
          <div>
            <h2 className="font-serif text-[clamp(24px,3vw,32px)] font-medium text-ivory">{t('newsletterTitle')}</h2>
            <p className="mt-2.5 max-w-[44ch] text-[14.5px] text-[#D8C5AC]">{t('newsletterBody')}</p>
          </div>
          <NewsletterForm
            dark
            placeholder={tf('emailPlaceholder')}
            fineText={t('newsletterFine')}
            successText={tf('successNewsletter')}
          />
        </div>
      </div>

      {/* LinkedIn */}
      <section className="px-5 py-[88px] sm:px-8">
        <div className="mx-auto max-w-content">
          <p className="eyebrow">{t('linkedinEyebrow')}</p>
          <h2 className="mb-8 mt-3.5 font-serif text-[26px] font-medium text-ink">{t('linkedinTitle')}</h2>
          <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
            {linkedinPosts.map((post) => (
              <div key={post.articleSlug} className="flex flex-col border border-line p-6 transition-colors hover:border-bronze">
                <span className="eyebrow text-[10.5px]">{t('linkedinPostLabel')}</span>
                <p className="mt-3 text-[15px] leading-relaxed text-ink">{post.quote}</p>
                <h3 className="mt-4 font-serif text-[17px] font-medium leading-snug text-ink">{post.article.meta.title}</h3>
                <div className="mt-5 flex flex-wrap items-center gap-x-5 gap-y-2 border-t border-line pt-4 font-mono text-[11.5px] uppercase tracking-wider">
                  <Link href={`/articles/${post.articleSlug}`} className="focus-ring text-bronze hover:text-bronze-deep">
                    {t('linkedinReadArticle')} →
                  </Link>
                  <a
                    href={post.linkedinUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="focus-ring text-ink-soft hover:text-bronze"
                  >
                    {t('linkedinViewPost')} ↗
                  </a>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </>
  );
}
