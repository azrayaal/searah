import { useEffect } from 'react';
import { site } from '@/data/site';
import type { SeoMeta } from '@/types';

function upsertMeta(selector: string, attr: 'name' | 'property', key: string, content: string) {
  let tag = document.head.querySelector<HTMLMetaElement>(selector);
  if (!tag) {
    tag = document.createElement('meta');
    tag.setAttribute(attr, key);
    document.head.appendChild(tag);
  }
  tag.setAttribute('content', content);
}

/**
 * Document head manager. Kept dependency-free so it can be swapped for a
 * framework-level solution (react-helmet, Next metadata) without touching pages.
 */
export function useSeo({ title, description, image, type = 'website', publishedAt }: SeoMeta) {
  useEffect(() => {
    const fullTitle = `${title} | ${site.name}`;
    const ogImage = image ?? `${site.url}${site.logo.withText}`;
    document.title = fullTitle;

    const entries: [string, 'name' | 'property', string, string][] = [
      ['meta[name="description"]', 'name', 'description', description],
      ['meta[property="og:title"]', 'property', 'og:title', fullTitle],
      ['meta[property="og:description"]', 'property', 'og:description', description],
      ['meta[property="og:type"]', 'property', 'og:type', type],
      ['meta[property="og:image"]', 'property', 'og:image', ogImage],
      ['meta[property="og:site_name"]', 'property', 'og:site_name', site.name],
      ['meta[property="og:url"]', 'property', 'og:url', window.location.href],
      ['meta[name="twitter:card"]', 'name', 'twitter:card', 'summary_large_image'],
      ['meta[name="twitter:site"]', 'name', 'twitter:site', site.twitter],
      ['meta[name="twitter:title"]', 'name', 'twitter:title', fullTitle],
      ['meta[name="twitter:description"]', 'name', 'twitter:description', description],
      ['meta[name="twitter:image"]', 'name', 'twitter:image', ogImage],
    ];

    entries.forEach(([selector, attr, key, content]) => upsertMeta(selector, attr, key, content));

    if (publishedAt) {
      upsertMeta(
        'meta[property="article:published_time"]',
        'property',
        'article:published_time',
        publishedAt,
      );
    }

    let canonical = document.head.querySelector<HTMLLinkElement>('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.rel = 'canonical';
      document.head.appendChild(canonical);
    }
    canonical.href = window.location.href;
  }, [title, description, image, type, publishedAt]);
}
