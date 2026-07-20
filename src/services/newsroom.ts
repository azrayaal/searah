import { fetchData } from '@/services/apiClient';
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

/**
 * The full published set.
 *
 * `limit: 200` rather than paging: the newsroom filters and searches client-side across
 * the whole corpus, so a partial set would silently hide articles from the category
 * counts. Worth revisiting if the archive ever outgrows a single response.
 */
async function fetchAll(signal?: AbortSignal): Promise<NewsArticle[]> {
  if (NEWSROOM_SOURCE === 'dummy') return [...news].sort(byDateDesc);

  const rows = await fetchData<ApiNewsletter[]>('/newsletters', { limit: 200 }, signal);
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
