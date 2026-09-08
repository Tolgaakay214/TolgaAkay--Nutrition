import type { Metadata } from 'next';

const SITE_URL = process.env.NEXT_PUBLIC_SITE_URL ?? 'https://tolgaakay.com';
const SITE_NAME = 'Tolga Akay — Applied Ruminant Nutrition';

export function absoluteUrl(pathname: string) {
  return new URL(pathname, SITE_URL).toString();
}

export function buildMetadata({
  title,
  description,
  pathname,
  locale = 'en',
  ogImage
}: {
  title: string;
  description: string;
  pathname: string;
  locale?: string;
  ogImage?: string;
}): Metadata {
  const url = absoluteUrl(pathname);
  return {
    title: `${title} | ${SITE_NAME}`,
    description,
    alternates: {
      canonical: url,
      languages: { en: absoluteUrl(pathname), tr: absoluteUrl(`/tr${pathname}`) }
    },
    openGraph: {
      title,
      description,
      url,
      siteName: SITE_NAME,
      locale,
      type: 'article',
      images: ogImage ? [{ url: ogImage, width: 1200, height: 630 }] : undefined
    },
    twitter: {
      card: 'summary_large_image',
      title,
      description,
      images: ogImage ? [ogImage] : undefined
    }
  };
}

export function articleJsonLd({
  title,
  description,
  slug,
  datePublished
}: {
  title: string;
  description: string;
  slug: string;
  datePublished: string;
}) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Article',
    headline: title,
    description,
    datePublished,
    dateModified: datePublished,
    author: { '@type': 'Person', name: 'Tolga Akay', url: absoluteUrl('/about') },
    publisher: { '@type': 'Person', name: 'Tolga Akay' },
    mainEntityOfPage: absoluteUrl(slug)
  };
}

export function breadcrumbJsonLd(items: { name: string; item: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((it, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: it.name,
      item: absoluteUrl(it.item)
    }))
  };
}

export function personJsonLd() {
  return {
    '@context': 'https://schema.org',
    '@type': 'Person',
    name: 'Tolga Akay',
    jobTitle: 'Animal Nutritionist — R&D Coordinator & Lab Manager',
    url: absoluteUrl('/about'),
    sameAs: ['https://www.linkedin.com/in/tolgaakay-nutrition']
  };
}

export function faqJsonLd(items: { question: string; answer: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: items.map((it) => ({
      '@type': 'Question',
      name: it.question,
      acceptedAnswer: { '@type': 'Answer', text: it.answer }
    }))
  };
}
