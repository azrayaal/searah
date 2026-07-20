import type { ContentBlock, Media, NewsArticle, NewsCategory } from '@/types';

/**
 * Maps CMS newsletter rows onto the `NewsArticle` shape the newsroom already renders.
 *
 * This adapter is the reason switching to the API touches no component. Every place the
 * API's shape differs from the domain's — flat `thumbnailUrl` against a `Media` object,
 * `entityCode` against `entityId`, `attachment.url` against `href` — the difference is
 * absorbed here rather than pushed into a card.
 *
 * The output is checked against `src/data/newsletter.ts` field by field, because the
 * point of the exercise is that the API and the dummy data are indistinguishable to the
 * UI. `npm run verify:newsroom` asserts that.
 */

/** A newsletter row as returned by `GET /public/newsletters`. */
export interface ApiNewsletter {
  id: string;
  slug: string;
  title: string;
  excerpt: string | null;
  category: string;
  entityCode: string | null;
  thumbnailUrl: string | null;
  coverUrl: string | null;
  pdfUrl: string | null;
  thumbnailAlt?: string | null;
  coverAlt?: string | null;
  coverCaption?: string | null;
  coverCredit?: string | null;
  content: ContentBlock[] | null;
  gallery: Media[] | null;
  tags: string[];
  authorName: string | null;
  authorRole: string | null;
  readingTime: string | null;
  featured: boolean;
  showOnHome: boolean;
  publishedAt: string | null;
  attachments?: { id: string; title: string; type: string; size: string; url: string }[];
}

/** Stands in for a missing image so a card cannot collapse to an empty box. */
const FALLBACK_IMAGE = '/media/offshore-platform.jpg';

function toMedia(
  src: string | null | undefined,
  alt: string | null | undefined,
  fallbackAlt: string,
  extra?: { caption?: string | null; credit?: string | null },
): Media {
  return {
    // Alt falls back to the headline only when the CMS has none. That is a worse
    // description — it describes the article rather than the photograph — so it is the
    // last resort, not the default.
    src: src ?? FALLBACK_IMAGE,
    alt: alt ?? fallbackAlt,
    ...(extra?.caption ? { caption: extra.caption } : {}),
    ...(extra?.credit ? { credit: extra.credit } : {}),
  };
}

/**
 * ISO timestamp → `YYYY-MM-DD`, which is exactly what the dummy data carries.
 *
 * This is the one mapping that is easy to get wrong and expensive to notice. `date`
 * feeds `<time dateTime={...}>` and `formatDate()`, which calls `new Date(value)` — so a
 * display string like "9 July 2026" would produce an invalid `datetime` attribute and an
 * unparseable date. The value stays machine-readable; formatting happens at render.
 */
export function toIsoDate(value: string | null): string {
  if (!value) return '';

  const date = new Date(value);
  if (Number.isNaN(date.getTime())) return '';

  return date.toISOString().slice(0, 10);
}

export function toNewsArticle(record: ApiNewsletter): NewsArticle {
  return {
    id: record.id,
    slug: record.slug,
    title: record.title,
    excerpt: record.excerpt ?? '',
    category: record.category as NewsCategory,
    entityId: record.entityCode,
    date: toIsoDate(record.publishedAt),
    readingTime: record.readingTime ?? '',
    author: {
      name: record.authorName ?? 'Searah Communications',
      role: record.authorRole ?? '',
    },
    thumbnail: toMedia(record.thumbnailUrl, record.thumbnailAlt, record.title),
    // Falls back to the thumbnail rather than the placeholder: an article with one image
    // should use it in both places before it reaches for stock photography.
    cover: toMedia(record.coverUrl ?? record.thumbnailUrl, record.coverAlt ?? record.thumbnailAlt, record.title, {
      caption: record.coverCaption,
      credit: record.coverCredit,
    }),
    featured: record.featured,
    showOnHome: record.showOnHome,
    content: record.content ?? [],
    attachments: (record.attachments ?? []).map((attachment) => ({
      id: attachment.id,
      title: attachment.title,
      type: attachment.type,
      size: attachment.size,
      href: attachment.url,
    })),
    gallery: record.gallery ?? [],
    tags: record.tags ?? [],
  };
}

export function toNewsArticles(records: ApiNewsletter[]): NewsArticle[] {
  return records.map(toNewsArticle);
}
