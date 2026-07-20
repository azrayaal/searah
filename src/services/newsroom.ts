import { fetchData, fetchEnvelope } from '@/services/apiClient';
import { toNewsArticles } from '@/services/newsroom.adapter';
import type { ApiNewsletter } from '@/services/newsroom.adapter';
import { news, newsCategories } from '@/data/newsletter';
import type { NewsArticle } from '@/types';

/**
 * The newsroom's single data source.
 *
 * Every consumer goes through here, and the functions are async whichever source is
 * active — so moving to the CMS is a configuration change, not a refactor. Had the pages
 * kept calling the synchronous helpers in `src/data/newsletter.ts`, switching over would
 * have meant rewriting each of them under time pressure later.
 *
 * Flip the source by setting `VITE_NEWSROOM_SOURCE=api` (and `VITE_API_URL` if the API
 * is not on localhost:4000). Nothing else changes: the adapter already returns the exact
 * `NewsArticle` shape the dummy data uses.
 */
export type NewsroomSource = 'dummy' | 'api';

export const NEWSROOM_SOURCE: NewsroomSource =
  import.meta.env['VITE_NEWSROOM_SOURCE'] === 'api' ? 'api' : 'dummy';

/** Newest first — the order every listing in the newsroom expects. */
function byDateDesc(a: NewsArticle, b: NewsArticle): number {
  return b.date.localeCompare(a.date);
}

/** The API caps `limit` at 100 — asking for more is rejected outright, not truncated. */
const PAGE_SIZE = 100;
/** Backstop against a malformed `hasNextPage` turning the walk below into a spin. */
const MAX_PAGES = 20;

/**
 * The full published set, walked page by page.
 *
 * The newsroom filters, searches and counts categories client-side across the whole
 * corpus, so a partial set would silently hide articles from the filter counts rather
 * than visibly failing. Paging rather than one large request because the API caps
 * `limit` at 100 by design; a single `limit=200` is refused with a 422, which is exactly
 * how this surfaced — the listing rendered empty while the article page worked.
 */
async function fetchAll(signal?: AbortSignal): Promise<NewsArticle[]> {
  if (NEWSROOM_SOURCE === 'dummy') return [...news].sort(byDateDesc);

  const rows: ApiNewsletter[] = [];

  for (let page = 1; page <= MAX_PAGES; page += 1) {
    const envelope = await fetchEnvelope<ApiNewsletter[]>(
      '/newsletters',
      { page, limit: PAGE_SIZE },
      signal,
    );

    rows.push(...envelope.data);
    if (!envelope.meta.pagination?.hasNextPage) break;
  }

  return toNewsArticles(rows).sort(byDateDesc);
}

export async function listArticles(signal?: AbortSignal): Promise<NewsArticle[]> {
  return fetchAll(signal);
}

export async function getArticle(slug: string, signal?: AbortSignal): Promise<NewsArticle | null> {
  if (NEWSROOM_SOURCE === 'dummy') {
    return news.find((article) => article.slug === slug) ?? null;
  }

  try {
    const row = await fetchData<ApiNewsletter>(`/newsletters/${encodeURIComponent(slug)}`, undefined, signal);
    return toNewsArticles([row])[0] ?? null;
  } catch {
    // A missing slug is a 404, which is a routing outcome rather than a failure — the
    // page renders its not-found state instead of an error banner.
    return null;
  }
}

export async function getArticlesByEntity(entityId: string, signal?: AbortSignal): Promise<NewsArticle[]> {
  const all = await fetchAll(signal);
  return all.filter((article) => article.entityId === entityId);
}

/**
 * The homepage feed: one lead story plus the followers beneath it.
 *
 * `showOnHome` is an editorial opt-out, so an article can stay in the newsroom while
 * being kept off the front page. The lead prefers the featured article and falls back to
 * the most recent, because a feed with no lead has nowhere to start.
 */
export async function getHomeFeed(
  signal?: AbortSignal,
): Promise<{ lead: NewsArticle | null; rest: NewsArticle[] }> {
  const all = (await fetchAll(signal)).filter((article) => article.showOnHome !== false);

  const lead = all.find((article) => article.featured) ?? all[0] ?? null;
  const rest = all.filter((article) => article.id !== lead?.id).slice(0, 4);

  return { lead, rest };
}

/** Categories present in the corpus, for the newsroom filter bar. */
export async function getCategories(signal?: AbortSignal): Promise<string[]> {
  if (NEWSROOM_SOURCE === 'dummy') return [...newsCategories];

  const all = await fetchAll(signal);
  return [...new Set(all.map((article) => article.category))].sort();
}
